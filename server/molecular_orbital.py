import pathlib, json, re

# https://www.andersle.no/posts/2022/mo/mo.html

# RDKit imports:
from rdkit import Chem
from rdkit.Chem import (
    AllChem,
)

# pyscf imports:
from pyscf import gto, scf, lo, tools

# For plotting
import matplotlib
from matplotlib import pyplot as plt
import seaborn as sns

sns.set_theme(style="ticks", context="talk", palette="muted")

# For numerics:
import numpy as np
import pandas as pd

from extensions import multipart_upload_boto3
# from server.extensions import multipart_upload_boto3

pd.options.display.float_format = "{:,.3f}".format

smiles = {
    "ethene": "C=C",
    "hydrogen_gas": "[H][H]",
    "hydrochloric_acid": "Cl",
    "methane": "C",
    "ethane": "CC",
    "propane": "CCC",
    "butane": "CCCC",
    "pentane": "CCCCC",
    "hexane": "CCCCCC",
    "benzene": "c1ccccc1",
    "toluene": "Cc1ccccc1",
    "phenol": "c1ccc(cc1)O",
    "ethyl_acetate": "CCOC(C)=O",
    "acetone": "CC(=O)C",
    "acetic_acid": "CC(=O)O",
    "formic_acid": "C(=O)O",
    "glycerol": "C(C(CO)O)O",
    "water": "O",
    "chlorine_gas": "ClCl",
}

def plot_mo(molecule_name="ethene"):
    molecule_name = molecule_name
    molecule = Chem.MolFromSmiles(smiles[molecule_name])  # Generate the molecule from smiles

    def get_xyz(molecule, optimize=False):
        """Get xyz-coordinates for the molecule"""
        mol = Chem.Mol(molecule)
        mol = AllChem.AddHs(mol, addCoords=True)
        AllChem.EmbedMolecule(mol)
        if optimize:  # Optimize the molecules with the MM force field:
            AllChem.MMFFOptimizeMolecule(mol)
        xyz = []
        for lines in Chem.MolToXYZBlock(mol).split("\n")[2:]:
            strip = lines.strip()
            if strip:
                xyz.append(strip)
        xyz = "\n".join(xyz)
        return mol, xyz

    molecule3d, xyz = get_xyz(molecule)


    def run_calculation(xyz, basis="sto-3g"):
        """Calculate the energy (+ additional things like MO coefficients) with pyscf."""
        mol = gto.M(
            atom=xyz,
            basis=basis,
            unit="ANG",
            symmetry=True,
        )
        mol.build()
        mf = scf.RHF(mol).run()
        return mf, mol

    mf, mol = run_calculation(xyz, basis="sto-3g")

    table = pd.DataFrame({"Energy": mf.mo_energy, "Occupancy": mf.mo_occ})


    fig, ax = plt.subplots(constrained_layout=True, figsize=(9, 6))
    colors = matplotlib.cm.get_cmap("tab20")(np.linspace(0, 1, len(mf.mo_energy)))

    pos = []
    for i, (energy, occ) in enumerate(zip(mf.mo_energy, mf.mo_occ)):
        left = 3 * i
        right = 3 * i + 2.5
        length = right - left

        (line,) = ax.plot([left, right], [energy, energy], color=colors[i], lw=3)

        electron_x, electron_y = None, None
        if occ == 2:
            electron_x = [left + 0.25 * length, left + 0.75 * length]
            electron_y = [energy, energy]
        elif occ == 1:
            electron_x, electron_y = [left + 0.5], [energy]
        if electron_x and electron_y:
            ax.scatter(electron_x, electron_y, color=line.get_color())

        pos.append(left + 0.5 * length)

    ax.axhline(y=0, ls=":", color="k")
    ax.set_xticks(pos)
    ax.set_xticklabels([f"#{i}" for i, _ in enumerate(pos)])
    ax.set(xlabel="MO number", ylabel="Energy / a.u.")
    sns.despine(fig=fig)

    # Save the figure as a picture
    fig.savefig("server/mo_energy_diagram.png", dpi=300)
    multipart_upload_boto3(f"{molecule_name}_energy_diagram", "server/mo_energy_diagram.png")

    def get_mo(mf, mol):
        """Get molecular orbitals"""
        orbitals = {"canonical": mf.mo_coeff}

        # Get intrinsic bonding orbitals and localized intrinsic valence virtual orbitals (livvo):
        orbocc = mf.mo_coeff[:, 0 : mol.nelec[0]]
        orbvirt = mf.mo_coeff[:, mol.nelec[0] :]

        ovlpS = mol.intor_symmetric("int1e_ovlp")

        iaos = lo.iao.iao(mol, orbocc)
        iaos = lo.orth.vec_lowdin(iaos, ovlpS)
        ibos = lo.ibo.ibo(mol, orbocc, locmethod="IBO")
        orbitals["ibo"] = ibos

        livvo = lo.vvo.livvo(mol, orbocc, orbvirt)
        orbitals["livvo"] = livvo
        return orbitals

    orbitals = get_mo(mf, mol)

    def write_all_coeffs(
        mol, coeffs, prefix="cmo", dirname=".", margin=5, offset=0
    ):
        """Write cube files for the given coefficients."""
        path = pathlib.Path(dirname)
        path.mkdir(parents=True, exist_ok=True)

        for i in range(coeffs.shape[1]):
            outfile = f"server/{prefix}_{i+offset:02d}.cube"
            outfile = path / outfile
            print(f"Writing {outfile}")
            tools.cubegen.orbital(mol, outfile, coeffs[:, i], margin=margin)
            multipart_upload_boto3(molecule_name, outfile)


    def find_homo_lumo(mf):
        lumo = float("inf")
        lumo_idx = None
        homo = -float("inf")
        homo_idx = None
        for i, (energy, occ) in enumerate(zip(mf.mo_energy, mf.mo_occ)):
            if occ > 0 and energy > homo:
                homo = energy
                homo_idx = i
            if occ == 0 and energy < lumo:
                lumo = energy
                lumo_idx = i

        return homo, homo_idx, lumo, lumo_idx


    _, homo_idx, _, lumo_idx = find_homo_lumo(mf)
    print(f"HOMO (index): {homo_idx}")
    print(f"LUMO (index): {lumo_idx}")


    tools.cubegen.orbital(
        mol, "server/cmo_homo.cube", orbitals["canonical"][:, homo_idx], margin=5
    )
    tools.cubegen.orbital(
        mol, "server/cmo_lumo.cube", orbitals["canonical"][:, lumo_idx], margin=5
    )
    tools.cubegen.orbital(mol, "server/ibo_homo.cube", orbitals["ibo"][:, -1], margin=5)
    tools.cubegen.orbital(
        mol, "server/livvo_lumo.cube", orbitals["livvo"][:, 0], margin=5
    );

    # Use UCSF's ChimeraX to visualize them
    multipart_upload_boto3(molecule_name, "server/cmo_homo.cube")
    multipart_upload_boto3(molecule_name, "server/cmo_lumo.cube")
    multipart_upload_boto3(molecule_name, "server/ibo_homo.cube")
    multipart_upload_boto3(molecule_name, "server/livvo_lumo.cube")

    # Replace these lines with the paths to your cube files
    cmo_homo_cube_path = pathlib.Path("server/cmo_homo.cube")
    cmo_lumo_cube_path = pathlib.Path("server/cmo_lumo.cube")

plot_mo("hydrochloric_acid")
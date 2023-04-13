<img width="100" alt="icon-2" src="https://user-images.githubusercontent.com/35755386/224520472-1e542a07-dfca-4a27-a663-c5831708aeaa.png">

# ElectronVisualized

A web-based viewer for atomic and molecular orbitals. This viewer uses mathematical functions called spherical harmonics and formulas from Density Functional Theory to visualize these orbitals.

For atomic orbitals, the viewer shows the different shapes of orbitals (e.g. s, p, d) for different energy levels (e.g. 1s, 2s, 2p).

For molecular orbitals, the viewer uses a computational chemistry method called the Hartree-Fock approach to calculate and visualize the orbitals. This approach calculates the energies and shapes of the orbitals based on the interactions between electrons and nuclei in the molecule.

[**https://electronvisual.org**](https://electronvisual.org)

---

## Atomic Orbitals

**ElectronVisualized** uses the spherical harmonics formula to display the shape of atomic orbitals based on their quantum numbers. Each orbital has a unique shape, and the tool accurately represents this shape by calculating the probability of finding an electron at any given point in space. These probabilities are represented as dots, which show where electrons are most likely to be located within the orbital.

<img width="1200" alt="Screenshot 2023-04-12 at 9 21 54 PM" src="https://user-images.githubusercontent.com/35755386/231621160-9405e6e6-e32d-49f4-ae31-89dae2b3b74a.png">

---

## Molecular Orbitals

Molecular orbitals (MOs) are formed by the combination of atomic orbitals (AOs) from different atoms in a molecule. In this process, AOs interact and combine to form bonding MOs and antibonding MOs.

<img width="1200" alt="Screenshot 2023-04-12 at 8 57 42 PM" src="https://user-images.githubusercontent.com/35755386/231621394-a8c84a2b-8d0a-4c5a-a790-f3a4590a971d.png">

---

## API Guide

### ```https://electronvisual.org/api/load/<molecule_name_goes_here>```

Loads the x, y, and z coordinates of a **molecule** based upon the **DFT** calculations, all from the Amazon S3 server with blazingly fast speed guaranteed.

### ```https://electronvisual.org/api/loadSPH/<atom_name_goes_here>```

Retrieves the x, y, and z coordinates of an individual **atom** derived from the **Spherical Harmonics** formula. This might take a little more time as it is more precise and contains significantly more information.

---

![IMG_7647](https://user-images.githubusercontent.com/35755386/166985579-96c2d483-e74c-4802-ac92-762b2ccc8bc9.jpg)

<img width="1200" alt="Screen Shot 2022-06-05 at 10 10 18 PM" src="https://user-images.githubusercontent.com/35755386/172083147-e11ab873-f156-4dda-8d26-71652a1de0c8.png">

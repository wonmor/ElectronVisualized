from gpaw import GPAW, FermiDirac
from ase.structure import molecule
from ase.io import write
import numpy as np

'''
DOWNLOAD DATASETS FOR THE PSEUDO WAVEFUNCTION GENERATION PROCESS:
1. gpaw install-data <dir>
2. export GPAW_SETUP_PATH=~/gpaw-setups-<version>
'''

def plot_hydrogen():
    '''
    This is a function that applies the Density Functional Theory and generates the coordinates of probable locations of electrons of Hydrogen atom
    
    Parameters
    ----------
    None
    Returns
    -------
    None
    '''
    calc = GPAW(h=.18,
                xc='PBE',
                maxiter=3500,
                txt='server/GPAW_log.txt',
                occupations=FermiDirac(0.1))

    mol = molecule('H2')

    mol.set_cell((5.0, 5.1, 5.2))
    mol.set_pbc((False, False, False))

    mol.center()
    mol.set_calculator(calc)

    gridrefinement = 4

    mol.get_potential_energy()

    density = calc.get_all_electron_density(gridrefinement=gridrefinement)

    write('server/density.cube', mol, data=density)

    grid = calc.hamiltonian.gd.get_grid_point_coordinates()

    np.save('server/grid.npy', grid)
from gpaw import GPAW, FermiDirac
from ase.structure import molecule
from ase.io import write
import numpy as np

calc = GPAW(h=.18,
            xc='PBE',
            maxiter=3500,
            txt='out.txt',
            occupations=FermiDirac(0.1))

mol = molecule('H2')
mol.set_cell((5.0, 5.1, 5.2))
mol.set_pbc((False, False, False))
mol.center()
mol.set_calculator(calc)

gridrefinement = 4
mol.get_potential_energy()
density = calc.get_all_electron_density(gridrefinement=gridrefinement)
write('density.cube', mol, data=density)

grid = calc.hamiltonian.gd.get_grid_point_coordinates()
np.save('grid.npy', grid)
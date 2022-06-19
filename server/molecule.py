import json
import os
from flask import jsonify

import numpy as np
from ase.data.colors import jmol_colors as atomic_colors

from gpaw import GPAW, FermiDirac
from ase.structure import molecule
from ase.io import write

from werkzeug.local import LocalProxy

from flask import current_app

from server.extensions import multipart_upload_boto3

'''
▒█▀▄▀█ █▀▀█ █░░ █▀▀ █▀▀ █░░█ █░░ █▀▀ 　 █▀▀█ █░░ █▀▀█ ▀▀█▀▀ ▀▀█▀▀ █▀▀ █▀▀█ 
▒█▒█▒█ █░░█ █░░ █▀▀ █░░ █░░█ █░░ █▀▀ 　 █░░█ █░░ █░░█ ░░█░░ ░░█░░ █▀▀ █▄▄▀ 
▒█░░▒█ ▀▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ░▀▀▀ ▀▀▀ ▀▀▀ 　 █▀▀▀ ▀▀▀ ▀▀▀▀ ░░▀░░ ░░▀░░ ▀▀▀ ▀░▀▀

DEVELOPED AND DESIGNED BY JOHN SEONG, WITH SOME HELP WITH STACKOVERFLOW, HEH
'''

logger = LocalProxy(lambda: current_app.logger)

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def _density_parser():
    '''
    This function reads the data from the GPAW-generated density.cube file and
    parses it, creating a clean, organized set of Python dictionary
    and a reference JSON file that is human readable

    Parameters
    ----------
    None

    Returns
    -------
    Dictionary
        Contains density information of a selected molecule
    '''
    density_data = {}

    filename1 = 'server/density.cube'

    with open(filename1, 'r') as f:
        lines = f.read().splitlines()

    no_of_atoms, _, _, _ = lines[2].split()
    no_of_atoms = int(no_of_atoms)

    xdim, _, _, _ = lines[3].split()
    xdim = int(xdim)

    ydim, _, _, _ = lines[4].split()
    ydim = int(ydim)

    zdim, _, _, _ = lines[5].split()
    zdim = int(zdim)

    elements = [None] * no_of_atoms

    atoms_x_coords_in_density = [None] * no_of_atoms
    atoms_y_coords_in_density = [None] * no_of_atoms
    atoms_z_coords_in_density = [None] * no_of_atoms

    for _ in range(no_of_atoms):
        (elements[_], __,
         atoms_x_coords_in_density[_],
         atoms_y_coords_in_density[_],
         atoms_z_coords_in_density[_]) = lines[6 + _].split()

        elements[_] = int(elements[_])

        atoms_x_coords_in_density[_] = float(atoms_x_coords_in_density[_])
        atoms_y_coords_in_density[_] = float(atoms_y_coords_in_density[_])
        atoms_z_coords_in_density[_] = float(atoms_z_coords_in_density[_])

    # Load the data, we need to remove the first 8 lines and the space after
    with open(filename1, 'r') as f:
        str = ' '.join(f.readlines()[(6 + no_of_atoms):])

    data = np.fromstring(str, sep=' ')

    data.shape = (xdim, ydim, zdim)

    min = data.min()
    max = data.max()

    if element_name == 'H2' or element_name == 'H':
        # Only display volumes that exceed 150% * min value
        vmin = min + 0.5 * (max - min)

        # Only display volumes that are below 160% * min value
        vmax = min + 0.6 * (max - min)

    elif element_name == 'Cl2':
        vmin = min + 0.0003 * (max - min)
        vmax = min + 0.09 * (max - min)

    elif element_name == 'H2O' or element_name == 'O':
        vmin = min + 0.002 * (max - min)
        vmax = min + 0.09 * (max - min)
    
    elif element_name == 'HCl':
        vmin = min + 0.00022 * (max - min)
        vmax = min + 0.9 * (max - min)
    
    else:
        vmin = min + 0.2 * (max - min)
        vmax = min + 0.8 * (max - min)

    '''
    Parse the density data generated by GPAW;
    Essentially, density_data["x, y, z"] = volume
    '''

    for x in range(xdim):
        for y in range(ydim):
            for z in range(zdim):
                v = round(data[x][y][z], 2)
                if not v < vmin or v > vmax:
                    density_data[f'{x}, {y}, {z}'] = v

    logger.info(f"Density data parsing completed for {element_name}!")
    
    # Add legend to plot
    # vol.lut_manager.show_scalar_bar = True
    # vol.lut_manager.scalar_bar.orientation = 'vertical'
    # vol.lut_manager.scalar_bar.width = 0.001
    # vol.lut_manager.scalar_bar.height = 0.04
    # vol.lut_manager.scalar_bar.position = (0.01, 0.15)
    # vol.lut_manager.number_of_labels = 5
    # vol.lut_manager.data_name = "ED"

    return_value = {
        "atoms_x_coords_in_density": atoms_x_coords_in_density,
        "atoms_y_coords_in_density": atoms_y_coords_in_density,
        "atoms_z_coords_in_density": atoms_z_coords_in_density,

        "no_of_atoms": no_of_atoms,
        "elements": elements,

        "xdim": xdim,
        "ydim": ydim,
        "zdim": zdim,

        "vmax": vmax,
        "vmin": vmin,

        "density_data": density_data
    }

    return return_value


def _transfer_to_client():
    '''
    This is a function that generates the coordinates for all plausible locations where electrons might reside in

    Parameters
    ----------
    None

    Returns
    -------
    JSON Array
        A JSONified dictionary that contains the electron density and coordinate data
    '''
    parsed_density = _density_parser()
    
    atoms_x_coords_in_density = parsed_density['atoms_x_coords_in_density']
    atoms_y_coords_in_density = parsed_density['atoms_y_coords_in_density']
    atoms_z_coords_in_density = parsed_density['atoms_z_coords_in_density']

    no_of_atoms = parsed_density['no_of_atoms']
    elements = parsed_density['elements']

    xdim = parsed_density['xdim']
    ydim = parsed_density['ydim']
    zdim = parsed_density['zdim']

    vmax = parsed_density['vmax']
    vmin = parsed_density['vmin']

    density_data = parsed_density['density_data']

    filename2 = 'server/grid.npy'

    grid_coords = np.load(filename2)

    xs = np.ravel(grid_coords[0])
    ys = np.ravel(grid_coords[1])
    zs = np.ravel(grid_coords[2])

    grid_minx = np.min(xs)
    grid_maxx = np.max(xs)
    grid_miny = np.min(ys)
    grid_maxy = np.max(ys)
    grid_minz = np.min(zs)
    grid_maxz = np.max(zs)

    '''
    Scaling atoms positions from grid to image
    in order to match the electron density
    '''

    image_minx = -10.0
    image_maxx = 10.0

    image_miny = -10.0
    image_maxy = 10.0

    image_minz = -10.0
    image_maxz = 10.0

    atoms_x = []

    for x in atoms_x_coords_in_density:
        atoms_x += [0.5 + image_minx + (x - grid_minx) *
                    (image_maxx - image_minx) / (grid_maxx - grid_minx)]

    atoms_y = []

    for y in atoms_y_coords_in_density:
        atoms_y += [0.5 + image_miny + (y - grid_miny) *
                    (image_maxy - image_miny) / (grid_maxy - grid_miny)]

    atoms_z = []

    for z in atoms_z_coords_in_density:
        atoms_z += [0.5 + image_minz + (z - grid_minz) *
                    (image_maxz - image_minz) / (grid_maxz - grid_minz)]

    '''
    Plotting atoms and the bond between them;
    Atoms, in particular, are plotted with their atomic number color.
    '''

    for _ in range(no_of_atoms):
        color = atomic_colors[elements[_]]
        color = (color[0], color[1], color[2])
        # mlab.points3d(atoms_x[_], atoms_y[_], atoms_z[_],
        #               scale_factor=0.5,
        #               resolution=20,
        #               color=color,
        #               scale_mode='none')

    return_value = {
        'no_of_atoms': no_of_atoms,
        'atomic_colors': atomic_colors.tolist(),
        'elements': elements,
        'xdim': xdim,
        'ydim': ydim,
        'zdim': zdim,
        'vmax': vmax,
        'vmin': vmin,
        'density_data': density_data,
        'atoms_x': atoms_x,
        'atoms_y': atoms_y,
        'atoms_z': atoms_z
    }

    return return_value


def plot_molecule(name):
    '''
    This is a function that applies the Density Functional Theory
    and generates the coordinates of probable locations of molecule's electrons

    Parameters
    ----------
    None

    Returns
    -------
    None
    '''
    global element_name
    element_name = name

    calc = GPAW(h=.18,
                xc='PBE',
                maxiter=3500,
                txt='server/GPAW_log.txt',
                occupations=FermiDirac(0.1))

    mol = molecule(element_name)

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

    return_value = _transfer_to_client()

    with open(os.path.join(PROJECT_ROOT, f'client/src/assets/{element_name}.json'), 'w+') as outfile:
        json.dump(return_value, outfile, sort_keys=True,
                  indent=4, separators=(',', ': '))

    multipart_upload_boto3(element_name, os.path.join(PROJECT_ROOT, f'client/src/assets/{element_name}.json'))

    return jsonify(return_value)

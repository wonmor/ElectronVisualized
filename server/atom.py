import json
import os
from flask import jsonify
import numpy as np
import scipy.special as spe

from server.extensions import multipart_upload_boto3

'''
SPHERICAL HARMONICS CALCULATIONS WERE BASED UPON:
https://dpotoyan.github.io/Chem324/H-atom-wavef.html
https://towardsdatascience.com/quantum-physics-visualization-with-python-35df8b365ff

TO DO: ADD A FUNCTIONALITY WHERE THE USER CAN ACTIVELY TINKER WITH THE MAGNETIC QUANTUM NUMBER
'''

nmax = 10
lmax = nmax-1

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def _psi_R(r,n=1,l=0):
    coeff = np.sqrt((2.0 / n) ** 3 * spe.factorial(n-l-1) / (2.0*n*spe.factorial(n+l)))
    
    laguerre = spe.assoc_laguerre(2.0*r/n,n-l-1,2*l+1)
    
    return coeff * np.exp(-r / n) * (2.0 * r / n) ** l * laguerre

def _psi_ang(phi,theta,l=0,m=0):
    
    sphHarm = spe.sph_harm(m,l,phi,theta)
    
    return sphHarm.real

def _HFunc(x, y, z, n, l, m):
    '''
    INPUT
        x: X coordinate
        y: Y coordinate
        z: Z coordinate
        n: Principle quantum number
        l: Angular momentum quantum number
        m: Magnetic quantum number

    OUTPUT
        Value of wavefunction
    '''

    r = np.sqrt(x**2 + y**2 + z**2)
    theta = np.arccos(z / r)
    phi = np.arctan2(y, x)

    return _psi_R(r, n, l) * _psi_ang(phi, theta, l, m)


def plot_atomic_orbital(name, n, l, m):
    maxi = 60
    resolution = 160
    num_electrons = 8000
    burn_in = 1000
    delta = 0.5

    # Initialize electron coordinate
    x_coords = np.random.uniform(-maxi, maxi, num_electrons)
    y_coords = np.random.uniform(-maxi, maxi, num_electrons)
    z_coords = np.random.uniform(-maxi, maxi, num_electrons)
    coords = np.stack([x_coords, y_coords, z_coords], axis=-1)

    # Burn in the algorithm
    for i in range(burn_in):
        # Generate a new electron coordinate
        new_coords = coords + np.random.normal(0, delta, size=(num_electrons, 3))

        # Calculate the acceptance probability
        psi_new = _HFunc(new_coords[:, 0], new_coords[:, 1], new_coords[:, 2], n, l, m)
        psi_old = _HFunc(coords[:, 0], coords[:, 1], coords[:, 2], n, l, m)
        acceptance_prob = np.abs(psi_new / psi_old) ** 2

        # Accept or reject the new electron coordinate
        accept = acceptance_prob > np.random.uniform(size=num_electrons)
        coords[accept] = new_coords[accept]

    # Generate electron coordinates using the Metropolis-Hastings algorithm
    for i in range(num_electrons - burn_in):
        # Generate a new electron coordinate
        new_coords = coords + np.random.normal(0, delta, size=(num_electrons, 3))

        # Calculate the acceptance probability
        psi_new = _HFunc(new_coords[:, 0], new_coords[:, 1], new_coords[:, 2], n, l, m)
        psi_old = _HFunc(coords[:, 0], coords[:, 1], coords[:, 2], n, l, m)
        acceptance_prob = np.abs(psi_new / psi_old) ** 2

        # Accept or reject the new electron coordinate
        accept = acceptance_prob > np.random.uniform(size=num_electrons)
        coords[accept] = new_coords[accept]

    x_coords = coords[:, 0].tolist()
    y_coords = coords[:, 1].tolist()
    z_coords = coords[:, 2].tolist()

    return_value = {
        "x_coords": x_coords,
        "y_coords": y_coords,
        "z_coords": z_coords,
        "n_value": n,
        "l_value": l,
        "m_value": m
    }

    with open(os.path.join(PROJECT_ROOT, f'client/src/assets/SPH_{n}_{l}_{m}.json'), 'w+') as outfile:
        json.dump(return_value, outfile, sort_keys=True,
                  indent=4, separators=(',', ': '))

    multipart_upload_boto3(f"SPH_{n}_{l}_{m}", os.path.join(PROJECT_ROOT, f'client/src/assets/SPH_{n}_{l}_{m}.json'))
    multipart_upload_boto3(f"SPH_{name}", os.path.join(PROJECT_ROOT, f'client/src/assets/SPH_{n}_{l}_{m}.json'))

    return jsonify(return_value)

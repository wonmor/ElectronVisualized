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

def _HFunc(r,theta,phi,n,l,m):
    '''
    INPUT
        r: Radial coordinate
        theta: Polar coordinate
        phi: Azimuthal coordinate
        n: Principle quantum number
        l: Angular momentum quantum number
        m: Magnetic quantum number

    OUTPUT
        Value of wavefunction
    '''

    return _psi_R(r,n,l) * _psi_ang(phi,theta,l,m)

def plot_atomic_orbital(element_name, n, l, m):
    maxi = 60
    resolution = 160

    base = np.linspace(-maxi, maxi, resolution)[:,np.newaxis,np.newaxis]

    x2 = np.tile(base, (1,resolution,resolution))
    y2 = np.swapaxes(x2,0,1)
    z2 = np.swapaxes(x2,0,2)

    total = np.concatenate((x2[np.newaxis,:],y2[np.newaxis,:],z2[np.newaxis,:]), axis=0)

    r2 = np.linalg.norm(total, axis=0)

    np.seterr(all='ignore')

    phi2 = np.arctan(np.divide(total[2],np.linalg.norm(total[:2], axis=0))) + np.pi / 2
    theta2 = np.arctan2(total[1],total[0])

    psi = _HFunc(r2, theta2, phi2, n, l, m)

    density = r2 ** 2 * np.sin(phi2) * psi ** 2

    elements = []
    probability = []

    for ix in range(resolution):
        for iy in range(resolution):
            for iz in range(resolution):
                # Serialize into 1D object
                elements.append(str((ix,iy,iz)))
                probability.append(density[ix][iy][iz])

    # Ensure sum of probability is 1
    probability = probability / sum(probability)

    # Getting electron coordinates based on probabiliy
    coord = np.random.choice(elements, size=8000, replace=True, p=probability)

    elem_mat = [i.split(',') for i in coord]
    elem_mat = np.matrix(elem_mat)
    
    x_coords = [float(i.item()[1:]) for i in elem_mat[:,0]] 
    y_coords = [float(i.item()) for i in elem_mat[:,1]] 
    z_coords = [float(i.item()[0:-1]) for i in elem_mat[:,2]]

    return_value = {
        "x_coords": x_coords,
        "y_coords": y_coords,
        "z_coords": z_coords,
        "n_value": n,
        "l_value": l,
        "m_value": m
    }

    with open(os.path.join(PROJECT_ROOT, f'client/src/assets/SPH_{element_name}.json'), 'w+') as outfile:
        json.dump(return_value, outfile, sort_keys=True,
                  indent=4, separators=(',', ': '))

    multipart_upload_boto3("SPH_" + element_name, os.path.join(PROJECT_ROOT, f'client/src/assets/SPH_{element_name}.json'))

    return jsonify(return_value)
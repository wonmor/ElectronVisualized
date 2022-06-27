'''
█████████████████████████████████████████████████████████████████████████████████████████████████████████████
█▄─▄▄─█▄─▄███▄─▄▄─█─▄▄▄─█─▄─▄─█▄─▄▄▀█─▄▄─█▄─▀█▄─▄███▄─█─▄█▄─▄█─▄▄▄▄█▄─██─▄██▀▄─██▄─▄███▄─▄█░▄▄░▄█▄─▄▄─█▄─▄▄▀█
██─▄█▀██─██▀██─▄█▀█─███▀███─████─▄─▄█─██─██─█▄▀─█████▄▀▄███─██▄▄▄▄─██─██─███─▀─███─██▀██─███▀▄█▀██─▄█▀██─██─█
▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▀▄▄▄▀▀▄▄▀▀▀▀▀▄▀▀▀▄▄▄▀▄▄▄▄▄▀▀▄▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▄▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▀▀
----------------------------------------------------------------------------
Purpose:     An interactive module that visualizes the electron configurations of different elements.
             Displayed in an orbital format, based upon the internal calculations performed that involve the famous Density Functional Theory,
             which simplifies the N-dimensional Schrödinger's Euqation problem into a three-dimensional one.
Author:      John Seong
Created:     23-Mar-2022
-----------------------------------------------------------------------------
I think this project deserves a level 4+ because...
1. Each dot represent a probable location that the electron might reside at based upon electron density at a given location 
      — according to the Density Functional Theory (DFT)
3. Used industry standard Quantum Mechanics simulation libaries such as ASE and GPAW for numerically computing the electron density
-----------------------------------------------------------------------------
'''

from server import create_app

import os

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host='0.0.0.0', port=port)       

'''
TIPS & TRICKS

PIP FREEZE LOCALLY: pip3 freeze -l > requirements.txt
DEPLOYING FLASK + REACT APP ON HEROKU: https://www.realpythonproject.com/how-to-setup-automated-deployment-for-multiple-apps-under-a-single-github-repository-in-heroku/
HOW TO INSTALL ASE AND GPAW ON LINUX (SERVER): http://dtu.cnwiki.dk/10302/page/2699/optional-install-ase-and-gpaw-on-your-laptop

ATOMIC ORBITAL (SPHERICAL HARMONICS) MLAB: https://dpotoyan.github.io/Chem324/H-atom-wavef.html
SHIFT+ALT+CLICK BELOW = MULTIPLE CURSORS ON VSCODE
'''

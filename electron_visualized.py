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

UPDATED (NOV. 29, 2022): MAKE SURE YOU brew install jpeg BEFORE PERFORMING PIP INSTALL FROM REQUIREMENTS.TXT ACTION!
ALSO COMMENT OUT THE GPAW LINE IF YOU HAVE INSTALLED PREVIOUSLY USING BREW...

-----------------------------------------------------------------------------

VVIP: ENVIRONMENTAL VARIABLES REQUIRED
(ON THE SERVER, GO ON THE SETTINGS, OR LOCALLY, CREATE A NEW .ENV FILE IN THE ROOT FOLDER)

<< BELOW IS A VERY IMPORTANT STEP TO SUCCESSFULLY RUN ASE AND GPAW LOCALLY (MACOS) >>
1. export C_INCLUDE_PATH=/my/path/to/libxc/5.2.0/include
2. export LIBRARY_PATH=/my/path/to/libxc/5.2.0/lib
3. export LD_LIBRARY_PATH=/my/path/to/libxc/5.2.0/lib

(IN CASE OF MACOS: /opt/homebrew/Cellar/libxc/6.0.0 IS THE PATH FOR LIBXC)

4. GPAW_SETUP_PATH="server/datasets/gpaw-setups-0.9.20000"
5. SECRET_KEY — FOR FLASK
6. AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION="us-east-2", AWS_ACCESS_KEY_ID

'''

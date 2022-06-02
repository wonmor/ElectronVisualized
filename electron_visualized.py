'''
█████████████████████████████████████████████████████████████████████████████████████████████████████████████
█▄─▄▄─█▄─▄███▄─▄▄─█─▄▄▄─█─▄─▄─█▄─▄▄▀█─▄▄─█▄─▀█▄─▄███▄─█─▄█▄─▄█─▄▄▄▄█▄─██─▄██▀▄─██▄─▄███▄─▄█░▄▄░▄█▄─▄▄─█▄─▄▄▀█
██─▄█▀██─██▀██─▄█▀█─███▀███─████─▄─▄█─██─██─█▄▀─█████▄▀▄███─██▄▄▄▄─██─██─███─▀─███─██▀██─███▀▄█▀██─▄█▀██─██─█
▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▀▄▄▄▀▀▄▄▀▀▀▀▀▄▀▀▀▄▄▄▀▄▄▄▄▄▀▀▄▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▄▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▀▀
'''
# ----------------------------------------------------------------------------
# Purpose:     An interactive module that visualizes the electron configurations of different elements.
#              Displayed in an orbital format, based upon the internal calculations performed that involve the famous Dirac equation,
#              which describes the shape and structure of the electrons in terms of the wavefunction.
#
# Author:      John Seong
# Created:     23-Mar-2022
# Updated:     31-May-2022
# -----------------------------------------------------------------------------
# I think this project deserves a level 4+ because...
#
# 1. A real-time electron movement simulation that no other program offers in a non-scientific field of software engineering 
#       – derived by the electrons' angular momentum formula
# 2. Each dot represent a probable location that the electron might reside at based upon the wavefunction 
#       — according to the Density Functional Theory (DFT)
# 3. Used industry standard Quantum Mechanics simulation libaries such as ASE and GPAW for numerically computing the electron density
# -----------------------------------------------------------------------------

from server import create_app

app = create_app()

if __name__ == '__main__':
    app.run()

'''
TIPS & TRICKS

PIP FREEZE LOCALLY: pip3 freeze -l > requirements.txt
DEPLOYING FLASK + REACT APP ON HEROKU: https://www.realpythonproject.com/how-to-setup-automated-deployment-for-multiple-apps-under-a-single-github-repository-in-heroku/
HOW TO INSTALL ASE AND GPAW ON LINUX (SERVER): http://dtu.cnwiki.dk/10302/page/2699/optional-install-ase-and-gpaw-on-your-laptop
'''
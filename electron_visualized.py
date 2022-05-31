# -----------------------------------------------------------------------------
# Name:        ElectronVisualized
# Purpose:     An interactive module that visualizes the electron configurations of different elements.
#              Displayed in an orbital format, based upon the internal calculations performed that involve the famous Dirac equation,
#              which describes the shape and structure of the electrons in terms of the wavefunction.
# z
# Author:      John Seong
# Created:     23-Mar-2022
# Updated:     30-May-2022
# -----------------------------------------------------------------------------
# I think this project deserves a level 4+ because...
#
# 1. A real-time electron movement simulation that no other program offers in a non-scientific field of software engineering 
#       – derived by the electrons' angular momentum formula
# 2. Each dot represent a probable location that the electron might reside at based upon the wavefunction 
#       — derived by Schrödinger's Equation and the famous Dirac representation (numerical wavefunction)
# 3. Used industry standard Quantum Mechanics simulation libaries such as ASE and GPAW for numerically calculating the electron density
# -----------------------------------------------------------------------------

from server import create_app

app = create_app()

if __name__ == '__main__':
    app.run()

# PIP FREEZE LOCALLY: pip3 freeze -l > requirements.txt

# -----------------------------------------------------------------------------
# Name:        ElectronVisualized
# Purpose:     An interactive module that visualizes the electron configurations of different elements. 
#              Displayed in an orbital format, based upon the internal calculations performed that involve the famous Dirac equation,
#              which describes the shape and structure of the electrons in terms of the wavefunction.
#z
# Author:      John Seong
# Created:     23-Mar-2022
# Updated:     25-Mar-2022
# -----------------------------------------------------------------------------
# I think this project deserves a level 4+ because...
#
# 1. Electron movement simulation – derived by the angular momentum formula
# 2. Each dot represent a probable location that the electron might reside at based upon the wavefunction 
#       — derived by Shroodinger's Equation and 
# 3. Uses the particle effect engine to simulate the electrons — PyIgnition
# -----------------------------------------------------------------------------

import sys
import pygame as pg

from data.main_activity import MainController

if __name__ == '__main__':
    MainController()
    pg.quit()
    sys.exit()

# PIP FREEZE LOCALLY: pip3 freeze -l > requirements.txt
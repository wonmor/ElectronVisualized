from flask import Blueprint, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin

# from renderer import element_plotter

'''
----------------------------------------------------------------

THE "WORLD ENGINE," A RESTful API THAT POWERS THE INTERACTIVE MODULE ELECTRONVISUALIZED
DEVELOPED AND DESIGNED BY JOHN SEONG

SUPPORTED PLATFORMS: WEB(REACT + FLASK STACK), IOS & MACOS (IN DEV)

----------------------------------------------------------------

:: TIPS & TRICKS FOR INSTALLING GPAW (PSEUDO WAVEFUNCTION GENERATOR/CALCULATOR) ON A MACOS ENVIRONMENT ::

Make sure you download libxc through brew and execute all the export commands on macOS:
https://gitlab.com/gpaw/gpaw/-/merge_requests/830/diffs#43b43d9adc91f1e38f6d186a1d173d83aaea27fd

After installing libxc through brew...

ON MAC:
1. export C_INCLUDE_PATH=/opt/homebrew/Cellar/libxc/5.2.3/include
2. export LIBRARY_PATH=/opt/homebrew/Cellar/libxc/5.2.3/lib
3. export LD_LIBRARY_PATH=/opt/homebrew/Cellar/libxc/5.2.3/lib
4. export LDFLAGS="-L/opt/homebrew/opt/openblas/lib"
5. export CPPFLAGS="-I/opt/homebrew/opt/openblas/include"

ON UBUNTU:
https://gitlab.com/gpaw/gpaw/-/blob/master/doc/platforms/Linux/ubuntu.rst#id1

After all this, execute pip3 install gpaw

----------------------------------------------------------------

:: HELPFUL LINKS ::

https://www.brown.edu/Departments/Engineering/Labs/Peterson/tips/ElectronDensity/index.html

----------------------------------------------------------------

:: HOW TO ACCESS HEROKU CLI BASH TERMINAL ::

heroku login
heroku ps:exec --app=scoreboard-backend-dev

----------------------------------------------------------------
'''

from server.extensions import db

from . import renderer

from server.elements.H2 import plot_hydrogen

bp = Blueprint('main', __name__, static_folder='../client/build', static_url_path='/')

# WHAT IS CORS: https://flask-cors.readthedocs.io/en/latest/

CORS(bp, resources={r'/api/*': {'origins': '*'}})

@bp.route('/')
def serve():
    return send_from_directory(bp.static_folder, 'index.html')

@bp.route('/api/plot', methods=['GET'])
@cross_origin()
def plot():
    if request.method == 'GET':
        plot_hydrogen()
        return renderer.element_plotter()
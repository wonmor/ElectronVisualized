from flask import Blueprint, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin

# from renderer import element_plotter

'''
----------------------------------------------------------------

THE "WORLD ENGINE," A RESTful API THAT POWERS THE INTERACTIVE MODULE ELECTRONVISUALIZED
DEVELOPED AND DESIGNED BY JOHN SEONG
SUPPORTED PLATFORMS: WEB, IOS & MACOS (IN DEV)

----------------------------------------------------------------

:: TIPS & TRICKS FOR INSTALLING GPAW (PSEUDO WAVEFUNCTION GENERATOR/CALCULATOR) ON A MACOS ENVIRONMENT ::

Make sure you download libxc through brew and execute all the export commands on macOS:
https://gitlab.com/gpaw/gpaw/-/merge_requests/830/diffs#43b43d9adc91f1e38f6d186a1d173d83aaea27fd

After installing libxc through brew...

1. export C_INCLUDE_PATH=/opt/homebrew/Cellar/libxc/5.2.3/include
2. export LIBRARY_PATH=/opt/homebrew/Cellar/libxc/5.2.3/lib
3. export LD_LIBRARY_PATH=/opt/homebrew/Cellar/libxc/5.2.3/lib
4. export LDFLAGS="-L/opt/homebrew/opt/openblas/lib"
5. export CPPFLAGS="-I/opt/homebrew/opt/openblas/include"

After all this, execute pip3 install gpaw

----------------------------------------------------------------

:: HELPFUL LINKS ::

https://www.brown.edu/Departments/Engineering/Labs/Peterson/tips/ElectronDensity/index.html

----------------------------------------------------------------
'''

from server.extensions import db

bp = Blueprint('main', __name__, static_folder='../client/build', static_url_path='/')

# WHAT IS CORS: https://flask-cors.readthedocs.io/en/latest/

CORS(bp, resources={r'/api/*': {'origins': '*'}})

@bp.route('/')
def serve():
    return send_from_directory(bp.static_folder, 'index.html')

@bp.route('/api/plot_diagram', methods=['POST'])
@cross_origin()
def plot_diagram():
    if request.method == 'POST':
        pass
        # return jsonify(element_plotter())
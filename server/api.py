from flask import Blueprint, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin

'''
----------------------------------------------------------------

█─█ ▀▀█▀▀ ░█─░█ ░█▀▀▀ 　 ░█──░█ ░█▀▀▀█ ░█▀▀█ ░█─── ░█▀▀▄ 　 ░█▀▀▀ ░█▄─░█ ░█▀▀█ ▀█▀ ░█▄─░█ ░█▀▀▀ █─█ 
─── ─░█── ░█▀▀█ ░█▀▀▀ 　 ░█░█░█ ░█──░█ ░█▄▄▀ ░█─── ░█─░█ 　 ░█▀▀▀ ░█░█░█ ░█─▄▄ ░█─ ░█░█░█ ░█▀▀▀ ─── 
─── ─░█── ░█─░█ ░█▄▄▄ 　 ░█▄▀▄█ ░█▄▄▄█ ░█─░█ ░█▄▄█ ░█▄▄▀ 　 ░█▄▄▄ ░█──▀█ ░█▄▄█ ▄█▄ ░█──▀█ ░█▄▄▄ ───

A RESTful API THAT POWERS THE INTERACTIVE MODULE ELECTRONVISUALIZED
DEVELOPED AND DESIGNED BY JOHN SEONG

SUPPORTED PLATFORMS: WEB(REACT + FLASK STACK), IOS & MACOS (IN DEV)

----------------------------------------------------------------

:: TIPS & TRICKS FOR INSTALLING GPAW (PSEUDO WAVEFUNCTION GENERATOR/CALCULATOR) IN A MACOS ENVIRONMENT ::

A MUST! ADD CONDA BUILDPACK TO HEROKU: https://elements.heroku.com/buildpacks/heroku-python/conda-buildpack

ALSO DO NOT PLACE GPAW IN THE REQUIREMENTS.TXT FILE; MOVE IT TO CONDA-REQUIREMENTS.TXT AS IT REQUIRES C DEPENDENCIES

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

:: HOW TO DOCKERIZE A REACT + FLASK STACK (REPLACE PATH WITH YOUR PROJECT PATH, DEFAULT SET TO MAC STANDARD)::

https://blog.miguelgrinberg.com/post/how-to-dockerize-a-react-flask-project
https://developer.okta.com/blog/2020/06/24/heroku-docker-react#deploy-your-react-app-to-heroku

BUILD DOCKER FILE COMMAND — SERVER:
docker build -f /Users/johnseong/Documents/GitHub/ElectronVisualized/Dockerfile.api -t electronvisualized-api .
[OPTIONAL] docker run --rm -p 5000:5000 electronvisualized-api

BUILD DOCKER FILE COMMAND — CLIENT:
docker build -f /Users/johnseong/Documents/GitHub/ElectronVisualized/Dockerfile.client -t electronvisualized-client .

DOCKER-COMPOSE:
docker-compose build
docker-compose up

HEROKU:
heroku stack:set container
heroku container:push --recursive
heroku container:release web worker // If it's DockerFile.web and DockerFile.worker...
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
    '''
    This function is executed in root directory, redirecting to the static HTML file generated by React front-end framework
    
    Parameters
    ----------
    None

    Returns
    -------
    DOM File
        Returns a HTML script that contains the visual elements of the website
    '''
    return send_from_directory(bp.static_folder, 'index.html')

@bp.route('/api/plot', methods=['GET'])
@cross_origin()
def plot():
    '''
    When API call is made, this function executes the plot_hydrogen method which computes the electron density data for hydrogen atom
    
    Parameters
    ----------
    None

    Returns
    -------
    JSON Array
        A JSONified dictionary that contains the electron density and coordinate data
    '''
    if request.method == 'GET':
        plot_hydrogen()
        return renderer.element_plotter()
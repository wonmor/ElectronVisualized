import json
import os

from flask import Blueprint, jsonify, request, send_from_directory, current_app
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit, join_room

from server.extensions import multipart_download_boto3

from . import molecule
from . import socketio

'''
█▀█ █▀▀ █▀ ▀█▀   ▄▀█ █▀█ █
█▀▄ ██▄ ▄█ ░█░   █▀█ █▀▀ █

DEVELOPED AND DESIGNED BY JOHN SEONG
'''

bp = Blueprint('main', __name__, static_folder='../client/build', static_url_path='/')

# WHAT IS CORS: https://flask-cors.readthedocs.io/en/latest/

CORS(bp, resources={r'/api/*': {'origins': '*'}})

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@socketio.on('join')
def join(message):
    '''
    When a user joins the room, they are added to the room's list of users
    
    Parameters
    ----------
    message : dict
        A dictionary containing the room name and the user's name

    Returns
    -------
    None
    '''
    username = message['username']
    room = message['room']
    join_room(room)
    print('RoomEvent: {} has joined the room {}\n'.format(username, room))
    emit('ready', {username: username}, to=room, skip_sid=request.sid)

@socketio.on('data')
def transfer_data(message):
    '''
    This function is called when a user sends a message to the server.
    
    Parameters
    ----------
    message : dict
        The message that the user sent to the server.

    Returns
    -------
    None
    '''
    username = message['username']
    room = message['room']
    data = message['data']
    print('DataEvent: {} has sent the data:\n {}\n'.format(username, data))
    emit('data', data, to=room, skip_sid=request.sid)

@socketio.on_error_default
def default_error_handler(e):
    '''
    This function handles all errors that occur in the socket.io connection
    
    Parameters
    ----------
    e: Exception
        The exception that was raised

    Returns
    -------
    None
    '''
    print("Error: {}".format(e))
    socketio.stop()

# For React Router Redirection Purposes...
@bp.app_errorhandler(404)   
def not_found(e):   
    '''
    This function is used to redirect the user to the React Router page

    Parameters
    ----------
    e: Exception
        The exception that was raised

    Returns
    -------
    DOM File
        Returns a HTML script that contains the visual elements of the website
    '''
    return bp.send_static_file('index.html')

@bp.route('/') 
def serve():
    '''
    This function is executed in root directory,
    redirecting to the static HTML file generated by React front-end framework
    
    Parameters
    ----------
    None

    Returns
    -------
    DOM File
        Returns a HTML script that contains the visual elements of the website
    '''
    return bp.send_static_file('index.html')

@bp.route('/api/gpaw/<name>', methods=['GET'])
@cross_origin()
def compute(name):
    '''
    When API call is made, this function executes
    the plot_hydrogen method which computes the
    electron density data for hydrogen atom.
    Not only that, it also automatically saves all the data
    on the Amazon S3 server.
    
    Parameters
    ----------
    name: String
        Contains the name of the element

    Returns
    -------
    JSON Object
        A JSONified dictionary that contains
        the electron density and coordinate data
    '''
    
    data = molecule.plot_molecule(name)
    return data

@bp.route('/api/load/<name>', methods=['GET'])
@cross_origin()
def load(name):
    '''
    When API call is made, this function loads
    the JSON data from the Amazon S3 server
    
    Parameters
    ----------
    name: String
        Contains the name of the element

    Returns
    -------
    JSON Object
        A JSONified dictionary that contains
        the electron density and coordinate data
    '''
    output = os.path.join(PROJECT_ROOT, f'client/src/assets/{name}.json')

    multipart_download_boto3(name, output)
    
    with open(output, 'r') as f:
        data = json.load(f)
        return data

@bp.route('/api/connect', methods=['POST'])
@cross_origin()
def connect():
    '''
    When API call is made, this function opens the SocketIO connection
    
    Parameters
    ----------
    None

    Returns
    -------
    None
    '''
    socketio.run(current_app, host="0.0.0.0", port=9000)

'''
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

:: ADDITIONAL REALLY HELPFUL LINKS ::

https://dev.to/ejach/how-to-deploy-a-python-flask-app-on-heroku-using-docker-mpc

HOW TO SET UP FOR MACOS & MAC APP STORE DISTRIBUTION:
https://stackoverflow.com/questions/72194861/electron-macos-app-not-available-for-testing-in-testflight

WEBRTC FLASK + REACT TUTORIAL:
https://www.100ms.live/blog/python-react-webrtc-app
https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial

----------------------------------------------------------------
'''
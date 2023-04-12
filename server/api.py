import json
import os

from flask import Blueprint, request, current_app, send_file, make_response
import flask

from flask_cors import CORS, cross_origin
import flask_praetorian
from flask_socketio import SocketIO, emit, join_room

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from botocore.exceptions import ClientError
from server.extensions import multipart_download_boto3, multipart_upload_boto3

from . import User, molecule, atom, socketio, guard, db

'''
█▀█ █▀▀ █▀ ▀█▀   ▄▀█ █▀█ █
█▀▄ ██▄ ▄█ ░█░   █▀█ █▀▀ █

DEVELOPED AND DESIGNED BY JOHN SEONG
'''

bp = Blueprint('main', __name__, static_folder='../client/build', static_url_path='/')

limiter = Limiter(
    current_app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

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
@limiter.exempt
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
@limiter.exempt
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

@bp.route('/api/atom-by-quantum-number/<data>', methods=['GET'])
@limiter.limit("30 per minute")
def compute_atom_by_quantum_no(data):
    '''
    This function is used to compute the atom's data by the quantum numbers
    
    Parameters
    ----------
    quantum_no: str
        The quantum numbers of the atom

    Returns
    -------
    JSON
        Returns a JSON file containing the atom's data
    '''
    dataList = data.split('-')

    n = int(dataList[0])
    l = int(dataList[1])
    m = int(dataList[2])
    name = int(dataList[3])


    return_value = atom.plot_atomic_orbital(name, n, l, m)
    return return_value

@bp.route('/api/atom/<name>', methods=['GET'])
@limiter.limit("5 per minute")
@cross_origin()
def compute_atom(name):
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
    with open('server/quantum_num.json', 'r') as f:
        name_dict = json.load(f)
        current_name = name_dict[name]

        data = atom.plot_atomic_orbital(name, current_name["n"], current_name["l"], current_name["m"])
        return data

@bp.route('/api/molecule/<name>', methods=['GET'])
@limiter.limit("5 per minute")
@cross_origin()
def compute_molecule(name):
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
@limiter.exempt
@cross_origin()
def load_from_s3(name):
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

@bp.route('/api/loadSPH/<name>', methods=['GET'])
@limiter.exempt
@cross_origin()
def loadSPH_from_s3(name):
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
    output = os.path.join(PROJECT_ROOT, f'client/src/assets/SPH_{name}.json')

    multipart_download_boto3("SPH_" + name, output)
    
    with open(output, 'r') as f:
        data = json.load(f)
        return data
    
@bp.route('/api/upload', methods=['POST'])
@limiter.limit("5 per minute")
@cross_origin()
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file uploaded!', 400

        file = request.files['file']
        name = request.form.get('name')

        if file.filename == '':
            return 'No file uploaded!', 400
        
        # Save the file to the server's file system
        file_path = os.path.join('server', file.filename)
        file.save(file_path)

        # Upload the file to S3
        multipart_upload_boto3(name, file_path)

@bp.route('/api/download/<key>', methods=['GET'])
@limiter.exempt()
@cross_origin()
def download_file(key):
    try:
        file_path = f'server/{key}'
        multipart_download_boto3(key, file_path)

        # Change the file extension to .glb
        name, extension = os.path.splitext(file_path)
        new_file_path = f'{name}.glb'
        os.rename(file_path, new_file_path)

        response = make_response(send_file(new_file_path.replace("server/", ""), as_attachment=True))
        response.headers['Content-Disposition'] = f'attachment; filename="{key}"'
        return response

    except ClientError as e:
        print(e)
        return 'Error downloading file from S3!', 500
    
@bp.route('/api/connect', methods=['POST'])
@limiter.exempt
@cross_origin()
def connect_to_socket():
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

@bp.route('/api/login', methods=['POST'])
@limiter.limit("100 per minute")
@cross_origin()
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    .. example::
       $ curl http://localhost:5000/api/login -X POST \
         -d '{"username":"Yasoob","password":"strongpassword"}'
    """
    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200

@bp.route('/api/register', methods=['POST'])
@limiter.limit("30 per minute")
@cross_origin()
def register():
    """
    Registers a new user by parsing a POST request containing user credentials and
    adding the user to the database.
    .. example::
       $ curl http://localhost:5000/api/register -X POST \
         -d '{"username":"Yasoob","password":"strongpassword"}'
    """
    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    if username is None or password is None:
        return {'error': 'Missing username or password'}, 400
    if User.query.filter_by(username=username).first() is not None:
        return {'error': 'Username already taken'}, 400
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    ret = {'message': 'Registration successful'}
    return ret, 201


@bp.route('/api/check_duplicate_username', methods=['POST'])
@limiter.limit("30 per minute")
@cross_origin()
def check_duplicate_username():
    """
    Checks whether a given username is already present in the database.
    .. example::
       $ curl http://localhost:5000/api/check_duplicate_username -X POST \
         -d '{"username":"Yasoob"}'
    """
    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    if username is None:
        return {'error': 'Missing username'}, 400
    if User.query.filter_by(username=username).first() is not None:
        return {'duplicate': True}, 200
    return {'duplicate': False}, 200

  
@bp.route('/api/refresh', methods=['POST'])
@limiter.limit("30 per minute")
@cross_origin()
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200
  
  
@bp.route('/api/protected')
@limiter.limit("30 per minute")
@cross_origin()
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return {'message': f'protected endpoint (allowed user {flask_praetorian.current_user().username})'}


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

FLASK-REACT JWT AUTHENTICATION:
https://yasoob.me/posts/how-to-setup-and-deploy-jwt-auth-using-react-and-flask/

----------------------------------------------------------------
'''
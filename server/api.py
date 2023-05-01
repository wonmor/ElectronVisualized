import json
import os

from flask import Blueprint, jsonify, redirect, request, current_app, send_file, make_response
import flask

from flask_cors import CORS, cross_origin
import flask_praetorian
from flask_socketio import SocketIO, emit, join_room

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from botocore.exceptions import ClientError
from server.extensions import multipart_download_boto3, multipart_upload_boto3

from . import User, atomic_orbital, electron_density, socketio, guard, db
from dotenv import load_dotenv
load_dotenv()

import stripe

# Initialize Firebase credentials
cred = credentials.Certificate("server/service_account.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

STRIPE_WEBHOOK_SECRET = os.environ.get('STRIPE_WEBHOOK_SECRET')
REVENUECAT_STRIPE_API_KEY = os.environ.get('REVENUECAT_STIRPE_API_KEY')

YOUR_DOMAIN = 'http://127.0.0.1:5000/membership'

if os.environ.get("FLASK_DEBUG") == True:
    YOUR_DOMAIN = 'https://electronvisual.org/membership'

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


    return_value = atomic_orbital.plot_atomic_orbital(name, n, l, m)
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

        data = atomic_orbital.plot_atomic_orbital(name, current_name["n"], current_name["l"], current_name["m"])
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
    
    data = electron_density.plot_molecule(name)
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
    
@bp.route('/api/get-articles')
@limiter.exempt
@cross_origin()
def get_articles():
    with open('server/articles.json', 'r') as f:
        articles = json.load(f)

    return jsonify(articles)
    
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

@bp.route('/api/downloadGLB/<key>', methods=['GET'])
@limiter.exempt()
@cross_origin()
def download_glb(key):
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
    

@bp.route('/api/downloadPNG/<key>', methods=['GET'])
@limiter.exempt()
@cross_origin()
def download_png(key):
    try:
        file_path = f'server/{key}'
        multipart_download_boto3(key, file_path)

        # Change the file extension to .png
        name, extension = os.path.splitext(file_path)
        new_file_path = f'{name}.png'
        os.rename(file_path, new_file_path)

        response = make_response(send_file(new_file_path.replace("server/", ""), as_attachment=True))
        response.headers['Content-Disposition'] = f'attachment; filename="{key}"'
        return response

    except ClientError as e:
        print(e)
        return 'Error downloading file from S3!', 500
    
@bp.route('/api/connect', methods=['POST'])
@limiter.exempt()
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

@bp.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    price_id = request.form.get('priceId')
    app_user_id = request.form.get('appUserId')

    try:
        checkout_session = stripe.checkout.Session.create(
            client_reference_id=app_user_id,
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price': price_id,
                    'quantity': 1,
                },
            ],
            mode='subscription',
            success_url=YOUR_DOMAIN + '?success=true',
            cancel_url=YOUR_DOMAIN + '?canceled=true',
            automatic_tax={'enabled': True},
        )

    except Exception as e:
        return str(e)

    return redirect(checkout_session.url, code=303)

@bp.route('/api/create-portal-session', methods=['POST'])
def customer_portal():
    # For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    # Typically this is stored alongside the authenticated user in your database.
    checkout_session_id = request.form.get('session_id')
    checkout_session = stripe.checkout.Session.retrieve(checkout_session_id)

    # This is the URL to which the customer will be redirected after they are
    # done managing their billing with the portal.
    return_url = YOUR_DOMAIN

    portalSession = stripe.billing_portal.Session.create(
        customer=checkout_session.customer,
        return_url=return_url,
    )
    return redirect(portalSession.url, code=303)

# The use of webhooks allows web applications to automatically communicate with other web-apps.
# Connected directly on the Stripe dashboard, this webhook will send a POST request to the specified
@bp.route('/api/webhook', methods=['POST'])
def webhook_received():
    # Replace this endpoint secret with your endpoint's unique secret
    # If you are testing with the CLI, find the secret by running 'stripe listen'
    # If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    # at https://dashboard.stripe.com/webhooks
    webhook_secret = STRIPE_WEBHOOK_SECRET
    request_data = json.loads(request.data)

    # Send the receipt to RevenueCat
    # https://community.revenuecat.com/third-party-integrations-53/help-sending-stripe-webhooks-rest-api-2055

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers['STRIPE_SIGNATURE']
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']

    print('event ' + event_type)

    if event_type == 'checkout.session.completed':
        # Retrieve the Checkout Session ID from the event data
        checkout_session_id = data_object['id']

        # Retrieve the customer ID from the Checkout Session object
        customer_id = data_object['client_reference_id']

        # Retrieve the subscription ID from the Checkout Session object
        subscription_id = data_object['subscription']

        # Use the customer ID and subscription ID to fetch the latest receipt and subscription data from RevenueCat
        headers = {
            'Content-Type': 'application/json',
            'X-Platform': 'stripe',
            'Authorization': f'Bearer {REVENUECAT_STRIPE_API_KEY}'
        }

        data = {
            'app_user_id': customer_id,
            'fetch_token': subscription_id
        }

        response = requests.post('https://api.revenuecat.com/v1/receipts', headers=headers, json=data)

        if response.status_code == 200:
            # Payment succeeded!
            print('🔔 Payment succeeded!')
            # Store checkout session ID in the document with the name of customer_id in the customers collection inside Firebase Firestore
            doc_ref = db.collection(u'customers-stripe').document(customer_id)
            doc_ref.set({
                u'checkout_session_id': checkout_session_id
            }, merge=True)
        else:
            print('❌ Payment failed!')

    return jsonify({'status': 'success'})

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
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room

from dotenv import load_dotenv

import os

'''
----------------------------------------------------------------

█─█ ▀▀█▀▀ ░█─░█ ░█▀▀▀ 　 ░█──░█ ░█▀▀▀█ ░█▀▀█ ░█─── ░█▀▀▄ 　 ░█▀▀▀ ░█▄─░█ ░█▀▀█ ▀█▀ ░█▄─░█ ░█▀▀▀ █─█ 
─── ─░█── ░█▀▀█ ░█▀▀▀ 　 ░█░█░█ ░█──░█ ░█▄▄▀ ░█─── ░█─░█ 　 ░█▀▀▀ ░█░█░█ ░█─▄▄ ░█─ ░█░█░█ ░█▀▀▀ ─── 
─── ─░█── ░█─░█ ░█▄▄▄ 　 ░█▄▀▄█ ░█▄▄▄█ ░█─░█ ░█▄▄█ ░█▄▄▀ 　 ░█▄▄▄ ░█──▀█ ░█▄▄█ ▄█▄ ░█──▀█ ░█▄▄▄ ───

A RESTful API THAT POWERS THE INTERACTIVE MODULE ELECTRONVISUALIZED
DEVELOPED AND DESIGNED BY JOHN SEONG

SUPPORTED PLATFORMS: WEB(REACT + FLASK STACK), IOS & MACOS (IN DEV)
----------------------------------------------------------------
'''

socketio = SocketIO()

def create_app():
    '''
    Initializes the Flask REST API that handles most of the mathematical operations
    
    Parameters
    ----------
    None
    
    Returns
    -------
    None
    '''
    app = Flask(__name__, static_folder='../client/build', static_url_path='/')
    
    from . import api
    load_dotenv()

    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
    app.register_blueprint(api.bp)
    
    global socketio
    socketio.init_app(app)
    
    return app


# Created a global variable that runs the create_app function, in order to import it from the terminal
app = create_app()

'''
STEPS TO GENERATE THE DB FILE
1. cd guessing-game-bla-bla
2. python3 (on mac, windows: open a python terminal)
3. >>> import website
4. >>> from website.extensions import db
5. >>> from website import app
6. >>> db.create_all(app=website.create_app())

TIPS & TRICKS
1. COMMAND + K and then COMMAND + C to comment multiple lines on VSCode
2. FLASK ENVIRONMENT EXPLANATION: https://pythonbasics.org/flask-environment-production/
3. HOW TO SET UP SECRET_KEY ON HEROKU: https://stackoverflow.com/questions/47949022/git-heroku-how-to-hide-my-secret-key
4. COMMAND (RUN ON TERMINAL): heroku config:set SECRET_KEY='<ENTER SECRET KEY>' -a lottery-simulator-2022
4. HEROKU-FLASK-REACT SETUP TUTORIAL: https://towardsdatascience.com/reactjs-python-flask-on-heroku-2a308272886a
'''

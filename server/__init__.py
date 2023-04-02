from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_praetorian import Praetorian
from flask_cors import CORS

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
db = SQLAlchemy()
guard = Praetorian()
cors = CORS()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True, server_default='true')

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active


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

    # Create the 'users' directory if it doesn't exist
    users_dir = os.path.join(os.getcwd(), 'server', 'users')
    os.makedirs(users_dir, exist_ok=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.getcwd(), 'server', 'users', 'database.db')}"
    app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
    app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

    app.register_blueprint(api.bp)

    # Initialize the flask-praetorian instance for the app
    guard.init_app(app, User)

    db.init_app(app)

    # Initializes CORS so that the api_tool can talk to the example app
    app.config['CORS_HEADERS'] = 'Content-Type'
    cors.init_app(app)

    with app.app_context():
        db.create_all()
    
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

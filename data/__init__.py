from data.main_controller import MainController
from .extensions import db
from flask import Flask
from dotenv import load_dotenv

import logging

import os


# COMMAND + K and then COMMAND + C to comment multiple lines on VSCode

# FLASK ENVIRONMENT EXPLANATION: https://pythonbasics.org/flask-environment-production/

# HOW TO SET UP SECRET_KEY ON HEROKU: https://stackoverflow.com/questions/47949022/git-heroku-how-to-hide-my-secret-key
# COMMAND (RUN ON TERMINAL): heroku config:set SECRET_KEY='<ENTER SECRET KEY>' -a lottery-simulator-2022

def create_app():
    # Initialize the app
    app = Flask(__name__, instance_relative_config=True)

    # GENERATE REQUIREMENTS.TXT: pip3 freeze > requirements.txt

    from . import view_controller

    app.logger.debug('App init!')

    load_dotenv()

    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

    app.register_blueprint(view_controller.bp)

    # SETTING UP THE BLUEPRINT TO PREVENT CIRCULAR IMPORT; TUTORIAL: https://stackoverflow.com/questions/23432791/how-to-handle-dynamic-decorators-in-python-easily

    # HOW TO OUTSOURCE SECRET KEY SO THAT IT DOES NOT GET COMMITED TO GITHUB: https://stackoverflow.com/questions/51228227/standard-practice-for-wsgi-secret-key-for-flask-applications-on-github-reposito

    # Load the config
    # app.config.update(
    #     TESTING=True,
    #     DEBUG=True
    # )
    # app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY") => FOR DISTRIBUTION PURPOSES (TO HIDE THE API KEY)

    # Add SQLAlchemy database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'

    register_extensions(app)

    return app


def register_extensions(app):
    # Intialize the database
    db.init_app(app)


# Created a global variable that runs the create_app function, in order to import it from the terminal
app = create_app()

# HOW TO FIX THE CIRCULAR IMPORT ERROR: https://stackoverflow.com/questions/60142047/in-flask-is-it-possible-to-import-views-using-the-create-app-pattern-without-u
# DON'T PUSH PYCACHE, DB, AND VENV - ANY REGENERATIVE FILES SHOULDN'T BE PUSHED!

# STEPS TO GENERATE THE DB FILE
# 1. cd guessing-game-bla-bla
# 2. python3 (on mac, windows: open a python terminal)
# 3. >>> import website
# 4. >>> from website.extensions import db
# 5. >>> from website import app
# 6. >>> db.create_all(app=website.create_app())
# VERY IMPORTANT!!

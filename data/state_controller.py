from flask import Blueprint, render_template, request, session, jsonify, current_app, Response
from data.main_activity import MainActivity

from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure

from states import menu, sim

from data.extensions import db

from data.main_controller import MainController

import state_constants

import io

states = state_constants.Views

bp = Blueprint('main', __name__)


@bp.route('/')
def plot_png():
    fig = MainActivity.plot_points()
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')

# class Views(object):

#     def __init__(self):
#         self.state_machine(states.MENU)

#     def update_view(self, target):
#         self.state_machine(target)

#     @staticmethod
#     def state_machine(target):
#         match target:
#             case states.MENU:
#                 menu_vw = menu.Menu()
#             case states.SIM:
#                 sim_vw = sim.Sim()


'''
WHAT IS CLASSMETHOD?
https://www.programiz.com/python-programming/methods/built-in/classmethod
'''

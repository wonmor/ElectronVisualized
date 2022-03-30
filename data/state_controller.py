from states import menu, sim
from . import state_constants

states = state_constants.Views
    
class Views(object):

    def __init__(self):
        self.state_machine(states.MENU)

    def update_view(self, target):
        self.state_machine(target)

    @staticmethod
    def state_machine(target):
        match(target):
            case states.MENU:
                menu_vw = menu.Menu()
            case states.SIM:
                sim_vw = sim.Sim()







'''
WHAT IS CLASSMETHOD?
https://www.programiz.com/python-programming/methods/built-in/classmethod
'''
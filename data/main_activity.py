import state_controller as sc

from . import state_constants

class MainActivity(object):
    
    def __init__(self):
        sc.Views()
        self.display_index = 4
        self.on_validate()

    # Runs when the state is changed as well as when the game starts
    def on_validate(self):
        # Sets up the screen resolution
        pass

    # This function runs every frame
    def update(self):
        pass


class MainController(object):

    def __init__(self):
        self.done = False
        self.main_loop()

    # Handles quit event...
    def event_loop(self):
        pass

    # All of the events start happening here...
    def main_loop(self):
        while not self.done:
            self.event_loop()
            m_activity = MainActivity()
            m_activity.update()

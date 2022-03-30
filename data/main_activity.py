import pygame as pg
import state_controller as sc

from . import state_constants

from pygame.locals import (
    K_UP,
    K_DOWN,
    K_LEFT,
    K_RIGHT,
    K_ESCAPE,
    KEYDOWN,
    QUIT,
)

class MainActivity(object):
    
    def __init__(self):
        pg.init()
        sc.Views()
        pg.font.init()
        self.display_index = 4
        self.on_validate()

    # Runs when the state is changed as well as when the game starts
    def on_validate(self):
        # Sets up the screen resolution
        screen = pg.display.set_mode(state_constants.DISPLAYS[self.display_index])
        screen.fill((0,0,0))

    # This function runs every frame
    def update(self):
        now = pg.time.get_ticks()


class MainController(object):

    def __init__(self):
        self.fps = 60.0
        self.screen = pg.display.get_surface()
        self.clock = pg.time.Clock()
        self.done = False
        self.main_loop()

    # Handles quit event...
    def event_loop(self):
        for event in pg.event.get():
            if event.type == pg.QUIT:
                self.done = True

    # All of the events start happening here...
    def main_loop(self):
        while not self.done:
            self.event_loop()
            m_activity = MainActivity()
            m_activity.update()
            pg.display.update()
            self.clock.tick(self.fps)

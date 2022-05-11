from data.main_activity import MainActivity


class MainController(object):

    def __init__(self):
        self.m_activity = MainActivity()
        self.done = False
        self.main_loop()

    # Handles quit event...
    def event_loop(self):
        pass

    # All the events start happening here...
    def main_loop(self):
        while not self.done:
            self.event_loop()
            self.m_activity.update()

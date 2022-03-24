class StateMachine(object):
    def __init__(self):
        self.done = False
        self.state_dict = {}
        self.state_name = None
        self.state = None
        self.now = None

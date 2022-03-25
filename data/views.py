from enum import Enum

class States(Enum):
    MENU = 0
    
    
class Views(object):
    def state_machine(target):
        match(target):
            case MENU:
                pass


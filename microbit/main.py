'''
PROJECT ATOMIZER
FOR USE ON MICROBIT CONTROLLER

DEVELOPED AND DESIGNED BY JOHN SEONG
'''

from microbit import *
import audio
import speech

state = 'INIT';

while True:
    if state == 'INIT':
        display.scroll('ATOMIZER', wait=False, loop=True)
        state = 'IDLE'
        
    if state == 'IDLE':
        if button_a.was_pressed():
            display.scroll('OBJECT', wait=False, loop=False)
            audio.play(Sound.HAPPY)
            state = 'OBJECT'
            
        if button_b.was_pressed():
            display.scroll('CAMERA', wait=False, loop=False)
            audio.play(Sound.HAPPY)
            state = 'CAMERA'
            
            
    if state == 'CAMERA' or state == 'OBJECT':
        state = 'IDLE'
        
    sleep(10) # a 10 millisecond delay

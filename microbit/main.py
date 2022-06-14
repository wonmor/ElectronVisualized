'''Example Microbit Program
Save this program onto your microbit as 'main.py' and it will run automatically
Ctrl-D to restart the program on the microbit
Ctrl-C to end the program on the microbit
Microbit Micropython API is here: https://microbit-micropython.readthedocs.io/en/v1.0.1/microbit_micropython_api.html

'''

from microbit import *
import audio
import speech

state = 'INIT';

counter = 0 # initialise the counter

while True:
    if state == 'INIT':
        display.scroll('PROJECT ATOMIZER', wait=False, loop=True)
        state = 'IDLE';
        
    if state == 'IDLE':
        pass
    
    if button_a.was_pressed(): # get the next multiple of the thirteen
        counter += 1 # Increase the counter
        #print(f"Button a has been pressed {counter} times") # f strings won't work on the microbit :(
        print('Button a has been pressed ' + str(counter) +' times') # print the counter using string concatenation instead
        display.scroll('FUCK', wait=False, loop=False)
        
    
    if button_b.was_pressed(): # Say Hello
        display.show(Image.HAPPY)
        audio.play(Sound.HAPPY)
#         speech.say("I am a little robot",  speed=92, pitch=60, throat=190, mouth=190)

        speech.say("I am a DALEK - EXTERMINATE", speed=120, pitch=100, throat=100, mouth=200)

        display.clear()
        
    sleep(10) # a 10 millisecond delay

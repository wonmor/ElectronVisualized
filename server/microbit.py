#-----------------------------------------------------------------------------
# Name:        Microbit Class (Microbit.py)
# Purpose:     This class detects a microbit and reads information from any active serial connections
#
# Author:      Mr. Brooks-Prenger
# Created:     31-March-2021
# Updated:     3-June-2022
#-----------------------------------------------------------------------------
#EXAMPLE CODE HOW TO USE THIS CLASS
# def main():
#     #Create microbit instance
#     mb = Microbit()
#     
#     #Check to make sure it's working
#     if not mb.isReady():
#         print('Error, Problem Loading Microbit.  Exiting Program')
#         return
#          
# 
#     while True:
#         
#         line = mb.nonBlockingReadRecentLine()
#         if line != None:
#             print(line)
#         
#     mb.closeConnection()
#     
# main()
#-----------------------------------------------------------------------------
import serial
import serial.tools.list_ports as list_ports
import time

class Microbit():
    
    def __init__(self, excludePorts=[]):
        self.isLoaded = False
        self.dataCache = ''
        
        print('looking for microbit')

        self.microbit = self.findMicrobitComPort(excludePorts=excludePorts)
        print(self.microbit)
        if not self.microbit:
            print('microbit not found')
            return
        
        print('opening microbit port')
        self.openConnection()
        print('microbit is ready for use')
        #microbit.open()
    
    
    def nonBlockingReadLine(self,strip=True):
        '''
        A non-blocking read that reads and returns a single line of data.
        If there is more than one line of data in buffer the 'oldest' line is sent and rest of data preserved for next call.
        A line is defined as a series of text that ends in the \r\n characters.
        
        
        #TODO: Implement a parameter (or method) that reads the most recent line and purges the rest instead of reading oldest  #data = data[0].rpartition('\r\n')[-1]  
        
        Parameters
        __________
        strip = If True, strips /r/n from the returned data string
        
        Returns
        -------
        String - A single line of data, None otherwise.
        '''
        if (self.microbit.inWaiting()>0 or self.dataCache != ''):
            self.dataCache += self.microbit.read(self.microbit.inWaiting()).decode('utf-8')#read the bytes and convert from binary array to utf-8
            
            
            isFullLine = self.dataCache.count('\r\n')
#             print(f'!!!  dataCache: {self.dataCache} isFullLine: {isFullLine}')
            if isFullLine >= 1:
             
                data = self.dataCache.partition('\r\n')#.strip() #split the data into 3 parts [useful, /r/n, cut off data]
                self.dataCache = data[-1]                         #Take the cut off data and save it for later
                data = data[0]#.rpartition('\r\n')[-1]        #Split the first complete chunk of data off for return
                
                if not strip: data += '\r\n'
                return data
        
        return None
    
    def nonBlockingReadNewestLine(self,strip=True):
        '''
        A non-blocking read that reads and returns a single line of data.
        If there is more than one line of data in buffer the 'newest' line is sent and rest of data purged.
        A line is defined as a series of text that ends in the \r\n characters.
        
        
        Parameters
        __________
        strip = If True, strips /r/n from the returned data string
        
        Returns
        -------
        String - A single line of data, None otherwise.
        '''
        if (self.microbit.inWaiting()>0 or self.dataCache != ''):
            self.dataCache += self.microbit.read(self.microbit.inWaiting()).decode('utf-8')#read the bytes and convert from binary array to utf-8
            
            
            isFullLine = self.dataCache.count('\r\n')
            if isFullLine >= 1:
                
                data = self.dataCache.rpartition('\r\n')#.strip() #split the data into 3 parts [useful, /r/n, cut off data]                     
                self.dataCache = data[-1]                         #Take the cut off data and save it for later       
                data = data[0].rpartition('\r\n')[-1]        #Split the last complete chunk of data off and save (keeps only newest data sent by microbit)

                if not strip: data += '\r\n'
                return data
        
        return None


    def nonBlockingReadAll(self):
        '''
        A non-blocking read that returns any data that is currently in the serial buffer
        This method often breaks messages into tiny chunks/partial messages quite often.
        But it works with much shorter message durations.
        
        Returns
        -------
        String - Any data in the serial buffer as a text string, None otherwise.
        '''
        if (self.microbit.inWaiting()>0):
            data = self.microbit.read(self.microbit.inWaiting()).decode('utf-8') #read the bytes and convert from binary array to utf-8
            return(data)
        return None

        
    def isReady(self):
        '''
        Check the microbit to see if it's ready for use.
        
        Returns
        -------
        Boolean - True if microbit is open and ready, False otherwise
        '''
        try:
            self.microbit.inWaiting()
            
        except:
            #not open, try to open
            try:
                self.openConnection()
            except:
                return False
        
        return True
        
    
    def openConnection(self):
        self.microbit.open()
        #TODO - Add error handling here
        
    def closeConnection(self):
        self.microbit.close()

    def getPort(self):
        return self.microbit.port

    def findMicrobitComPort(self, pid=516, vid=3368, baud=115200, excludePorts=None):
        '''
        This function finds a device connected to usb by it's PID and VID and returns a single serial connection
        Adapted From - https://stackoverflow.com/questions/58043143/how-to-set-up-serial-communication-with-microbit-using-pyserial

        Parameters
        ----------
        pid - Product id of device to search for
        vid - Vendor id of device to search for
        baud - Baud rate to open the serial connection at

        Returns
        -------
        Serial - If a device is found a serial connection for the device is configured and returned

        '''
        #Required information about the microbit so it can be found
        #PID_MICROBIT = 516
        #VID_MICROBIT = 3368
        TIMEOUT = 0.1
        
        #Create the serial object
        serPort = serial.Serial(timeout=TIMEOUT)
        serPort.baudrate = baud
        
        #Print out all ports that will not be used
        print(f"The following ports are excluded ports: {excludePorts}")
        
        #Search for device on open ports and return connection if found
        ports = list(list_ports.comports())
        
        #print(ports)
        print('scanning ports')
        for p in ports:
            #Check for excluded port and skip if found
            if p.device in excludePorts:
                print(f'{p.device} is excluded, skip it')
                continue
            
            print('Port found: {}'.format(p))
            try:
                print('Port information - pid: {} vid: {}'.format(p.pid, p.vid))
            except AttributeError:
                print('Error - no pid or vid found')
                continue
            
            if (p.pid == pid) and (p.vid == vid):
                print(f'Found a microbit pid: {p.pid} vid: {p.vid} port: {p.device}')
                serPort.port = str(p.device)
                return serPort
        
        #If nothing found then return None
        return None




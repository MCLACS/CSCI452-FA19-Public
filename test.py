
#Used for URL and Connections
import socket as soc
import json
import urllib

#TODO write test cases and set up base environment

def runTests():
	printGreen( "IP: " + getIP())




#FUNCTION to get IP for the URL for testing
def getIP():
	hostname = soc.gethostname()
	ip_address = soc.gethostbyname(hostname)
	
	return ip_address;



## look at python colored text ANSI escape sequences if wanting more color labels for style##

#Print red for fancy fail messages
def printRed(string):
	print("\033[91m {}\033[00m" .format(string))

#Print Green for fancy pass messages
def printGreen(string):
	print("\033[92m {}\033[00m" .format(string))

runTests()



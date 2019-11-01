##############################################################################
#Automated steps test for test.py

#1) create a function for what you are testing
#2) in function set the URL = the baseUrl + http request you are testing
	# for Example url = baseUrl + "insertSnippet?params=a&params2=b"

#3) get json text from URL using urllib.request.urlopen(url).read()

#4)get json by using json = json.loads(jsonText)

#5) set what your expected json result for the test and compare that to the json you received from the URL
	#if they are the same the test should pass, else the test has failed

#6) print the name of the Test in red if it fails and print failed and green if it passes and print passes
	#this displays in console and makes it pretty and easier to notice
#7) set function call for test in runTests()
	#runTests() is called at the very end

### make sure for organization purposes to do the tests in the order they are in the server.js

##############################################################################

#Used for URL and Connections
import json
import urllib

#TODO write test cases and set up base environment

#baseURL is the localhost address since we are testing internally. if doesnt work may have to use diff IP
baseURL = "http://127.0.0.1/"

def runTests():

	#make sure the server connects to index.html and base URL works
	testServeIndex()

## look at python colored text ANSI escape sequences if wanting more color labels for style##
#Print red for fancy fail messages
def printRed(string):
	print("\033[91m {}\033[00m" .format(string))

#Print Green for fancy pass messages
def printGreen(string):
	print("\033[92m {}\033[00m" .format(string))

def testServeIndex():
	url = baseURL

runTests()



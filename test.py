##############################################################################
#Automated steps test for test.py

#in order to make sure your test works make it so the code fails the test first before you make it pass

#1) create a function for what you are testing
#2) in function set the URL = the baseUrl + http request you are testing
	# for Example url = baseUrl + "insertSnippet?params=a&params2=b"

#3) get url content from URL using r = request.get(url)

#4)get json by using json = r.json() 

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
import requests


#baseURL is the localhost address since we are testing internally. if doesnt work may have to use diff IP
baseURL = "http://127.0.0.1/"

passCount = 0
failCount = 0

def runTests():

	#make sure the server connects to index.html and base URL works
	testServeIndex()

	#make sure getSnippets retrieves snippets
	testGetSnippets()

	testRegistration()

	testGetQuestions()
	testLogin()
	testLogout()
	testWhoIsLoggedIn()

	


## look at python colored text ANSI escape sequences if wanting more color labels for style##
#Print red for fancy fail messages
def printRed(string):
	print("\033[91m {}\033[00m" .format(string))

#Print Green for fancy pass messages
def printGreen(string):
	print("\033[92m {}\033[00m" .format(string))


#test to see that serve index does what it needs to for grabbing index.html
def testServeIndex():
	global passCount
	global failCount
	
	print()
	print("==Testing serveIndex to see if index and server connect==")
	print()
	#not really needed in this instance but to provide the framework of how to write a test
	url = str(baseURL)

	r = requests.get(url)

	if(r.status_code == 200):
		printGreen("STATUS CODE : " + str(r.status_code))
		printGreen("Test to see if index gets served")
		printGreen("+Expected Status Code 200 and received 200") 
		printGreen("+Passed")
		passCount += 1

	else:
		printRed("STATUS CODE : " + str(r.status_code))
		printRed("Test to see if index gets served")
		printRed("Expected Status Code 200 and received " + str(r.status_code))
		printRed("-Failed")
		failCount += 1

	print()
	

def testGetSnippets():
	global passCount
	global failCount

	print()
	print("==Test that getSnippets grabs Snippets from database if good filters input==")
	print()

	mockData = {'filter' : 'java', 'category' : 'SNIP_LANG' , 'order' : 'ASC'}

	url = baseURL + "getSnippets?filter=" + mockData['filter'] + "&category=" + mockData['category'] + '&order=' + mockData['order']

	r = requests.get(url)

	json = r.json()


		
	if 'result' in json:
		printGreen("+Snippets able to be retrieved")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Error found in json so retrieval failed")
		printRed("-Failed")
		failCount += 1

	print()
	print("==When no category or order selected, do not retreive snippets==")
	print()

	url = baseURL + "getSnippets?filter=" + mockData['filter'] + "&category=&order="

	r = requests.get(url)

	json = r.json()

	if 'error' in json:
		printGreen("+Snippets not retrieved")
		printGreen("+Passed")
		passCount += 1

	else:
		printRed("-snippets retreived but not supposed to")
		printRed("-Failed")
		failCount += 1






	
	print()

def testRegistration():
	global passCount
	global failCount

	mockData = {'email' : 'test@we.com', 'password' : '1234567p', 'Q1' : 'Your true name', 'Q2' : 'Your home address', 'A1' : 'a', 'A2' : 'fido'}
	print()
	print("==When invalid email is chosen return regError==")
	print()

	url = baseURL + "register?email=a&password=" + mockData['password'] + "&Q1=" + mockData['Q1'] + "&Q2=" + mockData['Q2'] + "&A1=" + mockData['A1'] + "&A2=" + mockData['A2']

	r = requests.get(url)
	json = r.json()

	if not (json['regError'] == "" or json['regError'] == None):
		printGreen("+Bad username returned error")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Bad Username Didn't return Error")
		printRed("-Failed")
		failCount += 1

	print()
	print('==When given Bad Password return regError=')
	print()

	url = baseURL + "register?email=" + mockData['email'] +"&password=123" + "&Q1=" + mockData['Q1'] + "&Q2=" + mockData['Q2'] + "&A1=" + mockData['A1'] + "&A2=" + mockData['A2']

	r = requests.get(url)
	json = r.json()

	if not (json['regError'] == "" or json['regError'] == None):
		printGreen("+Bad password returned error")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Bad password Didn't return Error")
		printRed("-Failed")
		failCount += 1


	print()
	print('==when 2 of the same questions are chosen return RegError==')
	print()
	url = baseURL + "register?email=" + mockData['email'] +"&password=" + mockData['password'] + "&Q1=" + mockData['Q1'] + "&Q2=" + mockData['Q1'] + "&A1=" + mockData['A1'] + "&A2=" + mockData['A2']


	r = requests.get(url)
	json = r.json()

	if not (json['regError'] == "" or json['regError'] == None):
		printGreen("+2 questions being the same returned error")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-2 questions the same  Didn't return Error")
		printRed("-Failed")
		failCount += 1

	print()
	
	print('==when questions are left blank return regError==')
	print()

	url = baseURL + "register?email=" + mockData['email'] +"&password=" + mockData['password'] + "&Q1=" + mockData['Q1'] + "&Q2=" + mockData['Q2'] + "&A1=&A2="


	r = requests.get(url)
	json = r.json()

	if not (json['regError'] == "" or json['regError'] == None):
		printGreen("+Empty Answers returned error")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Empty Answers Didn't return Error")
		printRed("-Failed")
		failCount += 1


	print()
	print("==with good email, password and questions no errors are returned==")
	print()

	url = baseURL + "register?email=" + mockData['email'] + "&password=" + mockData['password'] + "&Q1=" + mockData['Q1'] + "&Q2=" + mockData['Q2'] + "&A1=" + mockData['A1'] + "&A2=" + mockData['A2']


	r = requests.get(url)
	json = r.json()


	if json['regError'] == "" or json['regError'] == None:
		printGreen("+Successful registration")
		printGreen("+Passed")
		passCount += 1	
	else:
		printRed("-registration Error")
		printRed("-Failed")
		failCount += 1

	#Erase user from database so it doesnt conflict
	url = baseURL + "deleteUser?email=" + mockData['email']
	requests.get(url)


def testGetQuestions():
	global passCount
	global failCount
	
	print()
	print("==Test if List of Questions are retrieved==")
	print()


	url = baseURL + "getQuestions"

	r = requests.get(url)
	json = r.json()

	if 'questions' in json:
		printGreen('+Questions are retreived successfully')
		printGreen('+Passed')
		passCount += 1
	else:
		printRed('-Questions failed to be retreived')
		printRed('-Failed')
		failCount += 1

def testLogin():
	global passCount
	global failCount

	mockData = {'email' : 'test@we.com', 'password' : '1234567p', 'Q1' : 'Your true name', 'Q2' : 'Your home address', 'A1' : 'a', 'A2' : 'fido'}

	url = baseURL + "register?email=" + mockData['email'] + "&password=" + mockData['password'] + "&Q1=" + mockData['Q1'] + "&Q2=" + mockData['Q2'] + "&A1=" + mockData['A1'] + "&A2=" + mockData['A2'] 

	requests.get(url)

	print()
	print("==When fields are blank fail to log in==")
	print()

	url = baseURL + "Login?email=&password=" + mockData['password']
	r = requests.get(url)
	
	json = r.json()

	
	if not (json['loginError'] == "" or json['loginError'] == None):
		printGreen("+No email prevents login")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Logged in with no email")
		printRed("-Failed")
		failCount += 1

	url = baseURL + "Login?email=" +  mockData['email'] + "&password="
	
	r = requests.get(url)
	json = r.json()

	if not (json['loginError'] == "" or json['loginError'] == None):
		printGreen("+No Password prevents login")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Log in with no password")
		printRed("-Failed")
		failCount += 1

	print()
	print("==When Incorrect Email/Password fail to log in==")
	print()

	url = baseURL + "Login?email=a@&password=" + mockData['password']
	r = requests.get(url)

	json = r.json()


	if not (json['loginError'] == "" or json['loginError'] == None):
		printGreen("+bad email prevents login")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Logged in with bad email")
		printRed("-Failed")
		failCount += 1

	url = baseURL + "Login?email=" +  mockData['email'] + "&password=12344567a"

	r = requests.get(url)
	json = r.json()

	if not (json['loginError'] == "" or json['loginError'] == None):
		printGreen("+bad Password prevents login")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Log in with bad password")
		printRed("-Failed")
		failCount += 1

	print()
	print("==with right credentials, log in successfully==")
	print()

	url = baseURL + "Login?email=" + mockData['email'] + "&password=" +  mockData['password']
	
	r = requests.get(url)
	json = r.json()
	print(json)

	if json['email']['email'] == mockData['email']:
		printGreen("+Can log in successfully")
		printGreen("+Passed")
		passCount += 1

	else:
		printRed("-Could not log in")
		printRed("-Failed")
		failCount += 1

	

	url = baseURL + "deleteUser?email=" + mockData['email']
	requests.get(url)

def testLogout():
	global passCount
	global failCount

	mockData = {'email' : 'test@we.com', 'password' : '1234567p', 'Q1' : 'Your true name', 'Q2' : 'Your home address', 'A1' : 'a', 'A2' : 'fido'}

	#register and log in for the test
	url = baseURL + "register?email=" + mockData['email'] + "&password=" + mockData['password'] + "&Q1=" + mockData['Q1'] + "&Q2=" + mockData['Q2'] + "&A1=" + mockData['A1'] + "&A2=" + mockData['A2']
	requests.get(url)

	url = baseURL + "Login?email=" + mockData['email'] + "&password=" + mockData['password']
	requests.get(url)

	print()
	print("==When user logs out they are logged out==")
	print()

	url = baseURL + "Logout"
	r = requests.get(url)
	json = r.json()

	if 'error' in json:
		printGreen("+Logged out successfully")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Log out failed")
		printRed("-Failed")
		failCount += 1


	url = baseURL + "deleteUser?email=" + mockData['email']
	requests.get(url)

def testWhoIsLoggedIn():
	global passCount
	global failCount

	mockData = {'email' : 'test@we.com', 'password' : '1234567p', 'Q1' : 'Your true name', 'Q2' : 'Your home address', 'A1' : 'a', 'A2' : 'fido'}

	url = baseURL + "whoIsLoggedIn"
	r = requests.get(url)
	json = r.json()

	print()
	print("==When no one is logged in respond that no one is logged in==")
	print()
	
	if 'error' in json:
		printGreen("+No user is logged in")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-User is showed logged in")
		printRed("-Failed")
		failCount += 1


	#register and log in for the test
	url = baseURL + "register?email=" + mockData['email'] + "&password=" + mockData['password'] + "&Q1=" + mockData['Q1'] + "&Q2=" + mockData['Q2'] + "&A1=" + mockData['A1'] + "&A2=" + mockData['A2']
	requests.get(url)

	#Needed for any testing involving sessions
	s = requests.Session()

	url = baseURL + "Login?email=" + mockData['email'] + "&password=" + mockData['password']
	s.get(url)


	print()
	print("==when logged in show who is logged in==")
	print() 

	url = baseURL + "whoIsLoggedIn"
	r = s.get(url)
	json = r.json()
	print(json)

	if 'email' in json and json['email']['email'] == mockData['email']:
		printGreen("+Correct user is shown as logged in")
		printGreen("+Passed")
		passCount += 1
	else:
		printRed("-Correct user not retrieved")
		printRed("-Failed")
		failCount += 1

	url = baseURL + "deleteUser?email=" + mockData['email']
	requests.get(url)




runTests()
print()
printGreen("Passed: " + str(passCount))
printRed("Failed: " + str(failCount))
print("Total: " + str(passCount + failCount))


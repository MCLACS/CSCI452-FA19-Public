DROP DATABASE IF EXISTS SNIPPETDB;

CREATE DATABASE SNIPPETDB;

USE SNIPPETDB;

CREATE TABLE SNIPPET(
SNIP_ID INT NOT NULL AUTO_INCREMENT,
SNIP_CREATOR VARCHAR(255) NOT NULL,
SNIP_LANG VARCHAR(255) NOT NULL,
SNIP_DESC LONGTEXT NOT NULL,
SNIP_SNIPPET LONGTEXT NOT NULL,
PRIMARY KEY(SNIP_ID)
);

INSERT INTO SNIPPET (SNIP_CREATOR, SNIP_LANG, SNIP_DESC, SNIP_SNIPPET)
VALUES


('Austin G.', 'SQL', 'Starts the singularity', 
'
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
print("Hello, World!")
'),
('Ada Lovelace', 'Python', 'Hopefully this doesnt break anything', 
'
#include <iostream> 
using namespace std; 
int main(int argc, char *argv[]) 
{ 
	int no; 
	cout << "Enter any number: "; 
	cin >> no; 
	if(no%2==0) 
	{ 
		cout<<"Even number"; 
	} 
	else 
	{ 
		cout<<"Odd number"; 
	} 
	return 0; 
}'),
('David Eve', 'SQL', 'Actually does nothing', 
'
\<!DOCTYPE html> 
\<html> 
	\<head> 
		\<title>Page Title\</title>
	\</head> 
	
	\<body> 
		\<h1>This is a Heading\</h1> 
		\<p>This is a paragraph.\</p> 
	\</body> 
\</html>
'),
('Paul Atreides', 'SQL', 'Opens Hole to a dimension where code works', 
'
/* CallingMethodsInSameClass.java * * illustrates how to call static methods a class * from a method in the same class 
*/ 
public class CallingMethodsInSameClass 
{ 
	public static void main(String[] args) 
	{ 
		printOne(); 
		printOne(); 
		printTwo(); 
	} 
	
	public static void printOne() 
	{ 
		System.out.println("Hello World"); 
	} 
	
	public static void printTwo() 
	{ 
		printOne(); 
		printOne(); 
	} 
}
'),
('Austin G.', 'Java', 'Opens Hole to a dimension where code works', 
'
/* CallingMethodsInSameClass.java 
* * illustrates how to call static methods a class * from a method in the same class 
*/ 
public class CallingMethodsInSameClass 
{ 
	public static void main(String[] args) 
	{ 
		printOne(); 
		printOne(); 
		printTwo(); 
	
	} 
	
	public static void printOne() 
	{ 
		System.out.println("Hello World"); 
	
	}
	 
	public static void printTwo() 
	{ 
		printOne(); 
		printOne(); 
	} 
}
'),
('Andrew Lockman', 'SQL', 'My Favorite Code', 
'
\<h1>This is heading 1\</h1> 
\<p>This is some text.\</p> 
\<hr> 
\<h2>This is heading 2\</h2> 
\<p>This is some other text.\</p> 
\<hr>
'),
('Ben M.', 'Python', 'Actually does nothing', 
'
/* CallingMethodsInSameClass.java 
* * illustrates how to call static methods a class * from a method in the same class 
*/ 
public class CallingMethodsInSameClass 
{ 
	public static void main(String[] args) 
	{ 
		printOne(); 
		printOne(); 
		printTwo(); 
	} 
	public static void printOne() 
	{ 
		System.out.println("Hello World"); 
	} 
	public static void printTwo() 
	{ 
		printOne(); 
		printOne(); 
	} 
}
'),
('Wade Watts', 'SQL', 'Opens Hole to a dimension where code works', 
'
#include <iostream> 
using namespace std; 
int main() 
{ 
	// print output to user 
	cout << "Hello World!" << endl; 
	return 0; 
}
'),
('Austin G.', 'JavaScript', 'Git merge error waiting to happen', 
'
\<h1>This is heading 1\</h1> 
\<p>This is some text.\</p> 
\<hr> 
\<h2>This is heading 2\</h2> 
\<p>This is some other text.\</p> 
\<hr>
'),
('Sean C.', 'C++', '01100110011101010110001101101011', 
'
\<!DOCTYPE html> 
\<html> 
	\<body> 
		<\?php echo "My first PHP script!"; ?> 
	\</body> 
\</html>
'),
('Paul Atreides', 'JavaScript', 'Starts the singularity', 'var x = y + z;'),
('Austin G.', 'SQL', 'Starts the singularity', 
'
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
print("Hello, World!")
'),
('Sean C.', 'SQL', 'My Favorite Code', 
'
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
'),
('Paul Atreides', 'SQL', 'Where should the semicolon go?', 
'
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
'),
('David Eve', 'SQL', 'My Favorite Code', 
'
/* CallingMethodsInSameClass.java 
* * illustrates how to call static methods a class * from a method in the same class 
*/ 
public class CallingMethodsInSameClass 
{ 
	public static void main(String[] args) 
	{ 
		printOne(); 
		printOne(); 
		printTwo(); 
	} 
	public static void printOne() 
	{ 
		System.out.println("Hello World"); 
	} 
	public static void printTwo() 
	{ 
		printOne(); 
		printOne(); 
	} 
}
'),
('Sean C.', 'SQL', 'Actually does nothing', 
'
public class Factorial 
{ 
	public static void main(String[] args) 
	{ 
		final int NUM_FACTS = 100;
 
		for(int i = 0; i  NUM_FACTS; i++) 
			System.out.println( i + "! is " + factorial(i)); 
	} 
	public static int factorial(int n) 
	{ 
		int result = 1; 

		for(int i = 2; i = n; i++) 
			result *= i; 
		
		return result; 
	} 
}
'),
('Jacob D.', 'Python', 'Git merge error waiting to happen', 
'
SELECT * FROM Customers;
'),
('Sean C.', 'JavaScript', 'Hopefully this doesnt break anything', 
'
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
'),
('Jacob D.', 'Java', 'Hopefully this doesnt break anything', 
'
#include <iostream> 
using namespace std; 
int main(int argc, char *argv[]) 
{ 
	int no; 
	cout << "Enter any number: "; 
	cin >> no; 
	
	if(no%2==0) 
	{ 
		cout<<"Even number"; 
	} 
	else 
	{ 
		cout<<"Odd number"; 
	} 
	return 0; 
}
'),
('David Eve', 'JavaScript', 'Git merge error waiting to happen', 
'
\<!DOCTYPE html> 
\<html> 
	\<head> 
		\<title>Page Title\</title> 
	\</head> 

	\<body> 
		\<h1>This is a Heading\</h1> 
		\<p>This is a paragraph.\</p> 
	\</body> 
\</html>
'),
('Jacob D.', 'Python', 'Hopefully this doesnt break anything', 
'
SELECT * FROM Customers;
'),
('Paul Atreides', 'Java', 'Where should the semicolon go?', 
'
\<h1>This is heading 1\</h1> 
\<p>This is some text.\</p> 
\<hr> 
\<h2>This is heading 2\</h2> 
\<p>This is some other text.\</p> 
\<hr>
'),
('Austin G.', 'C++', 'Starts the singularity', 
'
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
'),
('Mark Cohen', 'Python', 'Hopefully this doesnt break anything', 
'
\<!DOCTYPE html> 
\<html> 
	\<body> 
		\<?php echo "My first PHP script!"; ?> 
	\</body> 
\</html>
'),
('Ben M.', 'SQL', 'Where should the semicolon go?', 
'
\<!DOCTYPE html> 
\<html> 
	\<head> 
		\<title>Page Title/</title> 
	\</head> 

	\<body> 
		\<h1>This is a Heading\</h1> 
		\<p>This is a paragraph.\</p> 
	\</body> 
\</html>
'),
('Wade Watts', 'JavaScript', 'Opens Hole to a dimension where code works', 
'
public class Factorial 
{ 
	public static void main(String[] args) 
	{ 
		final int NUM_FACTS = 100; 

		for(int i = 0; i  NUM_FACTS; i++) 
			System.out.println( i + "! is " + factorial(i)); 
	} 
	public static int factorial(int n) 
	{ 
		int result = 1; 
		
		for(int i = 2; i = n; i++) 
			result *= i; 
		
		return result; 
	} 
}
'),
('David Eve', 'Java', 'My Favorite Code', 
'
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
'),
('Austin G.', 'Java', 'Where should the semicolon go?', 
'
\<!DOCTYPE html> 
\<html> 
	\<body> 
		\<?php echo "My first PHP script!"; ?> 
	\</body> 
\</html>
'),
('Paul Atreides', 'Python', 'Starts the singularity', 
'
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
print("Hello, World!")
'),
('Jacob D.', 'C++', 'Where should the semicolon go?', 
'
/* CallingMethodsInSameClass.java 
* * illustrates how to call static methods a class * from a method in the same class 
*/ 
public class CallingMethodsInSameClass 
{ 
	public static void main(String[] args) 
	{ 
		printOne(); 
		printOne(); 
		printTwo(); 
	} 
	public static void printOne() 
	{ 
		System.out.println("Hello World"); 
	
	} 
	public static void printTwo() 
	{ 
		printOne(); 
		printOne(); 
	} 
}
'),
('Mark Cohen', 'C++', 'Where should the semicolon go?', 
'
#include <iostream> 
using namespace std;
 
int main(int argc, char *argv[]) 
{ 
	int no; 
	cout << "Enter any number: "; 
	cin >> no; 

	if(no%2==0) 
	{ 
		cout<<"Even number"; 
	} 
	else 
	{ 
		cout<<"Odd number"; 
	} 
	return 0; 
}
'),
('Watson', 'JavaScript', 'Git merge error waiting to happen', 
'
SELECT * FROM Customers;
'),
('Austin G.', 'SQL', '01100110011101010110001101101011', 
'
\<h1>This is heading 1\</h1> 
\<p>This is some text.\</p> 
\<hr> 
\<h2>This is heading 2\</h2> 
\<p>This is some other text.\</p> 
\<hr>
'),
('David Eve', 'Java', 'Opens Hole to a dimension where code works', 
'
body 
{ 
	background-color: lightblue; 
} 

h1 
{ 
	color: white; 
	text-align: center; 
} 

p 
{ 
	font-family: verdana; 
	font-size: 20px; 
}
'),
('Austin G.', 'C++', 'My Favorite Code', 
'
\<!DOCTYPE html> 
\<html> 
	\<body> 
		<\?php echo "My first PHP script!"; ?> 
	\</body> 
\</html>
'),
('Austin G.', 'SQL', 'Git merge error waiting to happen', 
'
body 
{ 
	background-color: lightblue; 
} 

h1 
{ 
	color: white; 
	text-align: center; 
} 

p 
{ 
	font-family: verdana; 
	font-size: 20px; 
}
'),
('Paul Atreides', 'Python', 'Git merge error waiting to happen', 
'
document.getElementById("demo").innerHTML = "Hello Dolly.";
'),
('Ben M.', 'Python', 'Git merge error waiting to happen', 
'
\<!DOCTYPE html> 
\<html> 
	\<body> 
		\<?php echo "My first PHP script!"; ?> 
	\</body> 
\</html>
'),
('Andrew Lockman', 'SQL', 'My Favorite Code', 
'
public class Factorial 
{ 
	public static void main(String[] args) 
	{ 
		final int NUM_FACTS = 100; 

		for(int i = 0; i  NUM_FACTS; i++) 
			System.out.println( i + "! is " + factorial(i)); 
	} 
	public static int factorial(int n) 
	{ 
		int result = 1; 
		
		for(int i = 2; i = n; i++) 
			result *= i; 
	
		return result; 
	} 
}
'),
('Austin G.', 'JavaScript', 'Hopefully this doesnt break anything', 
'
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
'),
('Mark Cohen', 'Java', 'Where should the semicolon go?', 
'
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
'),
('Andrew Lockman', 'SQL', 'Opens Hole to a dimension where code works', 'var x = y + z;'),
('Sean C.', 'Java', 'Opens Hole to a dimension where code works', 
'
#include <iostream> 
using namespace std; 

int main() 
{ 
	// print output to user 
	cout << "Hello World!" << endl; 

	return 0; 
}
'),
('David Eve', 'Python', 'Hopefully this doesnt break anything', 
'
\<!DOCTYPE html> 
\<html> 
	\<head> 
	\<title>Page Title\</title> 
	\<head> 

	\<body> 
		\<h1>This is a Heading\</h1> 
		\<p>This is a paragraph.\</p> 
	\</body> 
\</html>
'),
('Wade Watts', 'Python', 'Where should the semicolon go?', 
'
UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;
print("Hello, World!")
'),
('Wade Watts', 'C++', 'Hopefully this doesnt break anything', 
'
#include <iostream> 
using namespace std; 

int main(int argc, char *argv[]) 
{ 
	int no; 
	cout << "Enter any number: "; 
	cin >> no; 
	
	if(no%2==0) 
	{ 
		cout<<"Even number"; 
	} 
	else 
	{ 
		cout<<"Odd number"; 
	} 
	return 0; 
}
'),
('Wade Watts', 'Python', 'Git merge error waiting to happen', 
'
public class Factorial 
{ 
	public static void main(String[] args) 
	{ 
		final int NUM_FACTS = 100; 
	
		for(int i = 0; i  NUM_FACTS; i++) 
			System.out.println( i + "! is " + factorial(i)); 
	} 
	public static int factorial(int n) 
	{ 
		int result = 1; 
		
		for(int i = 2; i = n; i++) 
			result *= i; 

		return result; 
	} 
}
'),
('Watson', 'Java', 'Opens Hole to a dimension where code works', 
'
\<h1>This is heading 1\</h1> 
\<p>This is some text.\</p> 
\<hr> 
\<h2>This is heading 2\</h2> 
\<p>This is some other text.\</p> 
\<hr>
'),
('Watson', 'Python', 'Hopefully this doesnt break anything', 
'
document.getElementById("demo").innerHTML = "Hello Dolly.";
'),
('Ada Lovelace', 'Python', 'Starts the singularity', 
'
#include <iostream> 
using namespace std; 

int main() 
{ 
	// print output to user 
	cout << "Hello World!" << endl; 

	return 0; 
}
');

CREATE TABLE QUESTION(
  QUEST_ID INT NOT NULL AUTO_INCREMENT,
  QUEST_TEXT VARCHAR(255) NOT NULL,
  PRIMARY KEY(QUEST_ID)
);

INSERT INTO QUESTION (QUEST_TEXT)
VALUES
('Name of your first pet'),
('Digits of your Social Security Number'),
('Your spouses mothers maiden name'),
('Your home address'),
('Your true name');

CREATE TABLE ACCOUNT(
  ACC_ID INT NOT NULL AUTO_INCREMENT,
  ACC_EMAIL VARCHAR(255) UNIQUE NOT NULL,
  ACC_PASSWORD VARCHAR(60) NOT NULL,
  ACC_QUESTION_ONE INT NOT NULL REFERENCES QUESTION(QUEST_ID),
  ACC_ANSWER_ONE VARCHAR(255) NOT NULL,
  ACC_QUESTION_TWO INT NOT NULL REFERENCES QUESTION(QUEST_ID),
  ACC_ANSWER_TWO VARCHAR(255) NOT NULL,
  PRIMARY KEY(ACC_ID)
);

INSERT INTO ACCOUNT (ACC_EMAIL, ACC_PASSWORD, ACC_QUESTION_ONE, ACC_ANSWER_ONE, ACC_QUESTION_TWO, ACC_ANSWER_TWO)
VALUES
('admin@mcla.edu', 'Password1234', 1, 'Fido', 5, 'weird rune');

CREATE TABLE LANGUAGES(
  LANG_ID INT NOT NULL AUTO_INCREMENT,
  LANG_NAME VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY(LANG_ID)
);

INSERT INTO LANGUAGES (LANG_NAME)
VALUES
('Java'),
('C++'),
('C#'),
('Python'),
('Javascript'),
('Whitespace'),
('Visual Basic'),
('PHP'),
('SQL'),
('Mongo');

CREATE USER 'sel_user'@'localhost'
  IDENTIFIED BY 'password';
  FLUSH PRIVILEGES;
GRANT SELECT
  ON SNIPPETDB.*
  TO 'sel_user'@'localhost'
  WITH GRANT OPTION;
FLUSH PRIVILEGES; 

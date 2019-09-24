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

('Andrew Lockman', 'JavaScript', 'Opens Hole to a dimension where code works', '<h1>This is heading 1</h1> <p>This is some text.</p> <hr> <h2>This is heading 2</h2> <p>This is some other text.</p> <hr>'),
('David Eve', 'SQL', 'Git merge error waiting to happen', '#include <iostream> using namespace std; int main() { // print output to user cout << 'Hello World!' << endl; return 0; }'),
('Paul Atreides', 'C++', 'My Favorite Code', '/* CallingMethodsInSameClass.java * * illustrates how to call static methods a class * from a method in the same class */ public class CallingMethodsInSameClass { public static void main(String[] args) { printOne(); printOne(); printTwo(); } public static void printOne() { System.out.println('Hello World'); } public static void printTwo() { printOne(); printOne(); } }'),
('Watson', 'Python', 'Starts the singularity', 'document.getElementById('demo').innerHTML = 'Hello Dolly.';'),
('Watson', 'C++', 'Starts the singularity', '<h1>This is heading 1</h1> <p>This is some text.</p> <hr> <h2>This is heading 2</h2> <p>This is some other text.</p> <hr>'),
('Sean C.', 'SQL', 'Hopefully this doesn't break anything', 'body { background-color: lightblue; } h1 { color: white; text-align: center; } p { font-family: verdana; font-size: 20px; }'),
('Ada Lovelace', 'C++', 'Hopefully this doesn't break anything', 'UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;print('Hello, World!')'),
('David Eve', 'JavaScript', 'Git merge error waiting to happen', 'INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);'),
('Sean C.', 'Python', 'Opens Hole to a dimension where code works', '<!DOCTYPE html> <html> <body> <?php echo 'My first PHP script!'; ?> </body> </html>'),
('Wade Watts', 'Python', 'Starts the singularity', 'INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);'),
('Wade Watts', 'C++', 'Starts the singularity', 'public class Factorial { public static void main(String[] args) { final int NUM_FACTS = 100; for(int i = 0; i < NUM_FACTS; i++) System.out.println( i + '! is ' + factorial(i)); } public static int factorial(int n) { int result = 1; for(int i = 2; i <= n; i++) result *= i; return result; } }'),
('Ben M.', 'C++', 'Hopefully this doesn't break anything', '<!DOCTYPE html> <html> <body> <?php echo 'My first PHP script!'; ?> </body> </html>'),
('Paul Atreides', 'SQL', 'Starts the singularity', 'var x = y + z;'),
('Wade Watts', 'JavaScript', 'Hopefully this doesn't break anything', 'var x = y + z;'),
('David Eve', 'Python', 'Git merge error waiting to happen', 'body { background-color: lightblue; } h1 { color: white; text-align: center; } p { font-family: verdana; font-size: 20px; }'),
('Ada Lovelace', 'C++', 'Opens Hole to a dimension where code works', 'body { background-color: lightblue; } h1 { color: white; text-align: center; } p { font-family: verdana; font-size: 20px; }'),
('David Eve', 'SQL', 'My Favorite Code', 'var x = y + z;'),
('Watson', 'Java', 'Starts the singularity', '<!DOCTYPE html> <html> <body> <?php echo 'My first PHP script!'; ?> </body> </html>'),
('Mark Cohen', 'Java', 'Hopefully this doesn't break anything', '<!DOCTYPE html> <html> <head> <title>Page Title</title> </head> <body> <h1>This is a Heading</h1> <p>This is a paragraph.</p> </body> </html>'),
('Jacob D.', 'C++', 'Starts the singularity', '<!DOCTYPE html> <html> <body> <?php echo 'My first PHP script!'; ?> </body> </html>'),
('David Eve', 'SQL', 'Starts the singularity', 'public class Factorial { public static void main(String[] args) { final int NUM_FACTS = 100; for(int i = 0; i < NUM_FACTS; i++) System.out.println( i + '! is ' + factorial(i)); } public static int factorial(int n) { int result = 1; for(int i = 2; i <= n; i++) result *= i; return result; } }'),
('Wade Watts', 'Python', '01100110011101010110001101101011', '<h1>This is heading 1</h1> <p>This is some text.</p> <hr> <h2>This is heading 2</h2> <p>This is some other text.</p> <hr>'),
('Ada Lovelace', 'SQL', 'Opens Hole to a dimension where code works', 'document.getElementById('demo').innerHTML = 'Hello Dolly.';'),
('David Eve', 'C++', 'Opens Hole to a dimension where code works', 'public class Factorial { public static void main(String[] args) { final int NUM_FACTS = 100; for(int i = 0; i < NUM_FACTS; i++) System.out.println( i + '! is ' + factorial(i)); } public static int factorial(int n) { int result = 1; for(int i = 2; i <= n; i++) result *= i; return result; } }'),
('Mark Cohen', 'C++', 'Where should the semicolon go?', 'var x = y + z;'),
('Mark Cohen', 'SQL', 'Git merge error waiting to happen', 'var x = y + z;'),
('Mark Cohen', 'Python', 'Hopefully this doesn't break anything', 'body { background-color: lightblue; } h1 { color: white; text-align: center; } p { font-family: verdana; font-size: 20px; }'),
('Sean C.', 'JavaScript', 'Actually does nothing', '<h1>This is heading 1</h1> <p>This is some text.</p> <hr> <h2>This is heading 2</h2> <p>This is some other text.</p> <hr>'),
('Austin G.', 'JavaScript', 'Git merge error waiting to happen', 'UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;print('Hello, World!')'),
('Watson', 'SQL', 'Starts the singularity', 'body { background-color: lightblue; } h1 { color: white; text-align: center; } p { font-family: verdana; font-size: 20px; }'),
('Mark Cohen', 'Python', 'Actually does nothing', '#include <iostream> using namespace std; int main(int argc, char *argv[]) { int no; cout << 'Enter any number: '; cin >> no; if(no%2==0) { cout<<'Even number'; } else { cout<<'Odd number'; } return 0; }'),
('Andrew Lockman', 'C++', 'Git merge error waiting to happen', 'body { background-color: lightblue; } h1 { color: white; text-align: center; } p { font-family: verdana; font-size: 20px; }'),
('Andrew Lockman', 'Java', 'Actually does nothing', '<!DOCTYPE html> <html> <body> <?php echo 'My first PHP script!'; ?> </body> </html>'),
('Ada Lovelace', 'JavaScript', 'Where should the semicolon go?', 'INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);'),
('David Eve', 'C++', 'Opens Hole to a dimension where code works', '/* CallingMethodsInSameClass.java * * illustrates how to call static methods a class * from a method in the same class */ public class CallingMethodsInSameClass { public static void main(String[] args) { printOne(); printOne(); printTwo(); } public static void printOne() { System.out.println('Hello World'); } public static void printTwo() { printOne(); printOne(); } }'),
('Austin G.', 'JavaScript', 'Starts the singularity', 'document.getElementById('demo').innerHTML = 'Hello Dolly.';'),
('Jacob D.', 'C++', 'Hopefully this doesn't break anything', '/* CallingMethodsInSameClass.java * * illustrates how to call static methods a class * from a method in the same class */ public class CallingMethodsInSameClass { public static void main(String[] args) { printOne(); printOne(); printTwo(); } public static void printOne() { System.out.println('Hello World'); } public static void printTwo() { printOne(); printOne(); } }'),
('Paul Atreides', 'JavaScript', 'Where should the semicolon go?', 'public class Factorial { public static void main(String[] args) { final int NUM_FACTS = 100; for(int i = 0; i < NUM_FACTS; i++) System.out.println( i + '! is ' + factorial(i)); } public static int factorial(int n) { int result = 1; for(int i = 2; i <= n; i++) result *= i; return result; } }'),
('Andrew Lockman', 'Java', '01100110011101010110001101101011', 'UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;print('Hello, World!')'),
('Watson', 'JavaScript', 'Opens Hole to a dimension where code works', 'public class Factorial { public static void main(String[] args) { final int NUM_FACTS = 100; for(int i = 0; i < NUM_FACTS; i++) System.out.println( i + '! is ' + factorial(i)); } public static int factorial(int n) { int result = 1; for(int i = 2; i <= n; i++) result *= i; return result; } }'),
('Wade Watts', 'Python', '01100110011101010110001101101011', 'var x = y + z;'),
('Sean C.', 'Java', 'Opens Hole to a dimension where code works', '<h1>This is heading 1</h1> <p>This is some text.</p> <hr> <h2>This is heading 2</h2> <p>This is some other text.</p> <hr>'),
('Austin G.', 'Java', '01100110011101010110001101101011', 'INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);'),
('Andrew Lockman', 'SQL', '01100110011101010110001101101011', '<!DOCTYPE html> <html> <body> <?php echo 'My first PHP script!'; ?> </body> </html>'),
('Watson', 'SQL', 'Opens Hole to a dimension where code works', 'SELECT * FROM Customers;'),
('Watson', 'C++', 'Starts the singularity', 'UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;print('Hello, World!')'),
('Watson', 'SQL', 'Starts the singularity', 'SELECT * FROM Customers;'),
('David Eve', 'Java', 'Starts the singularity', 'UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;print('Hello, World!')'),
('Mark Cohen', 'Java', 'Opens Hole to a dimension where code works', '<h1>This is heading 1</h1> <p>This is some text.</p> <hr> <h2>This is heading 2</h2> <p>This is some other text.</p> <hr>'),
('Ada Lovelace', 'C++', '01100110011101010110001101101011', '<!DOCTYPE html> <html> <body> <?php echo 'My first PHP script!'; ?> </body> </html>');

CREATE USER 'sel_user'@'localhost'
  IDENTIFIED BY 'password';
  FLUSH PRIVILEGES;
GRANT SELECT
  ON SNIPPETDB.*
  TO 'sel_user'@'localhost'
  WITH GRANT OPTION;
FLUSH PRIVILEGES; 

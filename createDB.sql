DROP DATABASE IF EXISTS SNIPPETDB;

CREATE DATABASE SNIPPETDB;

USE SNIPPETDB;

CREATE TABLE SNIPPET(
SNIP_ID INT NOT NULL AUTO_INCREMENT,
SNIP_CREATOR VARCHAR(255) NOT NULL,
SNIP_LANG VARCHAR(255) NOT NULL,
SNIP_DESC LONGTEXT NOT NULL,
PRIMARY KEY(SNIP_ID)
);

INSERT INTO SNIPPET (SNIP_CREATOR, SNIP_LANG, SNIP_DESC)
VALUES
('Andrew Lockman', 'C++', 'Cout<< "Hello World"'),
('Sean C.', 'Java', 'System.out.Print("Hello World")'),
('Ben M.', 'Python','print("Hello World")'),
('Austin G.', 'JavaScript', 'Console.log("Hello World")'),
('Jacob D.', 'SQL', 'dbms_output.put_line(Hello World)'),
('A sloth', 'Java', 'My mom kicks superman for a disease.'),
('Your homie', 'Python', 'A sloth spies on my mom because the sky is green.'),
('This cool guy my gardener met yesterday', 'C++', 'Some guy explodes the king for a disease.'),
('This cool guy my gardener met yesterday', 'C++', 'A cat with rabies explodes a dude to make a pie.'),
('The king', 'JavaScript', 'A dude configures a dude to make a pie.'),
('My mom', 'C++', 'A cat with rabies creates the king to be able to make toast explode.'),
('A dude', 'C++', 'This cool guy my gardener met yesterday kicks some guy because the sky is green.'),
('Superman', 'Java', 'A sloth meows on a dude for no apparent reason.'),
('A dude', 'Python', 'This cool guy my gardener met yesterday spies on a sloth to make a pie.'),
('A cat with rabies', 'SQL', 'A cat with rabies holds the king for no apparent reason.'),
('This cool guy my gardener met yesterday', 'Java', 'The king explodes the king because the sky is green.'),
('A dude', 'JavaScript', 'The king spies on this cool guy my gardener met yesterday because the sky is green.'),
('This cool guy my gardener met yesterday', 'Python', 'Your homie meets with the king for no apparent reason.'),
('Superman', 'Python', 'Your homie configures your homie to be able to make toast explode.'),
('My mom', 'Java', 'Your homie flees from a cat with rabies to know more about archeology.'),
('Superman', 'Java', 'The king tries to automate your homie to make a pie.'),
('A dude', 'JavaScript', 'Some guy creates a cat with rabies to be able to make toast explode.'),
('Your homie', 'C++', 'Your homie kicks my mom to be able to make toast explode.'),
('The king', 'Python', 'A dude creates a dude to make a pie.'),
('My mom', 'SQL', 'This cool guy my gardener met yesterday treats a sloth because the sky is green.'),
('Your homie', 'Python', 'Superman creates your homie for a disease.'),
('A cat with rabies', 'Python', 'Superman treats a cat with rabies to be able to make toast explode.'),
('Some guy', 'JavaScript', 'A dude hacks this cool guy my gardener met yesterday for a disease.'),
('Superman', 'Java', 'A sloth flees from the king because the sky is green.'),
('A cat with rabies', 'C++', 'This cool guy my gardener met yesterday meows on a sloth to know more about archeology.'),
('Your homie', 'Python', 'This cool guy my gardener met yesterday eats a cat with rabies for no apparent reason.'),
('Some guy', 'Java', 'A sloth tries to automate the king because the sky is green.'),
('A dude', 'Java', 'My mom creates the king to make a pie.'),
('The king', 'SQL', 'A sloth configures a dude to know more about archeology.'),
('A dude', 'C++', 'My mom meows on your homie because the sky is green.'),
('The king', 'C++', 'Superman spies on a dude to be able to make toast explode.'),
('This cool guy my gardener met yesterday', 'Java', 'Superman meows on your homie for a disease.'),
('Your homie', 'Java', 'This cool guy my gardener met yesterday creates superman to make a pie.'),
('Some guy', 'SQL', 'This cool guy my gardener met yesterday eats some guy for no apparent reason.'),
('A dude', 'SQL', 'Superman kicks this cool guy my gardener met yesterday because the sky is green.'),
('A cat with rabies', 'C++', 'A sloth eats superman for a disease.'),
('This cool guy my gardener met yesterday', 'Python', 'A cat with rabies spies on a dude to make a pie.'),
('A cat with rabies', 'SQL', 'A cat with rabies treats this cool guy my gardener met yesterday to know more about archeology.'),
('My mom', 'Java', 'Your homie creates a sloth to make a pie.'),
('My mom', 'SQL', 'My mom configures a dude for no apparent reason.'),
('The king', 'Java', 'A sloth explodes this cool guy my gardener met yesterday for a disease.'),
('Your homie', 'C++', 'This cool guy my gardener met yesterday meets with some guy for a disease.'),
('A sloth', 'Java', 'A cat with rabies meows on this cool guy my gardener met yesterday for a disease.'),
('Some guy', 'SQL', 'A cat with rabies spies on this cool guy my gardener met yesterday for a disease.'),
('A cat with rabies', 'JavaScript', 'The king explodes a sloth for a disease.'),
('Some guy', 'Java', 'Superman meets with a dude for no apparent reason.'),
('Superman', 'C++', 'Superman treats superman to be able to make toast explode.'),
('Some guy', 'SQL', 'Superman creates superman to know more about archeology.'),
('Some guy', 'Java', 'Superman kicks a sloth to know more about archeology.'),
('A dude', 'C++', 'A sloth holds a sloth to be able to make toast explode.');

CREATE USER 'sel_user'@'localhost'
  IDENTIFIED BY 'password';
  FLUSH PRIVILEGES;
GRANT SELECT
  ON SNIPPETDB.*
  TO 'sel_user'@'localhost'
  WITH GRANT OPTION;
FLUSH PRIVILEGES; 

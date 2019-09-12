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
('Jacob D.', 'SQL', 'dbms_output.put_line(Hello World)')

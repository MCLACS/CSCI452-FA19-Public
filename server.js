console.log(require('dotenv').config());
const express = require('express');
const app = express();

var http = require('http');
var fs = require('fs');

var mysql = require('mysql');
const bcrypt = require('bcrypt');

app.listen(process.env.PORT, process.env.IP, startHandler())

const conInfo =
{
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

var session = require('express-session');
app.use(session({
  secret: 'happy jungle',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}))


app.all('/', serveIndex);
app.all('/getSnippets', getSnippets);
app.all('/getQuestions', getQuestions);
app.all('/getLanguages', getLanguages);
app.all('/getUserQuestions', getUserQuestions);
app.all('/register', register);
app.all('/changePass', changePass);
app.all('/whoIsLoggedIn', whoIsLoggedIn);
app.all('/Login', login);
app.all('/Logout', logout);
app.all('/insertSnippet', insertSnippet);

//Notifies the admin what port the server is listening on
function startHandler() {
  console.log('Server listening on port ' + process.env.PORT);
}

//sends results to client
function writeResult(res, obj) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(obj));
  res.end('');
}

// Registers a new user and stores their info in database, then logs the user in
function register(req, res) {

  validateEmail(req.query.email, function (regError) {
    if (!regError) {
      writeResult(res, { 'regError': "Email invalid or already used." });
    }
    else {
      validatePassword(req.query.password, function (regError) {
        if (!regError) {
          writeResult(res, { 'regError': "Password must have a minimum of eight characters, at least one letter and one number" });
        }

        else if (req.query.Q1 == req.query.Q2) {
          writeResult(res, { 'regError': "Please choose different questions for your security questions." });
        }

        else {
          var con = mysql.createConnection(conInfo);
          con.connect(function (err) {
            if (err)
              writeResult(res, { 'error': err });
            else {
              if (req.query.A1 == null || req.query.A1 == "" || req.query.A2 == null || req.query.A2 == "") {
                writeResult(res, { 'regError': "Answer field cannot be empty" })
              }
              //Storing the info in the database
              else {
                let hashPass = bcrypt.hashSync(req.query.password, 12);
                let hashA1 = bcrypt.hashSync(req.query.A1, 12);
                let hashA2 = bcrypt.hashSync(req.query.A2, 12);
                con.query("INSERT INTO ACCOUNT (ACC_EMAIL, ACC_PASSWORD, ACC_QUESTION_ONE, ACC_ANSWER_ONE, ACC_QUESTION_TWO, ACC_ANSWER_TWO) VALUES (?, ?, ?, ?, ?, ?)", [req.query.email, hashPass, req.query.Q1, hashA1, req.query.Q2, hashA2], function (err, result, fields) {
                  if (err) {
                    writeResult(res, { 'error': err });
                    console.log(err);
                  }
                  //Logging the user in
                  else {
                    con.query("SELECT * FROM ACCOUNT WHERE ACC_EMAIL = ?", [req.query.email], function (err, result, fields) {
                      if (err)
                        writeResult(res, { 'error': err });
                      else {
                        req.session.user = { 'id': result[0].ACC_ID, 'email': result[0].ACC_EMAIL };
                        writeResult(res, { 'email': req.session.user, 'regError': "" });
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    }
  });
}

//Gets all snippets from DB to populate table with
//Can take queries for "order" and "filter"
//req.query.category, req.query.order, req.query.filter
function getSnippets(req, res) {

  let result = {};

  var con = mysql.createConnection(conInfo);
  con.connect(function (err) {
    if (err)
      writeResult(res, { 'error': err });
    else {
      console.log([req.query.filter, req.query.category, req.query.order]);
      //create filter
      let filter = "%" + req.query.filter + "%";
      //select snippets with filter, ordering, etc
      con.query('SELECT * FROM SNIPPET WHERE SNIP_LANG LIKE ? OR SNIP_CREATOR LIKE ? OR SNIP_DESC LIKE ? ORDER BY ' + req.query.category + " " + req.query.order, [filter, filter, filter], function (err, result, fields) {
        if (err)
          writeResult(res, { 'error': err });
        else {
          writeResult(res, { 'result': result });
        }

      });
    }
  });
}

//Returns all security questions from DB to populate dropdown menu in register modal
function getQuestions(req, res) {
  var con = mysql.createConnection(conInfo);
  con.connect(function (err) {
    if (err)
      writeResult(res, { 'error': err });
    else {
      con.query('SELECT * FROM QUESTION', function (err, result, fields) {
        if (err)
          writeResult(res, { 'error': err });
        else {
          writeResult(res, { 'questions': result })
        }
      });
    }
  });
}

//Returns all languages from DB to populate dropdown menu in create snippet modal
function getLanuages(req, res) {
  var con = mysql.createConnection(conInfo);
  con.connect(function (err) {
    if (err)
      writeResult(res, { 'error': err });
    else {
      con.query('SELECT * FROM LANGUAGES', function (err, result, fields) {
        if (err)
          writeResult(res, { 'error': err });
        else {
          writeResult(res, { 'languages': result })
        }
      });
    }
  });
}

//Gets user's security questions for change password modal
//Requires user Email
//req.query.email 
function getUserQuestions(req, res) {
  if (req.session.id != null) {
    if (req.query.email == undefined || req.query.email == "") {
      writeResult(res, { 'changePassError': "Email undefined" });
      console.log("Email empty");
    }
    else {
      var con = mysql.createConnection(conInfo);
      con.connect(function (err) {
        if (err)
          writeResult(res, { 'error': err });
        else {
          //get account id, used later to find user's questions
          con.query('SELECT ACCOUNT.ACC_ID FROM ACCOUNT WHERE ACCOUNT.ACC_EMAIL = ?', [req.query.email], function (err, id, fields) {
            if (err)
              writeResult(res, { 'error': err });
            else {
              if (id.length == 0) {
                console.log("No emails found");
                writeResult(res, { 'changePassError': "Email does not exist" });
              }
              else {
                //use account id to get user's questions
                con.query('SELECT QUESTION.QUEST_TEXT FROM ACCOUNT INNER JOIN QUESTION ON ACCOUNT.ACC_QUESTION_TWO = QUEST_ID WHERE ACCOUNT.ACC_ID = ' + id[0].ACC_ID + ' UNION SELECT QUESTION.QUEST_TEXT FROM ACCOUNT INNER JOIN QUESTION ON ACCOUNT.ACC_QUESTION_ONE = QUEST_ID WHERE ACCOUNT.ACC_ID = ' + id[0].ACC_ID, function (err, result, fields) {
                  if (err)
                    writeResult(res, { 'error': err });
                  else {
                    writeResult(res, { 'userQuestions': result, 'changePassError': "" });
                  }
                });
              }
            }
          });
        }
      });
    }
  }
  else {
    writeResult(res, { 'error': "user is already logged in" });
  }
}

//Checks if security answers are correct, if new password is valid. Changes User's password if both conditions are met
//Takes Email, new Password, Security Answer 1, Security Answer 2
//req.query.email, req.query.password, req.query.Answer1, req.query.Answer2
function changePass(req, res) {
  if (req.query.Answer1 == undefined || req.query.Answer2 == undefined) {
    writeResult(res, { 'changePassError': "Answer fields cannot be blank" });
  }
  else {
    validatePassword(req.query.password, function (err) {
      if (!err) {
        console.log("password fault");
        writeResult(res, { 'changePassError': "Password must have a minimum of eight characters, at least one letter and one number" });
      }
      else {
        var con = mysql.createConnection(conInfo);
        //Get account id by their email
        con.query('SELECT ACCOUNT.ACC_ID FROM ACCOUNT WHERE ACCOUNT.ACC_EMAIL = ?', [req.query.email], function (err, id, fields) {
          if (err)
            writeResult(res, { 'error': err });
          else {
            if (id == null || id[0] == undefined) {
              console.log("invalid email");
              writeResult(res, { 'changePassError': "Invalid Email" })
            }
            else {
              //Get user's account info from their account ID
              con.query('SELECT * FROM ACCOUNT WHERE ACCOUNT.ACC_ID = ' + id[0].ACC_ID, function (err, result, fields) {
                //check that security question answers are correct, changes password if they are
                if (bcrypt.compareSync(req.query.Answer1, result[0].ACC_ANSWER_ONE) && bcrypt.compareSync(req.query.Answer2, result[0].ACC_ANSWER_TWO)) {
                  let hashPass = bcrypt.hashSync(req.query.password, 12);
                  con.query('UPDATE ACCOUNT SET ACCOUNT.ACC_PASSWORD = ? WHERE ACCOUNT.ACC_ID = ' + id[0].ACC_ID, [hashPass], function (err, result, fields) {
                    if (err) {
                      console.log("password not changed");
                      writeResult(res, { 'error': err });
                    }
                    else {
                      console.log("password changed");
                      writeResult(res, { 'changePassError': "", 'loginError': "" });
                    }
                  });
                }
                else {
                  console.log("invalid answers");
                  writeResult(res, { 'changePassError': "Invalid Answers" })
                }
              });
            }
          }
        });
      }
    });
  }
}

//Returns the information stored in session for logged in user
function whoIsLoggedIn(req, res) {
  if (req.session.user == undefined)
    writeResult(res, { 'error': 'Nobody is logged in.' });
  else
    writeResult(res, { 'email': req.session.user });
}

//Logs the user in if email and password are correct
//Requires email, password
//req.query.email, req.query.password
function login(req, res) {
  if (req.query.email == undefined) {
    writeResult(res, { 'loginError': "Email is required" });
    return;
  }
  if (req.query.password == undefined) {
    writeResult(res, { 'loginError': "Password is required" });
    return;
  }

  var con = mysql.createConnection(conInfo);
  con.connect(function (err) {
    if (err)
      writeResult(res, { 'error': err });
    else {
      //Get account info
      con.query("SELECT * FROM ACCOUNT WHERE ACC_EMAIL = ?", [req.query.email], function (err, result, fields) {
        if (err)
          writeResult(res, { 'error': err });
        else {
          //Log in the user if the entered password is the same as the stored password
          if (result.length == 1 && bcrypt.compareSync(req.query.password, result[0].ACC_PASSWORD)) {
            req.session.user = { 'id': result[0].ACC_ID, 'email': result[0].ACC_EMAIL };
            writeResult(res, { 'email': req.session.user });
          }
          else {
            writeResult(res, { 'loginError': "Invalid email/password" });
          }
        }
      });
    }
  });
}

//Clears Sesssion storage
function logout(req, res) {
  req.session.user = undefined;
  writeResult(res, { 'error': 'Nobody is logged in.', 'email': '' });
}

//Checks if an email is useable
//Requires email
//req.query.email
function validateEmail(email, callback) {
  if (email == undefined) {
    callback(false);
  }

  else {
    var con = mysql.createConnection(conInfo);
    con.connect(function (err) {
      if (err)
        writeResult(res, { 'error': err });
      else {
        //check if email is already present in the database before other functions try to store the email
        con.query('SELECT COUNT(*) AS total FROM ACCOUNT WHERE ACC_EMAIL=?', [email], function (err, result, fields) {
          if (err)
            writeResult(res, { 'error': err });
          else {
            let eCount = parseInt(JSON.stringify(result[0].total));
            if (eCount > 0) {
              callback(false);
            }

            else {
              //Prevent bobby droptables
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              callback(re.test(String(email).toLowerCase()));
            }
          }

        });
      }
    });
  }

}

//Checks to make sure password does not break sql
//Requires password
//req.query.password
function validatePassword(pass, callback) {
  if (pass == undefined) {
    callback(false);
  }

  else {
    var re = /^([ -!]|[#-&]|[--.]|[0-:]|[a-z]|[<-Z]){8,59}$/;
    callback(re.test(pass));
  }
}

function insertSnippet(req, res) {
  //if req.query.email is not defined throw error
  if (req.query.email == undefined)
    writeResult(res, { 'insertError': "Email invalid" });
  else {
    //check if req.query.desc is valid for snip_desc
    if (req.query.desc == undefined || req.query.desc.length > 255)
      writeResult(res, { 'insertError': "Description invalid" });
    else {
      //check if req.query.language is valid for snip_snippet
      if (req.query.lang == undefined || req.query.lang.length > 4294967295)
        writeResult(res, { 'insertError': "Language invalid" });
      else {
        //check if req.query.snippet is valid for snip_snippet
        if (req.query.snippet == undefined || req.query.snippet.length > 4294967295)
          writeResult(res, { 'insertError': "Snippet invalid" });
        else {
          var con = mysql.createConnection(conInfo);
          con.connect(function (err) {
            if (err)
              writeResult(res, { 'error': err });

            else {
              con.query("INSERT INTO SNIPPET (SNIP_CREATOR, SNIP_LANG, SNIP_DESC, SNIP_SNIPPET) VALUES (?, ?, ?, ?)", [req.query.email, req.query.lang, req.query.desc, req.query.snippet], function (err, result, fields) {
                if (err)
                  writeResult(res, { 'error': err });
                else
                  writeResult(res, { 'insertError': "", 'error': "" });
              });
            }

          });
        }
      }
    }
  }
}

//"Start Program" by reading index.html
function serveIndex(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  var index = fs.readFileSync('index.html');
  res.end(index);
}

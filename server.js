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
app.all('/getUserQuestions', getUserQuestions);
app.all('/register', register);
app.all('/changePass', changePass);
app.all('/whoIsLoggedIn', whoIsLoggedIn);
app.all('/Login', login);
app.all('/Logout', logout);

function startHandler() {
  console.log('Server listening on port ' + process.env.PORT)
}

function writeResult(res, obj) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(obj));
  res.end('');
}

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

        else if (req.query.Q1 == req.query.Q2)
        {
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
              else {
                let hashPass = bcrypt.hashSync(req.query.password, 12);
                let hashA1 = bcrypt.hashSync(req.query.A1, 12);
                let hashA2 = bcrypt.hashSync(req.query.A2, 12);
                con.query("INSERT INTO ACCOUNT (ACC_EMAIL, ACC_PASSWORD, ACC_QUESTION_ONE, ACC_ANSWER_ONE, ACC_QUESTION_TWO, ACC_ANSWER_TWO) VALUES (?, ?, ?, ?, ?, ?)", [req.query.email, hashPass, req.query.Q1, hashA1, req.query.Q2, hashA2], function (err, result, fields) {
                  if (err) {
                    writeResult(res, { 'error': err });
                    console.log(err);
                  }
                  else {
                    
                          con.query("SELECT * FROM ACCOUNT WHERE ACC_EMAIL = ?", [req.query.email], function(err, result, fields)
                          {
                              if(err)
                                  writeResult(res, {'error' : err});
                              else 
                              {
                                  req.session.user = {'result' : {'id': result[0].ACC_ID, 'email':result[0].ACC_EMAIL},'regError' : ""};
                                  writeResult(res, req.session.user);
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

function getSnippets(req, res) {
  //console.log("Now Listing Snippets");

  let result = {};

  var con = mysql.createConnection(conInfo);
  con.connect(function (err) {
    if (err)
      writeResult(res, { 'error': err });
    else {
      console.log([req.query.filter, req.query.category, req.query.order]);
      let filter = "%" + req.query.filter + "%";

      //console.log("select * from SNIPPET WHERE SNIP_LANG LIKE " + filter + " ORDER BY " + req.query.category + " " + req.query.order);

      con.query('SELECT * FROM SNIPPET WHERE SNIP_LANG LIKE ? OR SNIP_CREATOR LIKE ? OR SNIP_DESC LIKE ? ORDER BY ' + req.query.category + " " + req.query.order, [filter, filter, filter], function (err, result, fields) {
        if (err)
          writeResult(res, { 'error': err });
        else {
          writeResult(res, { 'result': result });
          //console.log(result);
        }

      });
    }
  });
}

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

//TODO catch non existing email
//TODO reverse first if-else statement
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
          con.query('SELECT ACCOUNT.ACC_ID FROM ACCOUNT WHERE ACCOUNT.ACC_EMAIL = ?', [req.query.email], function (err, id, fields) {
            if (err)
              writeResult(res, { 'error': err });
            else {
              if (id.length == 0) {
                console.log("No emails found");
                writeResult(res, { 'changePassError': "Email does not exist" });
              }
              else {
                con.query('SELECT QUESTION.QUEST_TEXT FROM ACCOUNT INNER JOIN QUESTION ON ACCOUNT.ACC_QUESTION_TWO = QUEST_ID WHERE ACCOUNT.ACC_ID = ' + id[0].ACC_ID + ' UNION SELECT QUESTION.QUEST_TEXT FROM ACCOUNT INNER JOIN QUESTION ON ACCOUNT.ACC_QUESTION_ONE = QUEST_ID WHERE ACCOUNT.ACC_ID = ' + id[0].ACC_ID, function (err, result, fields) {
                  if (err)
                    writeResult(res, { 'error': err });
                  else {
                    writeResult(res, { 'userQuestions': result , 'changePassError': ""});
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

//TODO modify invalid password error catching
//TODO catch invalid answers with unique error
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
        con.query('SELECT ACCOUNT.ACC_ID FROM ACCOUNT WHERE ACCOUNT.ACC_EMAIL = ?', [req.query.email], function (err, id, fields) {
          if (err)
            writeResult(res, { 'error': err });
          else {
            if (id == null || id[0] == undefined) {
              console.log("invalid email");
              writeResult(res, { 'changePassError': "Invalid Email" })
            }
            else {
              con.query('SELECT * FROM ACCOUNT WHERE ACCOUNT.ACC_ID = ' + id[0].ACC_ID, function (err, result, fields) {
                if (bcrypt.compareSync(req.query.Answer1, result[0].ACC_ANSWER_ONE) && bcrypt.compareSync(req.query.Answer2, result[0].ACC_ANSWER_TWO)) {
                  let hashPass = bcrypt.hashSync(req.query.password, 12);
                  con.query('UPDATE ACCOUNT SET ACCOUNT.ACC_PASSWORD = ? WHERE ACCOUNT.ACC_ID = ' + id[0].ACC_ID, [hashPass], function (err, result, fields) {
                    if (err) {
                      console.log("password not changed");
                      writeResult(res, { 'error': err });
                    }
                    else {
                      console.log("password changed");
                      writeResult( res, {'changePassError' : "", 'loginError': ""});
                    }
                  });
                }
                else 
                { 
                  console.log("invalid answers"); 
                  writeResult( res, {'changePassError' : "Invalid Answers"})
                }
              });
            }
          }
        });
      }
    });
  }
}

function whoIsLoggedIn(req, res) {
  if (req.session.user == undefined)
    writeResult(res, { 'error': 'Nobody is logged in.' });
  else
    writeResult(res, { 'email': req.session.user });
}

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
      con.query("SELECT * FROM ACCOUNT WHERE ACC_EMAIL = ?", [req.query.email], function (err, result, fields) {
        if (err)
          writeResult(res, { 'error': err });
        else {
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

function logout(req, res) {
  req.session.user = undefined;
  writeResult(res, { 'error': 'Nobody is logged in.' });
}

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
        con.query('SELECT COUNT(*) AS total FROM ACCOUNT WHERE ACC_EMAIL=?', [email], function (err, result, fields) {
          if (err)
            writeResult(res, { 'error': err });
          else {
            let eCount = parseInt(JSON.stringify(result[0].total));
            if (eCount > 0) {
              callback(false);
            }

            else {
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              callback(re.test(String(email).toLowerCase()));
            }
          }

        });
      }
    });
  }

}

function validatePassword(pass, callback) {
  if (pass == undefined) {
    callback(false);
  }

  else
  {
    var re = /^([ -!]|[#-&]|[--.]|[0-:]|[a-z]|[<-Z]){8,59}$/;
    callback(re.test(pass));
  }
}

function serveIndex(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  var index = fs.readFileSync('index.html');
  res.end(index);
}

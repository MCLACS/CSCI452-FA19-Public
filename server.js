console.log(require('dotenv').config());
const express = require('express');
const app = express();

var http = require('http');
var fs = require('fs');

var mysql = require('mysql');
const bcrypt = require('bcrypt');

app.listen(process.env.PORT,  process.env.IP, startHandler())

const conInfo =
{
	host : process.env.DB_HOST,
  	user : process.env.DB_USER,
	password : process.env.DB_PASS,
	database : process.env.DB_NAME
}; 

var session = require('express-session'); 
app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 600000 }}))

app.all('/', serveIndex);
app.all('/getSnippets', getSnippets);
app.all('/getQuestions', getQuestions);
app.all('/register', register);
app.all('/whoIsLoggedIn', whoIsLoggedIn);
app.all('/Login', login);
app.all('/Logout', logout);

function startHandler()
{
        console.log('Server listening on port ' + process.env.PORT)
}

function writeResult(res, obj)
{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(obj));
        res.end('');
}

function register(req, res)
{

  validateEmail(req.query.email, function(regError)
  {
    if (!regError)
    {
      writeResult(res, {'regError' : "Email invalid or already used."});
    }

    else
    {
	validatePassword(req.query.password, function(regError)
	{
            if (!regError)
            {
                writeResult(res, {'regError' : "Password must have a minimum of eight characters, at least one letter and one number"});
            } 

            else
            {
                var con = mysql.createConnection(conInfo);
                con.connect(function(err) 
  	        {
    	            if (err) 
      	                writeResult(res, {'error' : err});
    	            else
    	            {
      		        let hash = bcrypt.hashSync(req.query.password, 12);
      		        con.query("INSERT INTO ACCOUNT (ACC_EMAIL, ACC_PASSWORD) VALUES (?, ?)", [req.query.email, hash], function (err, result, fields) 
      		        {
        		    if (err) 
        		    {
            			writeResult(res, {'error' : err});
	    			console.log(err);
        		    }
        		    else
        		    {
          			writeResult(res, {'regError' : ""});
        		    }
      		        });
    	            }
  	        });
            }
	});
    }
  });
}

function getSnippets(req, res)
{
        //console.log("Now Listing Snippets");

        let result = {};

        var con = mysql.createConnection(conInfo);
        con.connect(function(err)
        {
                if(err) 
                        writeResult(res, {'error' : err});
                else
                {
			console.log([req.query.filter, req.query.category, req.query.order]);
		 	let filter = "%" +  req.query.filter + "%" ;

			//console.log("select * from SNIPPET WHERE SNIP_LANG LIKE " + filter + " ORDER BY " + req.query.category + " " + req.query.order);
			
			con.query('SELECT * FROM SNIPPET WHERE SNIP_LANG LIKE ? OR SNIP_CREATOR LIKE ? OR SNIP_DESC LIKE ? ORDER BY ' + req.query.category + " " + req.query.order, [filter, filter, filter], function(err, result, fields)
                        {
				            if(err)
					            writeResult(res, {'error' : err});
				            else
				            {
                                		writeResult(res, {'result' : result});
						//console.log(result);
				            }

                        });
                }
        });
}

function getQuestions(req, res)
{
  var con = mysql.createConnection(conInfo);
  con.connect(function(err) 
  {
    if (err) 
      writeResult(res, {'error' : err});
    else
    {
      con.query('SELECT QUEST_TEXT FROM QUESTION', function (err, result, fields) 
      {
        if (err) 
          writeResult( res, {'error' : err});
        else
        {
	  writeResult( res, {'questions' : result})
        }
      });
    }
  });
}

function whoIsLoggedIn(req, res)
{
  if (req.session.user == undefined)
    writeResult( res, {'error' : 'Nobody is logged in.'});
  else
    writeResult( res, {'email': req.session.user});
}

function login(req, res)
{
  if (req.query.email == undefined)
  {
    writeResult( res, {'loginError' : "Email is required"});
    return;
  }
  if (req.query.password == undefined)
  {
    writeResult( res, {'loginError' : "Password is required"});
    return;
  }
  
  var con = mysql.createConnection(conInfo);
  con.connect(function(err) 
  {
    if (err) 
      writeResult(res, {'error' : err});
    else
    {
      con.query("SELECT * FROM ACCOUNT WHERE ACC_EMAIL = ?", [req.query.email], function (err, result, fields) 
      {
        if (err) 
          writeResult( res, {'error' : err});
        else
        {
          if(result.length == 1 && bcrypt.compareSync(req.query.password, result[0].ACC_PASSWORD))
          {
            req.session.user = {'id': result[0].ACC_ID, 'email': result[0].ACC_EMAIL};
            writeResult( res, {'email': req.session.user});
          }
          else 
          {
            writeResult( res, {'loginError': "Invalid email/password"});
          }
        }
      });
    }
  });
}

function logout(req, res)
{
  req.session.user = undefined;
  writeResult( res, {'error' : 'Nobody is logged in.'});
}

function validateEmail(email, callback) 
{
  if (email == undefined)
  {
    callback(false);
  }

  else 
  {
	var con = mysql.createConnection(conInfo);
        con.connect(function(err)
        {
                if(err)
                        writeResult(res, {'error' : err});
                else
                {
                     con.query('SELECT COUNT(*) AS total FROM ACCOUNT WHERE ACC_EMAIL=?', [email], function(err, result, fields)
                     {
                            if(err)
                                writeResult(res, {'error' : err});
                            else
                            {
				let eCount = parseInt(JSON.stringify(result[0].total));	
                                if (eCount > 0)
				{
				    callback(false);
				}

				else
				{
				    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				    callback(re.test(String(email).toLowerCase()));
				} 
                            }

                     });
                }
        });
  }
 
}

function validatePassword(pass, callback)
{
  if (pass == undefined)
  {
    callback(false);
  }
  else
  {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    callback(re.test(pass));
  }
}

function serveIndex(req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  var index = fs.readFileSync('index.html');
  res.end(index);
}

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

app.all('/', serveIndex);
app.all('/getSnippets', getSnippets);
app.all('/register', register);

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
  if (req.query.email == undefined || !validateEmail(req.query.email))
  {
    console.log("validateEmail failed?");
    writeResult(res, {'regError' : "Email invalid or already used."});
  }

  else
  {
	console.log("moving on...");
    if (!validatePassword(req.query.password))
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
	  			//console.log(result);
        		}
      		});
    	    }
  	});
      }
  }
}

function getSnippets(req, res)
{
        console.log("Now Listing Snippets");

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

			console.log("select * from SNIPPET WHERE SNIP_LANG LIKE " + filter + " ORDER BY " + req.query.category + " " + req.query.order);
			
			con.query('SELECT * FROM SNIPPET WHERE SNIP_LANG LIKE ? OR SNIP_CREATOR LIKE ? OR SNIP_DESC LIKE ? ORDER BY ' + req.query.category + " " + req.query.order, [filter, filter, filter], function(err, result, fields)
                        {
				            if(err)
					            writeResult(res, {'error' : err});
				            else
				            {
                                		writeResult(res, {'result' : result});
						console.log(result);
				            }

                        });
                }
        });
}

function validateEmail(email) 
{
  if (email == undefined)
  {
    return false;
  }

  //SELECT COUNT(*) FROM SNIPPETDB.ACCOUNT WHERE ACC_EMAIL='asdf@asdf.com';

  /* if (con.query('SELECT COUNT(*) FROM ACCOUNT WHERE ACC_EMAIL=?', [email]) > 0)
  {
    return false;
  } */

/*  else
  {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  } */


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
                                                //writeResult(res, {'result' : result});
						let yeet = parseInt(JSON.stringify(result[0].total));	
                                                //console.log();
                                                console.log("email count: " + yeet);
                                                if (yeet > 0)
						{
						    console.log("dup detected");
						    console.log(false);
						    return false;
						}

						else
						{
						    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						    console.log(re.test(String(email).toLowerCase()));
						    return re.test(String(email).toLowerCase());
						}
                                            }

                        });
                }
        });
  }
}

function validatePassword(pass)
{
  if (pass == undefined)
  {
    return false;
  }
  else
  {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(pass);
  }
}

function serveIndex(req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  var index = fs.readFileSync('index.html');
  res.end(index);
}

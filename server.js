console.log(require('dotenv').config());
const express = require('express');
const app = express();

var http = require('http');
var fs = require('fs');

var mysql = require('mysql');

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
			//con.query("SELECT * FROM SNIPPET FROM SNIPPET WHERE SNIP_LANG OR SNIP_CREATOR OR SNIP_DESC", function(err, result, fields)
			//con.query("SELECT * FROM SNIPPET WHERE SNIP_LANG LIKE '%?%' OR SNIP_CREATOR LIKE '%?%' OR SNIP_DESC LIKE '%?%' ORDER BY ? ?", [req.query.filter, req.query.filter, req.query.filter,  req.query.category, req.query.order]);
			console.log([req.query.category, req.query.order]);
			con.query("SELECT * FROM SNIPPET " + " ORDER BY " + req.query.category + " " + req.query.order,function(err, result, fields)
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

function serveIndex(req, res)
{
  res.writeHead(200, {'Content-Type': 'text/html'});
  var index = fs.readFileSync('index.html');
  res.end(index);
}

const express = require('express');
const app = express();

var http = require('http');
var fs = require('fs');

require('dotenv').config()

var mysql = require('mysql');

app.listen(process.env.PORT,  process.env.IP, startHandler())


// const db = require('db');
/* db.connect({
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database : process.env.DB_NAME
}); */

/*0
const conInfo =
{
	host : process.env.DB_HOST,
  	user : process.env.DB_USER,
	password : process.env.DB_PASS,
	database : process.env.DB_NAME
}; */

const conInfo =
{
        host : "localhost",
        user : "root",
        password : "password",
        database : "SNIPPETDB"
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
			console.log("connected")
                        con.query("SELECT * FROM SNIPPET", function(err, snippets, fields)
                        {
				if(err)
					writeResult(res, {'error' : err});
				else
				{
                                	result = {'result' : [{'snip_id' : snippets[0].SNIP_ID, 'lang' : snippets[0].SNIP_LANG, 'creator' : snippets[0].SNIP_CREATOR, 'desc' : snippets[0].SNIP_DESC}]};
                                	writeResult(res, result);
					console.log("yeet");
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

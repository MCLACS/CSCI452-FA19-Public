const express = require('express');
const app = express();


var mysql = require('mysql');

app.listen(process.env.PORT,  process.env.IP, startHandler())

const conInfo =
{
	host : process.env.DB_HOST,
  	user : process.env.DB_USER,
	password : process.env.DB_PASS,
	database : process.env.DB_NAME
};


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
                        con.query("SELECT * FROM SNIPPETS", function(err, snippets, fields)
                        {

                                result = {'result' : [{'snip_id' : snippets[0].SNIP_ID, 'lang' : snippets[0].SNIP_$
                                writeResult(res, result);

                        });
                }
        }


}

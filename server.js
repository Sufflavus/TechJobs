var express = require('express');
var http = require('http');
var parseString = require('xml2js').parseString;
var fs = require('fs');
var jsonfile = require('jsonfile');
var app = express();

var port = process.env.PORT || 8080;
var path = process.cwd();

app.get('/', function (req, res) {
    res.sendFile(path + '/public/index.html');
});

app.get('/favicon.ico', function (req, res) {
    
});

app.get('/public/*', function (req, res) {
    res.sendFile(path + req.url);
});

app.get('/api/refreshData', function (req, res) {
    var dataReq = http.get("http://stackoverflow.com/jobs/feed", function(dataRes) {
        var xml = '';
        dataRes.on('data', function(chunk) {
            xml += chunk;
        });

        dataRes.on('end', function() {
            parseString(xml, function (err, result) {
                var file = '/public/js/data.json';
                
                jsonfile.writeFile(file, result.rss.channel[0].item[0], function (err) {
                    console.error(err);
                });
                
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result.rss.channel[0]));
            });
        });
    });

    dataReq.on('error', function(err) {
        console.log(err);
    });
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
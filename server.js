var express = require('express');
var https = require('https');
var app = express();

var port = process.env.PORT || 8080;
var path = process.cwd();

app.get('/', function (req, res) {
  res.sendFile(path + '/public/index.html');
});

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path + '/public/favicon.ico');
});

app.get('/public/*', function (req, res) {
  var dataReq = https.get(url, function(dataRes) {
    // save the data
    var xml = '';
    dataRes.on('data', function(chunk) {
      xml += chunk;
    });
  
    dataRes.on('end', function() {
      // parse xml
    });
  
    // or you can pipe the data to a parser
    dataRes.pipe(dest);
  });
  
  dataReq.on('error', function(err) {
    // debug error
  });
  res.sendFile(path + req.url);
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
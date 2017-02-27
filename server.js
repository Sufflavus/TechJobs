var express = require('express');
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
  res.sendFile(path + req.url);
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
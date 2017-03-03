'use strict';

var http = require('http');
var parseString = require('xml2js').parseString;
var jsonfile = require('jsonfile');

module.exports = Dal;

function Dal() {
    this.refreshData = function() {
        var dataReq = http.get("http://stackoverflow.com/jobs/feed", processFeed);
    
        dataReq.on('error', function(err) {
            console.log(err);
        });
    };

    function processFeed(dataRes) {
        var xml = '';
        dataRes.on('data', function(chunk) {
            xml += chunk;
        });

        dataRes.on('end', function() {
            parseString(xml, function (err, result) {
                saveJson(result.rss.channel[0].item[0]);
            });
        });
    }

    function saveJson(jsonObject) {
        var file = '/public/js/data.json';

        jsonfile.writeFile(file, jsonObject, function (err) {
            console.error(err);
        });
    }
}
// storing dependencies in variables
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var port = 8081;
var app = express();

app.get('/', function(req, res){
    res.send('Hello World!');
});

app.listen(port);
console.log('Magic happens on port' + port);
exports = module.exports = app;
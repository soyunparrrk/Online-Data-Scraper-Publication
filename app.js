// storing dependencies in variables
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var port = 8081;
var app = express();

// wikipedia
app.get('/wikipeida', function (req, res) {
    var url = "https://en.wikipedia.org/wiki/Dog";
    request(url, function (error, response, html) {
        if (!error) {

            var wiki_data = {
                title: '',
                img: '',
                paragraph: ''

            };

            var $ = cheerio.load(html);

            $('#content').filter(function () {
                wiki_data.title = $(this).find('h1').text();
                wiki_data.img = $(this).find('img').first().attr('src');
                wiki_data.paragraph = $(this).find('p').text();
            });

            res.send(wiki_data);
        }
    });
});

// imdb
app.get('/imdb', function (req, res) {
    var url = "https://www.imdb.com/chart/top";
    request(url, function (error, response, html) {
        if (!error) {

            var imdb_data = [];

            var $ = cheerio.load(html);

            $('.lister').filter(function() {
                $(this).find('tr').each(function (i, element) {
                    imdb_data[i] = "'" + $(this).find('img').attr('src') + "'";
                });


            });

            res.send(imdb_data);
            fs.writeFile('imdb_output.js', "var imdb_output = [" + imdb_data + "]", function(error){
            console.log("File is written sucessfully!");
            });
        }
    });
});

app.listen(port);
console.log('Magic happens on port' + port);
exports = module.exports = app;

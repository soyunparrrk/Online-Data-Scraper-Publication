# Online-Data-Scraper-Publication

### 9 Spet 2019
Downloaded Github and figured out how to commit and push.

### 16 Sept 2019
Searched for inspiration and found Google autocomplete API. Also learnt how to use node.js. 

* This is a test for app.js.

  1. `node -v` on terminal to check whether I have node or not
  2. Copy the code from the node website(https://nodejs.org/en/docs/guides/getting-started-guide/), paste it in a new file and save. (file name ex. app.js)
  3. `cd` it in terminal. It will show the server address.
  4. I can access the address through a web browser.

### 23 Sept 2019
Learnt more of node through terminal.

:black_small_square: Downloading nodemon
  1. At terminal, say:
`sudo npm install -g nodemon`
  2. change directory to the folder, and say:
`npm install`
  (Then it will install node modules to the folder.)

:black_small_square: Integrating nodemon
  1. Type this code in app.js.
```
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
```
   2. Save it, run terminal and type `node app.js`.
  
:black_small_square: Testing with wikipedia
  Replace `app.get{}` part with this. Then it will bring the wiki page.
```
  app.get('/', function(req, res){
    var url = "https://en.wikipedia.org/wiki/Dog";
    request(url, function(error, response, html) {
    if ( !error ){
        res.send(html);
    }
    });
});
```
   Replace `if (!error)` part with this. Then it will read the data according to the request.
```
if ( !error ){
        
        var wiki_data = {
            title: '',
            img: '',
            paragraph: ''
            
        }; 
        
        var $ = cheerio.load(html);
        
        $('#content').filter(function(){
        wiki_data.title = $(this).find('h1').text();
        wiki_data.img = $(this).find('img').first().attr('src');
        wiki_data.paragraph = $(this).find('p').text();
        });
        
        res.send(wiki_data);
    }
```

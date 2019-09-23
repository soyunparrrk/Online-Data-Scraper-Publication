# Online-Data-Scraper-Publication

### 9 Spet 2019
*Downloaded Github and figured out how to commit and push.*

### 16 Sept 2019
*Searched for inspiration and found Google autocomplete API. Also learnt how to use node.js.*

:black_small_square: This is a test for app.js.
  1. `node -v` on terminal to check whether I have node or not
  2. Copy the code from the node website(https://nodejs.org/en/docs/guides/getting-started-guide/), paste it in a new file and save. (file name ex. app.js)
  3. `cd` it in terminal. It will show the server address.
  4. I can access the address through a web browser.

### 23 Sept 2019
*Learnt more of node through terminal and started data scraping on wikipedia/imdb.*

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
  
:black_small_square: Testing with wikipedia.
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
:black_small_square: Replace `if (!error)` part with this. Then it will read the data according to the request.
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

:black_small_square: Let's work with imdb this time.
We copy paste the wikipediea app.get part and type `/imdb` after slash part of `app.get('/...'`. Change `wiki_data` to `imdb_data`. Now we have two `app.get`.

We are going to try to get the `.lister` information from imdb top website. Add this code after `            var $ = cheerio.load(html);`

```
$('.lister').filter(function() {
                $(this).find('tr').each(function (i, element) {
                    imdb_data[i] = "'" + $(this).find('img').attr('src') + "'";
                });


            });
```

:black_small_square: Creating a javascript file. 
Put this code after `res.send(imdb_data);`to automatically create a javascript file called imdb_output.js.
```
fs.writeFile('imdb_output.js', "var imdb_output = [" + imdb_data + "]", function(error){
            console.log("File is written sucessfully!");
            });
```

:black_small_square: Create HTML to display.
```
<!DOCTYPE HTML>
<html>
    <head>
        <script src="imdb_output.js"></script>
        <script type="text/javascript">
            function load_imdb_images(){
                var div = document.getElementById('data');
                
                for(var i = 0; i < imdb_output.length; i++){
                    var img = "<img class='tile' src='" + imdb_output[i] + "'>";
                    div.innerHTML = div.innerHTML + img;
                }
                
            }
        </script>
    </head>
    <body onload="load_imdb_images()">
        <div id="data">
        </div>
    
    </body>
    
</html>
```
:black_small_square: Check out https://soyunparrrk.github.io/ if it's working.

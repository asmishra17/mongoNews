var express = require('express');
var bodyParser = require('body-parser');
var logger = require("morgan");
var mongoose = require('mongoose');

// scraping tools
var axios = require('axios');
var cheerio = require('cheerio');

// require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// initialize express
var app = express();

// configure middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/mongoNews");

// GET route for testing
app.get('/', function (req, res) {
    res.send('Hello, World!')
})

// a GET route for scraping the NTY website
app.get('/scrape', function (req, res) {
    axios.get('https://www.nytimes.com/section/travel?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Travel&WT.nav=page').then(function(response) {
        var $ = cheerio.load(response.data);

        $('h2.headline').each(function(i, element) {
            var result = {};

            // add the text and href of every link, and save them as properties of the result object. 
            result.title = $(this)
                .children('a')
                .text();
            result.link = $(this)
                .children('a')
                .attr('href');
            
            // create a new "Article" collection using the "result" object built from scraping

            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err);
                })
        });

        res.send('Scrape Complete');

    });

});

// start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});

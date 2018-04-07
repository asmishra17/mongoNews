var express = require('express');
var exprhbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require("morgan");
var mongoose = require('mongoose');
var routes = require("./routes");

// scraping tools
var axios = require('axios');
var cheerio = require('cheerio');

// require all models
var db = require("./models");

// initialize express
var app = express();
var PORT = process.env.PORT || 3000;

// configure middleware
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine("handlebars", exprhbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(routes);

mongoose.connect("mongodb://localhost/mongoNews");

// start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});

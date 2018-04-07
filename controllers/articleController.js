var db = require('../models');
var axios = require('axios');
var cheerio = require('cheerio');

module.exports = {
    find: function (req, res) {
        db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            return res.json(err);
        })
    },
    create: function (req, res) {
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
    
        });
    }, findOne: function (req, res) {
        db.Article.findOne({_id: req.params.id})
            .populate('note')
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    }
};


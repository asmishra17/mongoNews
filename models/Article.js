var mongoose = require('mongoose');

// save a reference to the schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }, 
    link: {
        type: String,
        required: true
    },
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
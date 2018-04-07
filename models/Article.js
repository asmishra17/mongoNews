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
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
    // note is an object that stores a Note id. the ref property links the ObjectId to the Note model, which allows us to populate the article with the associate note. 
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
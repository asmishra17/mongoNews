var router = require('express').Router();
var articleController = require('../controllers/articleController');

// localhost3000/api/articles
router.get('/articles', articleController.find);
router.get('/scrape', articleController.create);
router.get('/:id', articleController.findOne);

module.exports = router;


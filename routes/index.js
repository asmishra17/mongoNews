var router = require('express').Router();
var dataRouter = require('./apiRoutes');
var htmlRouter = require('./htmlRoutes');

router.use('/api/articles', dataRouter);
router.use('/', htmlRouter);

module.exports = router;


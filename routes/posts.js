var express = require('express');
var router = express.Router();

/* GET posts page. */
router.get('/', function(req, res, next) {
  res.render('posts', { title: '文章' });
});

module.exports = router;

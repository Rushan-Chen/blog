var express = require('express');
var router = express.Router();

/* GET posts page. */
router.get('/posts', function(req, res, next) {
  res.render('posts', { title: '无影有记' });
});

module.exports = router;

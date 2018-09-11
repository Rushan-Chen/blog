var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
    res.send('yangyang, huahua, lili');
});

/* GET posts List. */
router.get('/posts', function(req, res, next) {
    res.json({ postsList: ['文章1', '文章2', '文章3'] });
});

module.exports = router;
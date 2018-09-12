var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var marked = require('./common/marked');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '无影有记' });
});

/* GET posts page. */
router.get('/posts', function(req, res, next) {
    res.render('posts', { title: '文章' });
});

/* GET posts create page. */
router.get('/posts/create', function(req, res, next) {
    res.render('create');
});

/* GET posts show page. */
router.get('/posts/show', function(req, res, next) {
    var id = req.query.id;

    PostModel.findOne({_id : id}, function (err, post) {
        post.content = marked(post.content);
        res.render('show', {post});
    }); 
});

module.exports = router;
var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');

/* GET users listing. */
router.get('/users', function(req, res, next) {
    res.send('response with a resource');
});

/* GET posts List. */
router.get('/posts', function(req, res, next) {
    PostModel.find ({}, {}, function (err, posts){
        if (err) {
            next(err);
        } else {
            res.json({ postsList: posts });
        }
    });
});

/* GET one post. */
router.get('/posts/:id', function(req, res, next) {
    var id = req.params.id;

    PostModel.findOne ({_id: id}, function (err, post){
        if (err) {
            next(err);
        } else {
            res.json({ post });
        }
    });
});

/* POST create post. */
router.post('/posts', function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    
    var post = new PostModel();
    post.title = title;
    post.content = content;
    post.save(function (err, post) {
        if(err) {
            next(err);
        } else {
            res.json({ post }); // 创建后返回数据给客户端，客户端拿到id可以做一些交互
        }
    });
});

/* PATCH edit post. */
router.patch('/posts/:id', function(req, res, next) {
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;

    // console.log(req.params); // { id: '5b9a4394005b77a1b6d44b39' }
    // console.log(req.query); // {}
    // 路径 /x/y/ => `req.parama`
    // 参数 ?id=123 => `req.query`
    // body => `req.body`

    PostModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
        if (err) {
            next(err);
        } else {
            res.json({}); // 不需要返回文章数据
        }
    });
});

module.exports = router;
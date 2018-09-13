var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');

/* GET users listing. */
router.get('/users', function(req, res, next) {
    res.send('yangyang, huahua, lili');
});

/* GET posts List. */
router.get('/posts', function(req, res, next) {
    PostModel.find ({}, {}, function (err, posts){
        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true, postsList: posts });
        }
    });
});

/* GET one post. */
// 例如，GET /api/posts/one?id=5b98a81f72cefb49d18b8b24
router.get('/posts/one', function(req, res, next) {
    var id = req.query.id;

    PostModel.findOne ({_id: id}, function (err, post){
        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true, post });
        }
    });
});

/* POST create post. */
router.post('/posts/create', function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    
    var post = new PostModel();
    post.title = title;
    post.content = content;
    post.save(function (err, post) {
        if(err) {
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    });
});

/* PATCH edit post. */
// POST /api/posts/edit （不带id）
router.post('/posts/edit', function(req, res, next) {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;

    // console.log(req.query.id); //undefined
    // 之前写成req.query.id，结果编辑后post成功但是没有更新内容。
    // 注意id在不同情况下载哪个属性里。

    PostModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
        if (err) {
          res.json({ success: false });
        } else {
          res.json({ success: true });
        }
    });
});

module.exports = router;
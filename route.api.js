var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var UserModel = require('./models/user');
var bcrypt = require('bcrypt');
var config = require('./config');

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

    PostModel.findById ( id, function (err, post){
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
    post.authorId = res.locals.currentUser._id;
    post.save(function (err, doc) {
        if(err) {
            next(err);
        } else {
            res.json({ post: doc }); // 创建后返回数据给客户端，客户端拿到id可以做一些交互
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

/* POST signup user. */
router.post('/signup', function(req, res, next) {
    var name = req.body.name;
    var pass = req.body.pass;
    var rePass = req.body.rePass;
    
    if (!name) {
        return next(new Error('账号不能为空'));
    }

    if (!pass || !rePass) {
        return next(new Error('密码不能为空'));
    }

    //要先对传入的两次密码进行对比
    if (pass !== rePass) {
        return next(new Error('两次密码不一致'));
    }

    var user = new UserModel();
    user.name = name;
    user.pass = bcrypt.hashSync(pass, 10);
    user.save(function (err) {
        if(err) {
            next(err);
        } else {
            res.end(); // 结束响应，不返回data(response.data)
        }
    });
});

/* POST signin user. */
router.post('/signin', function(req, res, next) {
    var name = req.body.name;
    var pass = req.body.pass;
    // TODO: 如果不设置''为默认值，会怎么样？
    UserModel.findOne ({ name }, function (err, user){
        if (err || !user) {// TODO: 如果不加!user?
            next(new Error('用户名不存在'));
        } else {
            var isOk = bcrypt.compareSync(pass, user.pass);
            if (!isOk) {
                return next(new Error('密码不正确'));
            }
        }

        var authToken = user._id;
        var opts = {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 30, //【重要】cookie有效期30天。单位是毫秒。
            signed: true, // 签名
            httpOnly: true // 将 cookie 标记为只能由 web 服务器访问。
        };

        res.cookie(config.cookieName, authToken, opts);
        res.end();
    });
});

module.exports = router;
import express from 'express' ;
import PostModel from './models/post' ;
import UserModel from './models/user' ;
import bcrypt from 'bcrypt' ;
import config from './config' ;
import jwt from 'jwt-simple';
import moment from 'moment';

const router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
    res.send('response with a resource');
});

/* GET posts List. */
router.get('/posts', function(req, res, next) {
    PostModel.find ({}, function (err, posts){
        if (err) {
            next(err);
        } else {
            res.json({ postsList: posts });
        }
    });
});

/* GET one post. */
router.get('/posts/:id', function(req, res, next) {
    const id = req.params.id;

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
    const { title, content } = req.body;
    
    const post = new PostModel();
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
    const id = req.params.id;
    const { title, content } = req.body;

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
    const { name, pass, rePass } = req.body;
    
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

    const user = new UserModel();
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
    const { name, pass } = req.body;
    
    UserModel.findOne ({ name }, function (err, user){
        if (err || !user) {
            return next(new Error('找不到用户'));
        } else {
            const isOk = bcrypt.compareSync(pass, user.pass);
            if (!isOk) {
                return next(new Error('密码不正确'));
            }
        }

        const token = jwt.encode(
            {
                _id: user._id,
                name: user.name,
                isAdmin: user.name === config.admin ? true : false,
                exp: moment().add( 30, 'days' ).valueOf() 
            },
            config.jwtSecret
        );
        const opts = {
            path: '/',
            maxAge: moment().add( 30, 'days' ).valueOf(), //【重要】cookie有效期30天。单位是毫秒。
            signed: true, // 签名
            httpOnly: true // 将 cookie 标记为只能由 web 服务器访问。
        };

        // 将token保存在cookie里。
        res.cookie(config.cookieName, token, opts);
        res.json({ token });
    });
});

export default router;
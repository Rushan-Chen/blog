import bcrypt from 'bcrypt';
import UserModel from './models/user' ;
import config from './config' ;
import jwt from 'jwt-simple';
import moment from 'moment';

export const signup = function(req, res, next) {
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
};

export const signin = function(req, res, next) {
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
};

export const more = function(req, res, next) {
    res.send('response with a resource');
};

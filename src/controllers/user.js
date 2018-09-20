import bcrypt from 'bcrypt';
import UserModel from '../models/user' ;
import config from '../config' ;
import jwt from 'jwt-simple';
import moment from 'moment';
import { sendActiveMail } from '../common/mail';
import utility from 'utility';

export const signup = function(req, res, next) {
    const { name, email, pass, rePass } = req.body;
    
    if (!name || !email || !pass || !rePass) {
        return next(new Error('不能为空'));
    }

    //要先对传入的两次密码进行对比
    if (pass !== rePass) {
        return next(new Error('两次密码不一致'));
    }

    const user = new UserModel();
    user.name = name;
    user.email = email;
    user.pass = bcrypt.hashSync(pass, 10);
    user.save(function (err) {
        if(err) {
            next(err);
        } else {
            sendActiveMail(
                email,
                utility.md5(user.email + user.pass),
                name
            );

            res.json({
                message:`欢迎加入${
                    config.name
                }! 已经发了一封邮件到你的注册邮箱，请点击里面的激活链接来激活你的账户。` 
            }); 
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
            if (!user.active) {
                return next(new Error('需要激活'));
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

export const activeAccount = function (req, res, next) {
    const { key, name } = req.query;
  
    UserModel.findOne({ name }, function (err, user) {
      if (err || !user) {
        return next(new Error('找不到用户'));
      } else {
  
        const key2 = utility.md5(user.email + user.pass);
        if (key !== key2) {
          return next(new Error('激活失败'));
        }
  
        user.active = true;
        user.save();
  
        const token = jwt.encode(
          {
            _id: user._id,
            name: user.name,
            isAdmin: user.name === config.admin,
            active: user.active,
            exp: moment()
              .add(30, 'days')
              .valueOf()
          },
          config.jwtSecret
        );
  
        const opts = {
          path: '/',
          maxAge: moment()
            .add(30, 'days')
            .valueOf(),
          signed: true,
          httpOnly: true
        };
  
        res.cookie(config.cookieName, token, opts);
        res.send(`<br>激活成功，点击<a href="/signin">这里登录</a>`);
      }
    });
  };

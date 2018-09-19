var config = require ('../config');
var UserModel = require ('../models/user');

function authUser (req, res, next) {
    res.locals.currentUser = null;

    if (req.session && req.session.user) {
        const user = req.session.user;
        res.locals.currentUser = user;
        next();
    } else {
        const authToken = req.signedCookies[config.cookieName] || '';
    
        if (authToken) {
            UserModel.findOne({_id: authToken}, function (err, user) {
                if (err || !user) {
                    next(); // 为什么不是next(err)? 没找到对应user，说明没有登录，没登录还是可以继续下一个中间件的。
                } else {
                    user = user.toObject();
                    user.isAdmin = user.name === config.admin;

                    req.session.user = user;
                    res.locals.currentUser = user;
                    next(); // 为什么不是next(err)? 找到user，说明登录了，那就继续传给下一个中间件。
                }
            });
        } else {
            next(); // 没有签名cookie，没有登录，传给下一个中间件。
        }
    }
}

function adminRequired (req, res, next) {
    if (!req.session || !req.session.user) {
        let err = new Error ('需要登录');
        err.status= 403;
        next(err);
        return;
    }

    if (!req.session.user.isAdmin) {
        let err= newError ('需要管理员权限');
        err.status = 403;
        next(err);
        return;
    }
    next();
}

module.exports = { authUser, adminRequired };
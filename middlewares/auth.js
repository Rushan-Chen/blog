var config = require ('../config');
var UserModel = require ('../models/user');

function authUser (req, res, next) {
    const authToken = req.signedCookies[config.cookieName] || '';
    res.locals.currentUser = null;

    if (authToken) {
        UserModel.findOne({_id: authToken}, function (err, user) {
            if (err) {
                next(); // 为什么不是next(err)? 没找到对应user，说明没有登录，没登录还是可以继续下一个中间件的。
            } else {
                res.locals.currentUser = user;
                next(); // 为什么不是next(err)? 找到user，说明登录了，那就继续传给下一个中间件。
            }
        });
    } else {
        next(); // 没有签名cookie，没有登录，传给下一个中间件。
    }
}

module.exports = { authUser };
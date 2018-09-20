import PostModel from '../models/post';
import marked from '../common/marked';

export const homePage = function(req, res, next) {
    res.render('index', { title: '无影有记' });
};

export const postsPage = function(req, res, next) {
    res.render('posts', { title: '文章' });
};

export const createPage = function(req, res, next) {
    res.render('create');
};

export const showPage = function(req, res, next) {
    const id = req.query.id;

    PostModel.findOne({_id : id}, function (err, post) {
        post.mkContent = marked(post.content);
        res.render('show', {post});
    }); 
};

export const editPage = function(req, res, next) {
    const id = req.query.id;
    res.render('edit', { id });
};

export const signupPage = function(req, res, next) {
    res.render('signup');
};

export const signinPage = function(req, res, next) {
    res.render('signin');
};
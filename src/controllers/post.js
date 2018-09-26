import PostModel from '../models/post' ;

export const more = function(req, res, next) {
    PostModel.find ({}, {})
        .exec()
        .then( posts => {
            res.json({ postsList: posts });
        })
        .catch(next);
};

export const one = function(req, res, next) {
    const id = req.params.id;

    PostModel.findById ( id )
        .exec()
        .then(post => {
            res.json({ post });
        })
        .catch(next);
};

export const create = function(req, res, next) {
    const { title, content } = req.body;
    
    const post = new PostModel();
    post.title = title;
    post.content = content;
    post.authorId = res.locals.currentUser._id;
    
    post.save()
        .then(doc => {
            res.json({ post: doc });// 创建后返回数据给客户端，客户端拿到id可以做一些交互
        })
        .catch(next);
};

export const update = function(req, res, next) {
    const id = req.params.id;
    const { title, content } = req.body;

    PostModel.findOneAndUpdate({ _id: id }, { title, content })
        .exec()
        .then(() => {
            res.json({}); // 不需要返回文章数据
        })
        .catch(next);
};

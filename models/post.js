var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 构建表模型
var PostSchema = new Schema ({
    title: String,
    content: String
});

// 将表模型关联到'Post'这张表
var PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
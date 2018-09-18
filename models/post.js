var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO: 为什么不是Schema.Types.ObjectId?
var ObjectId = Schema.ObjectId;

// 构建表模型
var PostSchema = new Schema ({
    title: { type:String, required: true },
    content: { type:String, required: true },
    authorId: ObjectId, // 添加作者ID
});

// 将表模型关联到'Post'这张表
var PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
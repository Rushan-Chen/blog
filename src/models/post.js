import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

// 构建表模型
const PostSchema = new Schema ({
    title: { type:String, required: true },
    content: { type:String, required: true },
    authorId: ObjectId, // 添加作者ID
});

// 将表模型关联到'Post'这张表
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
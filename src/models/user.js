import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: { type:String, required: true, unique: [true, '该账户已存在']},
    email: { type:String, required: true, unique: [true, '该邮箱已被注册']},
    pass: { type:String, required: true },
    active: Boolean
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
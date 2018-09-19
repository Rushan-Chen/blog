import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: { type:String, required: true, unique: [true, '该账户已存在，请重新输入']},
    pass: { type:String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
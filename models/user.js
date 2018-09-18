var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    name: { type:String, required: true, unique: [true, '该账户已存在，请重新输入']},
    pass: { type:String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
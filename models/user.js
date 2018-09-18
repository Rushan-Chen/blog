var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    name: { type:String, required: true, unique: true},
    pass: { type:String, required: true}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
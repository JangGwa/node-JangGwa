var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, require: true},
  password: {type: String, require: true},
  avatar: String,
  status: Number // 权限
})

const User = mongoose.model('User', userSchema);

module.exports = User;
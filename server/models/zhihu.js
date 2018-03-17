var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const zhihuSchema = new Schema({
  userId: Number,
  zhihuCookie: String
})

const Zhihu = mongoose.model('Zhihu', zhihuSchema);

module.exports = Zhihu;
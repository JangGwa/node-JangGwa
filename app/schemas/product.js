/**
 * Created by zkw on 2017/1/7.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
  msg: {
    unique: true,
    type: String
  },
  jiagongbz: String,
  jiagongsl: Number,
  daojuxh: String,
  plan: Number,
})

ProductSchema.pre('save',function(next){
  next();
})

ProductSchema.statics = {
  fetch:function(cb){
    return this
        .find({})
        .exec(cb)
  },
  findById:function(id,cb){
    return this
        .findOne({_id:id})
        .exec(cb)
  }
}

module.exports = ProductSchema;
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//作为字段的类型，也为了关联文档的查询
var ObjectId = Schema.Types.ObjectId;
var LineSchema = new Schema({
    productMsg: String,
    desc: String,
    number: Number,
    xinhao: String,
})

LineSchema.pre('save',function(next){
    next();
})

LineSchema.statics = {
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

module.exports = LineSchema;

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
  name: String, //用户姓名
  mobile: String,//手机号
  idNumber:String,//身份证号
  createdAt: Number,
  updatedAt: Number
})
module.exports = User
var mongoose = require('mongoose')
var Schema = mongoose.Schema

//房屋分类
var HouseCategory = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = HouseCategory
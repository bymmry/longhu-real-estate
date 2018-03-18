var mongoose = require('mongoose')
var Schema = mongoose.Schema

//归集点
var SetPoint = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = SetPoint
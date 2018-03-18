var mongoose = require('mongoose')
var Schema = mongoose.Schema

//户型
var HousesType = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = HousesType
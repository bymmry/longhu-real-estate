var mongoose = require('mongoose')
var Schema = mongoose.Schema

//房屋性质
var HousesType = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = HousesType
var mongoose = require('mongoose')
var Schema = mongoose.Schema

//房屋用途
var HouseUse = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = HouseUse
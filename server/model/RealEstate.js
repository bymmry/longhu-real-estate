var mongoose = require('mongoose')
var Schema = mongoose.Schema

//地产开发商
var RealEstate = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = RealEstate
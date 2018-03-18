var mongoose = require('mongoose')
var Schema = mongoose.Schema

//物业公司
var PropertyManagment = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = PropertyManagment
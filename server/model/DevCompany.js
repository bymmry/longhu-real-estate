var mongoose = require('mongoose')
var Schema = mongoose.Schema

//开发公司
var DevCompany = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = DevCompany
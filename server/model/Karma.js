var mongoose = require('mongoose')
var Schema = mongoose.Schema

//业委会
var Karma = new Schema({
  name: String, //名称
  createdAt: Number,
  updatedAt: Number
})
module.exports = Karma
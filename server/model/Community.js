var mongoose = require('mongoose')
var Schema = mongoose.Schema

//小区
var Community = new Schema({
  number: String, //编号
  name: String, //名称
  address:String,//地址
  area:String,//区域
  buildingCount:Number,//楼宇数
  officeRoom:String,//物管办公用房
  officeRoomSquare:Number,//物管办公用房面积
  businessRoom:String,//物管经营用房
  businessRoomSquare:Number,//物管经营用房面积
  publicRoom:String,//公建用房
  publicRoomSquare:Number,//公建用房面积
  createdAt: Number,//创建时间
  updatedAt: Number,//创建时间
  setPoint:{
    type: Schema.Types.ObjectId,
    ref: 'SetPoint'
  },//归集点
  propertyManagment:{
    type: Schema.Types.ObjectId,
    ref: 'PropertyManagment'
  },//物业公司
  realEstate:{
    type: Schema.Types.ObjectId,
    ref: 'RealEstate'
  }//地产开发商
})
module.exports = Community
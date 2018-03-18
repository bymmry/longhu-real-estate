var mongoose = require('mongoose')
var Schema = mongoose.Schema

//楼宇
var Building = new Schema({
  number:String,//楼号
  name: String, //名称
  address:String,//地址
  square:Number,//面积
  storeyCount:Number,//层数
  unitCount:Number,//单元数
  completedAt:String,//竣工日期
  serviceLife:Number,//使用年限
  hasElevator:Boolean,//是否有电梯
  totalCost:Number,//总造价
  preUnitPrice:Number,//拟定单价
  propertyRegistry:String,//产籍号
  propertyRightsSystemNumber:String,//产权系统中的楼宇编号
  createdAt: Number,
  updatedAt: Number,
  houseCategory:{
    type: Schema.Types.ObjectId,
    ref: 'HouseCategory'
  },//房屋类型
  houseNature:{
    type: Schema.Types.ObjectId,
    ref: 'HouseNature'
  },//房屋性质
  community:{
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },//小区
  karma:{
    type: Schema.Types.ObjectId,
    ref: 'Karma'
  },//业委会
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
  },//地产开发商
  devCompany:{
    type: Schema.Types.ObjectId,
    ref: 'DevCompany'
  }//开发公司
})
module.exports = Building
var mongoose = require('mongoose')
var Schema = mongoose.Schema

//房屋
var House = new Schema({
  name: String, //名称
  unit:Number,//单元
  storeyNumber:Number,//层号
  serialNumber:Number,//串号
  roomNumber:Number,//房号
  buildSquare:Number,//建筑面积
  useSquare:Number,//使用面积
  publicSquare:Number,//公摊面积
  unitPrice:Number,//单价
  totalPrice:Number,//总价
  propertyOwner:String,//产权人
  propertyApartment:String,//产权单位
  propertyNumber:String,//产权编号
  idNumber:String,//身份证号
  contactNumber:String,//联系号码
  buyAt:String,//购房日期
  earlyYearPrincipal:Number,//年初本金
  earlyYearInterest:Number,//年初利息
  yearAccrual:Number,//本年发生额
  userFirstPrincipal:Number,//业主首次本金
  apartmentFirstPrincipal:Number,//单位首次本金
  drawInterest:Number,//支取利息
  availablePrincipal:Number,//可用本金
  availableInterest:Number,//可用利息
  yearInterest:Number,//本年利息
  state:String,//房屋状态
  needPrintNotice:Boolean,//是否打印通知书
  payStandardNumber:String,//缴存标准编码
  userPayStandard:String,//个人缴存标准
  apartmentPayStandard:String,//单位缴存标准
  firstNeedPayment:Number,//首次应缴金额
  totalNeedPayment:Number,//当前应缴金额
  userNeedPayment:Number,//个人应缴金额
  contractNumber:String,//合同号
  totalPayPrincipal:Number,//累计缴纳本金
  totalInterest:Number,//累计利息
  recentlyInteres:Number,//最近利息
  userApartmentPayRatio:String,//个人单位缴存比
  realEstate:{
    type: Schema.Types.ObjectId,
    ref: 'RealEstate'
  },//地产开发商
  community:{
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },//小区
  building:{
    type: Schema.Types.ObjectId,
    ref: 'Building'
  },//楼宇
  houseUse:{
    type: Schema.Types.ObjectId,
    ref: 'HouseUse'
  },//房屋用途
  houseType:{
    type: Schema.Types.ObjectId,
    ref: 'HouseType'
  },//户型
  houseNature:{
    type: Schema.Types.ObjectId,
    ref: 'HouseNature'
  },//房屋性质
  houseCategory:{
    type: Schema.Types.ObjectId,
    ref: 'HouseCategory'
  },//房屋类型
  createdAt: Number,
  updatedAt: Number,
})
module.exports = House
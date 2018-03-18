const router = require('koa-router')()

const Test = require('./controller/Test') //测试模块
const Quick = require('./controller/Quick')//快速查询模块
const Community = require('./controller/Community')//小区模块
const Building = require('./controller/Building')//楼宇模块
const House = require('./controller/House')//房屋模块
const NotFound = require('./controller/NotFound') //404模块

router
  //测试
  .get('/hello', Test.hello)
  .get('/log', Test.log)
  //快速查询模块
  .get('/quick/realEstate',Quick.getRealEstate)
  .get('/quick/community',Quick.getCommunity)
  .get('/quick/setPoint',Quick.getSetPoint)
  .get('/quick/propertyManagment',Quick.getPropertyManagment)
  .get('/quick/houseCategory',Quick.getHouseCategory)
  .get('/quick/houseNature',Quick.getHouseNature)
  .get('/quick/houseUse',Quick.getHouseUse)
  .get('/quick/houseType',Quick.getHouseType)
  .get('/quick/karma',Quick.getKarma)
  .get('/quick/devCompany',Quick.getDevCompany)
  
  //小区模块
  .get('/community',Community.get)
  .post('/community',Community.add)
  //楼宇模块
  .get('/building',Building.get)
  .post('/building',Building.add)
  //房屋模块
  .get('/house',House.get)
  .get('/house/group',House.getByGroup)
  .post('/house',House.add)
  
  //未指定
  .all('*', NotFound.notFound) // 404

module.exports = router
const jwt = require('../service/jsonwebtoken')
const axios = require('axios')

class UserController {
  static async login(ctx) {
    let token = await jwt.create({
      name:'test'
    })
    ctx.body = token
  }
  static async getUsers(ctx){
    ctx.msg = '获取所有用户'
    let res = await axios.get(`http://www.xjsy56.com/base/waterSiteLevel/searchWaterSite`)
    console.log(res);
    ctx.body = res
  }
}
module.exports = UserController

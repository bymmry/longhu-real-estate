const config = require('../config')
const timeUtil = require('../util/time')

class UserService {
  static async createUserFromWx(ctx,info) {
    let userData = {
      wx:info
    }
    if (info.parentOpenid) {
      let parent = await ctx.db.User.findOne({
        'wx.openid':info.parentOpenid
      })
      if (parent) {
        userData.parent = parent.id
      }
    }
    let userModel = new ctx.db.User(userData)
    await userModel.save()
    return await ctx.db.User.findById(userModel._id)
  }
}

module.exports = UserService
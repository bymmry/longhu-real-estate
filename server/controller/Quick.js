const dbUtil = require('../util/db')
const timeUtil = require('../util/time')
class QuickController {
  static async getRealEstate(ctx){
    let data = await ctx.db.RealEstate.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getCommunity(ctx){
    let data = await ctx.db.Community.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getSetPoint(ctx){
    let data = await ctx.db.SetPoint.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getPropertyManagment(ctx){
    let data = await ctx.db.PropertyManagment.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getHouseCategory(ctx){
    let data = await ctx.db.HouseCategory.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getHouseNature(ctx){
    let data = await ctx.db.HouseNature.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getHouseType(ctx){
    let data = await ctx.db.HouseType.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getHouseUse(ctx){
    let data = await ctx.db.HouseUse.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getKarma(ctx){
    let data = await ctx.db.Karma.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
  static async getDevCompany(ctx){
    let data = await ctx.db.DevCompany.find().sort({
      createdAt: -1
    })
    ctx.body = data
  }
} 
module.exports = QuickController


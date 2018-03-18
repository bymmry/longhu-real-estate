const dbUtil = require('../util/db')
const timeUtil = require('../util/time')
const populate = [{
  path: 'setPoint'
}, {
  path: 'propertyManagment'
}, {
  path: 'realEstate'
}]
class CommunityController {
  static async get(ctx) {
    let req = ctx.request.query
    let limit = Number(req.limit) || 10
    let skip = Number(req.skip) || 0
    let res = []
    let realEstate = await ctx.db.RealEstate.find().sort({
      createdAt: -1
    }).limit(limit).skip(skip)
    for (let i = 0; i < realEstate.length; i++) {
      let resItem = await ctx.db.Community.find({
        realEstate: realEstate[i]._id
      }).populate(populate).sort({
        createdAt: -1
      })
      res.push(resItem)
    }
    ctx.body = res
  }

  static async add(ctx) {
    let req = ctx.request.body
    if (!req.name) {
      throw [4002, '小区名必填']
    }
    let hasCommunity = await ctx.db.Community.findOne({
      name: req.name
    })
    if (hasCommunity) {
      throw [4002, '小区名称已经存在']
    }
    let option = { ...req
    }
    if (req.setPointName) {
      option.setPoint = await dbUtil.getIdByName(req.setPointName, ctx.db.SetPoint)
    } else {
      throw [4001, '归集点名称必填']
    }
    if (req.propertyManagmentName) {
      option.propertyManagment = await dbUtil.getIdByName(req.propertyManagmentName, ctx.db.PropertyManagment)
    } else {
      throw [4001, '物业公司必填']
    }
    if (req.realEstateName) {
      option.realEstate = await dbUtil.getIdByName(req.realEstateName, ctx.db.RealEstate)
    } else {
      option.realEstate = await dbUtil.getIdByName('龙湖地产', ctx.db.RealEstate)
    }
    option.createdAt = timeUtil.getTimestamp()
    let communityModel = new ctx.db.Community(option)
    await communityModel.save()
    ctx.body = await ctx.db.Community.findById(communityModel._id)
  }
}
module.exports = CommunityController
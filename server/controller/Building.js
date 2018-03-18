const dbUtil = require('../util/db')
const populate = [{
  path: 'houseCategory'
}, {
  path: 'houseNature'
}, {
  path: 'community'
}, {
  path: 'karma'
}, {
  path: 'setPoint'
}, {
  path: 'propertyManagment'
}, {
  path: 'realEstate'
}, {
  path: 'devCompany'
}]
class BuildingController {
  static async get(ctx) {
    let req = ctx.request.query
    let limit = Number(req.limit) || 10
    let skip = Number(req.skip) || 0
    let res = []
    let realEstate = await ctx.db.RealEstate.find().sort({
      createdAt: -1
    }).limit(limit).skip(skip)
    let communityList = []
    for (let i = 0; i < realEstate.length; i++) {
      let community = await ctx.db.Community.find({
        realEstate: realEstate[i]._id
      }).sort({
        createdAt: -1
      })
      for (let j = 0; j < community.length; j++) {
        communityList.push(community[j]._id)
      }
    }
    for (let i = 0; i < communityList.length; i++) {
      let resItem = await ctx.db.Building.find({
        community: communityList[i]
      }).sort({
        createdAt: -1
      }).populate(populate)
      res.push(resItem)
    }
    ctx.body = res
  }
  static async add(ctx) {
    let req = ctx.request.body
    let option = { ...req
    }
    if (!req.name) {
      throw [4002, '楼宇名必填']
    }
    if (req.communityName) {
      option.community = await dbUtil.getIdByName(req.communityName, ctx.db.Community)
    } else {
      throw [4001, '小区必填']
    }
    let hasBuilding = await ctx.db.Building.findOne({
      name: req.name,
      community: option.community
    })
    if (hasBuilding) {
      throw [4002, req.communityName + '已经存在' + hasBuilding.name + '楼宇']
    }
    if (req.karmaName) {
      option.karma = await dbUtil.getIdByName(req.karmaName, ctx.db.Karma)
    } else {
      throw [4001, '业务委员会必填']
    }
    if (req.setPointName) {
      option.setPoint = await dbUtil.getIdByName(req.setPointName, ctx.db.SetPoint)
    } else {
      throw [4001, '归集点必填']
    }
    if (req.propertyManagmentName) {
      option.propertyManagment = await dbUtil.getIdByName(req.propertyManagmentName, ctx.db.PropertyManagment)
    } else {
      throw [4001, '物业公司必填']
    }
    if (req.devCompanyName) {
      option.devCompany = await dbUtil.getIdByName(req.devCompanyName, ctx.db.DevCompany)
    } else {
      throw [4001, '开发公司必填']
    }
    if (req.houseCategoryName) {
      option.houseCategory = await dbUtil.getIdByName(req.houseCategoryName, ctx.db.HouseCategory)
    } else {
      throw [4001, '房屋类型必填']
    }
    if (req.houseNatureName) {
      option.houseNature = await dbUtil.getIdByName(req.houseNatureName, ctx.db.HouseNature)
    } else {
      throw [4001, '房屋性质必填']
    }
    if (req.realEstateName) {
      option.realEstate = await dbUtil.getIdByName(req.realEstateName, ctx.db.RealEstate)
    } else {
      option.realEstate = await dbUtil.getIdByName('龙湖地产', ctx.db.RealEstate)
    }
    let buildingModel = new ctx.db.Building(option)
    await buildingModel.save()
    ctx.body = await ctx.db.Building.findById(buildingModel._id)
  }
}
module.exports = BuildingController
const dbUtil = require('../util/db')

const populate = [{
  path: 'houseUse'
}, {
  path: 'houseType'
}, {
  path: 'houseNature'
}, {
  path: 'houseCategory'
}, {
  path: 'realEstate'
}, {
  path: 'community'
}, {
  path: 'building'
}]
class HouseController {
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
      let resItem = await ctx.db.House.find({
        community: communityList[i]
      }).sort({
        createdAt: -1
      }).populate(populate)
      res.push(resItem)
    }
    ctx.body = res
  }
  static async getByGroup(ctx) {
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
    if (req.by === 'community') {
      for (let i = 0; i < communityList.length; i++) {
        let resItem = await ctx.db.House.find({
          community: communityList[i]
        }).sort({
          createdAt: -1
        }).populate(populate)
        res.push(resItem)
      }
    } else {
      let buildingList = []
      for (let i = 0; i < communityList.length; i++) {
        let building = await ctx.db.Building.find({
          community: communityList[i]
        }).sort({
          createdAt: -1
        })
        for (let j = 0; j < building.length; j++) {
          buildingList.push(building[j]._id)
        }
      }
      for (let i = 0; i < buildingList.length; i++) {
        let resItem = await ctx.db.House.find({
          building: buildingList[i]
        }).sort({
          createdAt: -1
        }).populate(populate)
        res.push(resItem)
      }
    }

    ctx.body = res
  }
  static async add(ctx) {
    let req = ctx.request.body
    let option = { ...req
    }
    if (req.roomNumber === undefined) {
      throw [4001, '房号必填']
    } else {
      if (req.roomNumber <= 0) {
        throw [4001, '房号必须大于0']
      }
    }
    if (req.realEstateName) {
      option.realEstate = await dbUtil.getIdByName(req.realEstateName, ctx.db.RealEstate)
    } else {
      option.realEstate = await dbUtil.getIdByName('龙湖地产', ctx.db.RealEstate)
    }
    if (req.communityName) {
      option.community = await dbUtil.getIdByName(req.communityName, ctx.db.Community)
      await ctx.db.Community.update({
        _id: option.community
      }, {
        realEstate: option.realEstate
      })
    } else {
      throw [4001, '小区必填']
    }
    if (req.buildingName) {
      option.building = await dbUtil.getIdByName(req.buildingName, ctx.db.Building)
      await ctx.db.Building.update({
        _id: option.building
      }, {
        realEstate: option.realEstate,
        community: option.community
      })
    } else {
      throw [4001, '楼宇必填']
    }
    let hasHouse = await ctx.db.House.findOne({
      roomNumber: req.roomNumber,
      community: option.community,
      building: option.building
    })
    if (hasHouse) {
      throw [4002, req.communityName + '的' + req.buildingName + '已经存在房号为' + req.roomNumber + '的房屋']
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
    if (req.houseTypeName) {
      option.houseType = await dbUtil.getIdByName(req.houseTypeName, ctx.db.HouseType)
    } else {
      throw [4001, '户型必填']
    }
    if (req.houseUseName) {
      option.houseUse = await dbUtil.getIdByName(req.houseUseName, ctx.db.HouseUse)
    } else {
      throw [4001, '房屋用途必填']
    }

    let houseModel = new ctx.db.House(option)
    await houseModel.save()
    ctx.body = await ctx.db.House.findById(houseModel._id)
  }
}
module.exports = HouseController
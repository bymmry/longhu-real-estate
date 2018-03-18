const config = require('../config')
const timeUtil = require('../util/time')
const schedule = require('node-schedule')

class WxService {
  static async startTask(db) {
    var j = schedule.scheduleJob('0 * * * * *', async() =>{
      await this.getWaterRegimeFromXjsy56(db)
    })
  }
}

module.exports = WxService
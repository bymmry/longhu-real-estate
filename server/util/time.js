class TimeUtil {
  static getTimestamp(str) {
    if (str) {
      return Number((new Date(str).getTime()/1000).toFixed(0))
    }else{
      return Number((new Date().getTime()/1000).toFixed(0))
    }
  }
}
module.exports = TimeUtil
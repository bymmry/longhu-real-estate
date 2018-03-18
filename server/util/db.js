class dbUtil {
  static async getIdByName(name,db) {
    if (name == '' || name === '' || name == ' ') {
      throw [4001,'名称不能为空']
    }
    let hasData = await db.findOne({
      name:name
    })
    if (hasData) {
      return hasData._id
    }else{
      let model = new db({
        name:name
      })
      await model.save()
      return model._id
    }
  }
}
module.exports = dbUtil
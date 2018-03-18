const jwt = require('../service/jsonwebtoken')

module.exports = function (filter=['/']) {
  return async function (ctx, next) {
    let need_auth = true
    filter.forEach(item => {
      if (ctx.url.indexOf(item)>-1) {
        need_auth = false
      }
    })
    if (need_auth) {
      let token = ctx.request.header.zyToken
      let user = await jwt.check(token)
      ctx.user = user
    }
    await next()
  }
}
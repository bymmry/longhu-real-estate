module.exports = function (filter=['/wx']) {
  return async function (ctx, next) {
    await next()
    let need_check = true
    if (ctx.responseType === 'file' || ctx.response.type === 'html' || ctx.response.type === 'text/html') {
      need_check = false
    }
    filter.forEach(item => {
      if (ctx.url.indexOf(item)>-1) {
        need_check = false
      }
    })
    if (need_check) {
      let res = {
        code: ctx.code || 200,
        data: 'ok'
      }
      if ( ctx.body != undefined) {
        res.data = ctx.body
      }
      if (ctx.msg) {
        res.msg = ctx.msg
      }
      ctx.body = res
    }
    
  }
}
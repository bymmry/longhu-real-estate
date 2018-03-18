const err_list = {
  400: '权限错误',
  500: '服务器处理错误'
}
module.exports = function () {
  return async function (ctx, next) {
    try {
      await next()
    } catch (error) {
      let err_log = `user：${ctx.user?ctx.user.mobile:'not login'}---method：${ctx.method}---ip：${ctx.ip}---error：${error}`,
        err_code = 500,
        err_msg = ''
      if (!isNaN(error)) {
        err_code = error || 500
        err_msg = err_list[err_code] || '未知错误'
      } else {
        if (error instanceof Array) {
          err_code = error[0]
          err_msg = error[1] || err_list[err_code]
        } else {
          err_msg = error.toString()
          throw error
        }
      }
      ctx.body = {
        code: err_code,
        errMsg: err_msg
      }
    }
  }
}
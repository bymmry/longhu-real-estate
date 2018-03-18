module.exports = function () {
  return async function (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    if (ctx.method && ctx.url) {
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    }
  }
}
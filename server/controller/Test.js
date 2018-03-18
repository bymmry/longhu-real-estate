class TestController {
  static async hello(ctx) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello world!')
      }, 1000)
    })
    ctx.body = await promise
  }
  static async log(ctx) {
    ctx.body = 'log'
  }
}
module.exports = TestController
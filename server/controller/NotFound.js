const fs = require('fs')
const path = require('path')

class NotFoundController {
  static async notFound(ctx) {
    const html = fs.readFileSync(path.resolve(__dirname, '../../web/dist/index.html'), 'utf-8')
    ctx.body = html
  }
}
module.exports = NotFoundController
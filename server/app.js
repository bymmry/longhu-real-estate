const config = require('./config')

const path = require('path')
const fs = require('fs')

const koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')

const static = require('koa-static')
const router = require('./router')

const mongoose = require('mongoose')
const models = require('./model')

const timedTask = require('./service/timedTask')

const app = new koa()



mongoose.Promise = global.Promise
const mongoUrl = `mongodb://${config.mongodb.user}:${config.mongodb.psw}@${config.mongodb.url}`
let promise = mongoose.connect(mongoUrl, {
  useMongoClient: true
})
promise.then((val) => {
  //声明待添加的model对象
  let Model = {}
  for (const name in models) {
    let schema = models[name]
    Model[name] = mongoose.model(name, schema)
  }
  console.log('mongodb connect success')
  app.context.db = Model
  app.context.config = config
  //开启跨域
  app.use(cors())

  //解析不同类型请求参数
  app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
  }))


  //静态资源
  app.use(require('koa-static')(path.resolve(__dirname, '../web/dist')))

  //程序日志
  app.use(require('./middleware/log')())

  //错误处理
  app.use(require('./middleware/ErrorCatch')())

  //格式化返回值
  app.use(require('./middleware/FormatResponse')())

  //用户token认证
  app.use(require('./middleware/Auth')())

  //路由
  app.use(router.routes(), router.allowedMethods())

  app.listen(config.port, () => {
    console.log(`the server is start at port ${config.port}`)
    //定时任务
    // timedTask.startTask(Model)
  })

  //开启https
  if (process.env.NODE_ENV !== 'dev' && config.https) {
    const https = require('https')

    const options = {
      key: fs.readFileSync('./ssl/adehv.cn.key'),
      cert: fs.readFileSync('./ssl/adehv.cn.crt')
    }

    https.createServer(options, app.callback()).listen(443)
  }
})
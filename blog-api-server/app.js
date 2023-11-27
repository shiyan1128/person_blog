// 引入koa
const koa = require('koa')


// 引入解析xxx-formdata的中间件
const bodyParser = require('koa-bodyparser')
// 引入路由
const userRouter = require('./router/user.router')
const imagesRouter = require('./router/images.router')
const userlogin = require('./router/userlogin.router')
const { SERVER_POST } = require('./config')
// 引入接收formData的插件
const { koaBody } = require('koa-body')

// 创建一个koa实例
const app = new koa()

// 生成静态服务
const koaStatic = require("koa-static")
const path = require("path")


// 注意的是通常静态服务都是在最前面
app.use(koaStatic(path.join(__dirname, "/images")));

// 使用第三方中间件
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(imagesRouter.routes())
app.use(imagesRouter.allowedMethods())
app.use(userlogin.routes())
app.use(userlogin.allowedMethods())

// 使用接收formData的插件
app.use(
  koaBody({
    enableType: ["json","form","text"],
    multipart: true
  })
)

// 创建一个监听事件
app.listen(SERVER_POST,() => {
  console.log("服务已经开启在http://127.0.0.1:8000")
})
const koaRouter = require("@koa/router")
// 设置路由的前缀
const userRouter = koaRouter()
// 处理数据的逻辑
const userloginControll = require('../routerHandle/userlogin.control')
userRouter.post("/register",userloginControll.createUser)
userRouter.post('/login',userloginControll.userLogin)

module.exports = userRouter
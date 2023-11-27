const koaRouter = require("@koa/router")
// 设置路由的前缀
const userRouter = koaRouter({ prefix: '/user' })
// 处理数据的逻辑
const userController = require('../routerHandle/user.control')
// 引入背景图片文件的中间件
const { handleFile } = require("../middleware/file.middleware")
// 存储用户发送过来的数据
try {
  userRouter.post("/insertNewArticle",handleFile,userController.insertNewArticle)
}catch(err){
  console.log(err);
}
// 仅更新文章内容和标题
userRouter.post('/updateContent',userController.updateArticleContent)
userRouter.post("/content",userController.create)
userRouter.post("/searchContentUid",userController.searchByUserId)
userRouter.post("/searchContentArtid",userController.searchByArtId)

module.exports = userRouter
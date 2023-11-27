const koaRouter = require("@koa/router")
// const { default: koaBody } = require("koa-body")
// 设置路由的前缀
const imagesRouter = koaRouter()
const path = require('path')
// 导入SQL板块
const imagesService = require('../server/images.service')
// 引入背景图片文件的中间件
const { handleFile } = require("../middleware/file.middleware")
try {
  imagesRouter.post("/upload",handleFile, async (ctx) => {
    // console.log(ctx);
    const file = ctx.request.file
    const basename = path.basename(file.filename)
    const id = ctx.request.body.art_id
    const result = await imagesService.saveImages('/api/'+basename, id)
    console.log(ctx.request.body.art_id)
    if(basename) {
      ctx.body = {
        statu: 200,
        msg: `图片上传成功`,
        path: `/${basename}`
      }
    }else {
      ctx.body = {
        statu: 201,
        msg: '图片上传失败'
      }
    }
    
  })
}catch(err) {
  console.log("233",err)
}

module.exports = imagesRouter
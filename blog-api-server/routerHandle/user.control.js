const userService = require('../server/user.service')
const path = require('path')
class userControll {
  // 仅插入文章标题和内容，不设置背景图
  async create(ctx, next) {
    // 拿到用户传递过来的数据进行展示
    const body = ctx.request.body
    console.log(body)
    const result = await userService.saveContent(body.content,body.title)
    if(result.affectedRows !== 1) {
      ctx.body = {
        statu: 201,
        msg: "文章添加失败"
      }
    }else{
      // const result2 = await userService.searchContentByArtId(body.art_id)
      ctx.body = {
        statu: 200,
        msg: "文章添加成功",
      }
    }
  }
  // 根据userid查询到user下所有的文章
  async searchByUserId(ctx,next) {
    const body = ctx.request.body
    // console.log(body);
    const res = await userService.searchContentByUserId(body.user_id)
    console.log(res)
    ctx.body = {
      statu:200,
      msg: '查询成功',
      data: res
    }
  }
  // 根据文章id查询
  async searchByArtId(ctx,next) {
    const body = ctx.request.body
    const res = await userService.searchContentByArtId(body.art_id)
    // console.log();
    ctx.body = {
      statu: 200,
      msg: '查询成功',
      data:res[0]
    }
  }
  // 增加新的文章和背景图
  async insertNewArticle (ctx, next) {
      const file = ctx.request.file
      const basename = path.basename(file.filename)
      console.log(basename);
      const body = ctx.request.body
      const res = await userService.insertArticleAndPicture(body.userId, body.articleTitle, body.articleContent, '/api/'+basename)
      if(res.affectedRows !== 1) {
        ctx.body = {
          statu: 201,
          msg: '文章插入失败'
        }
      } else {
        ctx.body = {
          statu: 201,
          msg: '文章插入成功'
        }
      }
      console.log(res)
  }

  // 仅更新文章内容和标题
  async updateArticleContent (ctx, next) {
    const body = ctx.request.body
    console.log(body)
    const res =  await userService.updateContent( parseInt(body.articleId),body.articleTitle,body.articleContent)
    if (res.affectedRows !== 1) {
      ctx.body = {
        statu: 201,
        msg: '更新失败'
      }
    }else {
      ctx.body = {
        statu: 200,
        msg: '更新成功'
      }
    }
  }
}

module.exports = new userControll()
// 导入数据库的实例
const db = require('../db/index')
class userService {
  async saveContent(content,title) {
    // 拼接sql语句
    const sql = "insert into article (article_content,article_title,user_id) values(?,?,1)"
    const [result] = await db.execute(sql,[content,title])
    return result
  }
  // 仅更新文章内容和标题
  async updateContent(articleId,articleTitle,articleContent) {
    const sql = "update article set article_content = ?, article_title = ? where article_id = ?"
    const [result] = await db.execute(sql, [articleContent,articleTitle,articleId])
    return result
  }
  // 根据文章id查询文章内容和标题
  async searchContentByArtId(art_id) {
    const sql = "select article_content as content ,article_title as title from article where article_id=?"
    const [result] = await db.execute(sql,[art_id])
    return result
  }
  // 根据userid查询某个user发布的所有文章的内容，标题和背景图片
  async searchContentByUserId(user_id) {
    const sql = "select article_content as content, article_title as title, article_id as id, article_picture as picture,create_time as time from article where user_id=?"
    const [result] = await db.execute(sql,[user_id])
    return result
  }
  // 插入文章和背景图片
  async insertArticleAndPicture (userId, articleTitle, articleContent, picture) {
    const sql = "insert into article (user_id, article_title, article_content, article_picture) values(?,?,?,?)"
    const [result] = await db.execute(sql,[userId, articleTitle, articleContent, picture])
    return result
  }
}

module.exports = new userService()
// 导入数据库的实例
const db = require('../db/index')
// 图片单独存储和查询板块
class imagesService {
  // 存入数据库
  async saveImages(picture,artId) {
    console.log(picture);
    console.log(artId);
    // sql语句
    const sql = "update article set article_picture = ? where article_id = ?"
    const [result] = await db.execute(sql,[picture,artId])
    return result
  }
  // 根据文章id查询对应背景图片
  async getImageByArtId(artId) {
    const sql = "select article_picture as picture from article where article_id = ?"
    const [result] = await db.execute(sql,[artId])
    return result
  }
}
module.exports = new imagesService()
// 登录模块
const db = require('../db/index')
class userlogin {
  // 注册账号
  async createUser(number,password,name){
    const sql = 'insert into user (user_name, user_number,user_password) values(?,?,?)'
    const [result] = await db.execute(sql, [name,number,password])
    return result
  }
  // 登录，根据账号（number）查询有无，返回密码，名字，id，user_state
  async userLogin(userNumber){
    const sql = 'select user_id as userId, user_name as userName, user_password as userPassword, user_state as userState from user where user_number = ?'
    const [result] = await db.execute(sql, [userNumber])
    return result
  }

}

module.exports = new userlogin()
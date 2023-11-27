// 用户登录注册模块
const userloginService = require('../server/userlogin.service')
class userloginControll {
  async createUser(ctx,next){
    const body = ctx.request.body
    console.log(body)
    const res = await userloginService.createUser(body.number,body.password,body.name)
    if(res.affectedRows !== 1) {
      ctx.body = {
        statu: 201,
        msg: '注册失败'
      }
    }else {
      ctx.body = {
        statu: 200,
        msg: '注册成功'
      }
    }
  }
  async userLogin (ctx,next) {
    const body = ctx.request.body
    const res = await userloginService.userLogin(body.number)
    if(!res.length){
      ctx.body = {
        statu: 201,
        msg: "您还未注册,请先前往注册"
      }
    }else{
      if(body.password == res[0].userPassword) {
        ctx.body = {
          statu: 200,
          msg: "登录成功"
        }
      }else {
        ctx.body = {
          statu: 201,
          msg: "密码错误"
        }
      }
    }
  }
}

module.exports = new userloginControll()
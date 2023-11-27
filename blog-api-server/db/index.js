const mysql = require('mysql2')
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'personal_blog'
})
// 创建一个可以进行异步操作的mysql对象
const connection = connectionPool.promise()
module.exports = connection
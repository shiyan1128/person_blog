/* 引入解析图片的中间件 */
const multer = require('@koa/multer')
/* 引入node的内置方法 */
const path = require('path')
/* 自定义图片的存储路径和存储名称 */
const uploadFile = multer.diskStorage({
  /* 配置文件的存储路径,cb是回调函数,第一个参数是错误提示好像是,第二个就是设置图片的存储路径 */
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'../images'))
  },
  /* 图片存储到本地的保存名称,cb回调函数,第一个参数默认都是设置的null,第二个参数设置的就是你要搞的那个图片名称,path.extname()方法是用来那去文件名后缀的,file就是用户传递过来的图片的各项信息都存储在里面,里面包括图片的大小,路径,类型等,originalname就是传递过来的图片名称包括后缀 */
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
/* 把刚才自定义配置的那些内容设置到中间件身上,生成一个以该配置为主的multer中间件 */
const upload = multer({ storage: uploadFile })
/* 这个是限制用户传递过来的formData的属性名的,如果不是bgcImage属性名,name则不会进入到下一个中间件的使用,会在这个地方被拦截,并且抛出错误 */
const handleFile = upload.single("bgcImage")
module.exports = {
  handleFile
}
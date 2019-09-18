const Koa = require('koa');
const koaBody = require('koa-body')
const cors = require('koa-cors');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default.js');
const routers = require('./router.js')
const logs = require('./config/logConf.js')

const koaStatic = require('koa-static')
const path = require('path')
const app = new Koa()

// session存储配置
const sessionMysqlConfig = {
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	host: config.database.HOST,
}
// 配置session中间件
app.use(session({
	key: 'USER_SID',
	store: new MysqlStore(sessionMysqlConfig)
}))
// koa-body 中间插件 文件提交及form-data
app.use(koaBody({
	formLimit: '1mb',
	multipart: true, // 允许上传多个文件
	formidable: {
		maxFileSize: config.upload.MAXFILESIZE, //上传文件大小
		keepExtensions: true, //  保存图片的扩展名
	}
}))
app.use(cors()) // 跨域插件
// 配置静态资源加载中间件
app.use(koaStatic(
	path.join(config.upload.UPLOAD)
))
app.use(logs.httpHead()) //  路由 httpHead
app.use(routers()) //  路由
app.listen(config.port)
console.log(`listening on port ${config.port}`)

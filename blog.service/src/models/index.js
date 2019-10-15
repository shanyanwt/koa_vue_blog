/* 
 * 自动生成实体类 
 * $ node auto.js
 * 使用方法
 * const Article = require('../models').Article
 *  Article.create({})
 *		.then(su => {})
 *		.catch(ex => {})
 * 
 */
var Sequelize = require('sequelize');
var config = require('../config/default.js')
var email = require('../utils/email.js')
var logs = require('../config/logConf.js')
var LogFile = logs.logFile('sequelize-mysql');
LogFile.info("sequelize-log_start start!");
// 创建数据库连接	
var sequelize = new Sequelize(config.database.DATABASE, config.database.USERNAME, config.database.PASSWORD, {
	host: config.database.HOST,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define: {
		timestamps: false //关闭时间戳
	}
})
//测试连接mysql,失败自动发送邮箱通知
sequelize.authenticate().then(() => {
	LogFile.info("sequelize-log_start start!");
}).catch(err => {
	LogFile.error("Unable to connect to the database:", JSON.stringify(err));
	email.sendEmail('shanyanwt@163.com', 'Mysql-error', "shanyanwt@163.com",
		'Mysql 连接失败', '<p>错误信息: </p>' + JSON.stringify(err) + '<p>请你及时处理</p >'
	).then(() => {
		LogFile.info("mysql错误邮箱提示发送成功！");
	}).catch(er => {
		LogFile.error("mysql错误邮箱提示发送失败！", er);
	})
});
// 数据模型输出名称及路径
module.exports = {
	db: sequelize,
	Admin: require('./skd_admin.js')(sequelize, Sequelize),
	Article: require('./skd_article.js')(sequelize, Sequelize),
	Role: require('./skd_role.js')(sequelize, Sequelize),
	Star: require('./skd_star.js')(sequelize, Sequelize),
	MysqlSessionStore: require('./_mysql_session_store.js')(sequelize, Sequelize),
}

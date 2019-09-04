
		var  Sequelize = require('sequelize');
		var config = require('../config/default.js')
		var logs = require('../config/logConf.js')
		var LogFile = logs.logFile('sequelize-mysql');
		LogFile.info("sequelize-log_start start!");
		// 创建数据库连接	
		var sequelize = new Sequelize( config.database.DATABASE,  config.database.USERNAME,  config.database.PASSWORD, {
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
		// 数据模型输出名称及路径
		module.exports = {
			Admin:require('./skd_admin.js')(sequelize, Sequelize),Article:require('./skd_article.js')(sequelize, Sequelize),Role:require('./skd_role.js')(sequelize, Sequelize),MysqlSessionStore:require('./_mysql_session_store.js')(sequelize, Sequelize),
		}
	
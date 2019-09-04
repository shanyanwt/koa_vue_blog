/**
 * 
 *创建实体类模板index 
 *$ node createModelsExport.js
 *使用方法
 * const Article = require('../models').Article
 *  Article.create({})
 *		.then(su => {})
 *		.catch(ex => {})
 * */

let fs = require('fs')
let files = fs.readdirSync('../src/models')
let models = ``
// 解析名称做成驼峰命名法
files.forEach(item => {
	if (item != 'index.js') {
		let names = item.split('.')[0].split('_')
		let name = ''
		for (let i = 1; i < names.length; i++) {
			name += names[i].substring(0, 1).toUpperCase() + names[i].substring(1)
		}
		models += `${name}:require('./${item}')(sequelize, Sequelize),`
	}
})
// 文件内容模板
const template =
	`
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
			${models }
		}
	`
fs.writeFile("../src/models/index.js", template, function() {
	console.log('数据模型创建成功')
})

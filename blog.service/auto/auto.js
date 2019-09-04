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
var fs = require('fs');
var SequelizeAuto = require('sequelize-auto')
var config = require('../src/config/default.js')
var modelsPath = '../src/models'
var deleteFolder = function(path) {
	return new Promise((resolve, reject) => {
		var files = [];
		if (fs.existsSync(path)) {
			files = fs.readdirSync(path);
			files.forEach(function(file, index) {
				var curPath = path + "/" + file;
				if (fs.statSync(curPath).isDirectory()) { // recurse
					deleteFolder(curPath);
				} else { // delete file
					fs.unlinkSync(curPath);
					if (index == files.length - 1) {
						resolve()
					}
				}
			});
			fs.rmdirSync(path);
		} else {
			resolve()
		}
	})
};
var auto = new SequelizeAuto(
	config.database.DATABASE, config.database.USERNAME, config.database.PASSWORD, {
		host: config.database.HOST,
		dialect: 'mysql',
		directory: modelsPath, // prevents the program from writing to disk
		port: config.database.PORT,
		additional: {
			timestamps: false
		}
	}
)
// autoIncrement: true
var defautlt = async function() {
	await deleteFolder(modelsPath) //清空models内容
	auto.run(function(err) {
		if (err) throw err;
		console.log(auto.tables); // table list
		console.log(auto.foreignKeys); // foreign key list
		//生成实体类index
		require('./createModelsExport.js');
	});
}()

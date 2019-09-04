/**
 * 
 * mysql连接暂时不用
 * 
 * */

var mysql = require('mysql');
var config = require('./default.js')
var logs = require('./logConf.js')
var LogFile = logs.logFile('mysql');
LogFile.info("log_start start!");
var pool = mysql.createPool({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	port: config.database.PORT
});
/* mysql 连接 */
exports.query = (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				LogFile.info('Error message===========', err)
				reject(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						LogFile.info('Error message===========', err)
						reject(err)
					} else {
						LogFile.info('SQL===========', sql)
						if (values) LogFile.info('value===========', JSON.stringify(values))
						LogFile.info('result===========', JSON.stringify(rows))
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}

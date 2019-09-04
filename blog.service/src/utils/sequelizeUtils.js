/* 
	Sequelize log 信息工具
 */
const logs = require('../config/logConf.js')
const LogFile = logs.logFile(__dirname);

const validation = (value) => {
	if (value.name == 'SequelizeValidationError') {
		let error_message = []
		value.errors.map(item => {
			error_message.push(item.path + ':' + item.validatorKey)
		})
		LogFile.error('SequelizeValidationError')
		LogFile.error(value.message)
		return error_message.join(',')
	} else {
		LogFile.error(value)
		return value
	}
}



module.exports = {
	validation
};

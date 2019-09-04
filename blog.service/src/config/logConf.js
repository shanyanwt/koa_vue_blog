const log4js = require("log4js");
const log4js_config = require("./logConf.json");
log4js.configure(log4js_config);

/* 
	log打印日志规则
		LogFile.trace('This is a Log4js-Test');
		LogFile.debug('We Write Logs with log4js');
		LogFile.info('You can find logs-files in the log-dir');
		LogFile.warn('log-dir is a configuration-item in the log4js.json');
		LogFile.error('In This Test log-dir is : \'./logs/log_test/\''); 
		log_file：打印日志所在文件名
		使用方法
		var logs =  require('../lib/logConf.js')
		var LogFile = logs.logFile('log_file');
		LogFile.info("log_start start!");
*/

const logFile = (log_file) => {
	return log4js.getLogger(log_file);
}
/* 
	请求信息头打印
	使用方法
	logs.httpHead('c-artice',ctx)
 */

const httpHead = (log_file, head) => {
	let logs = logFile(log_file)
	logs.info("httpHeadMethod:", head.method)
	logs.info("httpHeadUrl:", head.originalUrl)
}


module.exports = {
	logFile: logFile,
	httpHead: httpHead
};

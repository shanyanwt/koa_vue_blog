const exception = require("./exception");
const consts = require('./consts.js');
const errorMessag = require('./errorMessag.js');
const logs = require('../config/logConf.js')
const LogFile = logs.logFile("extend_mssage");

/**
 * 处理success
 *
 * ```js const extend = require('./extend.js');
 * extend.success({ msg:"hello from lin!" })
 * ```
 *
 * ```js
 * return {errorCode: 10000,result_data:{msg:"hello from lin!"}})
 * ```
 *
 * @param app app实例
 */
const success = (data) => {
	let res = {
		error_code: consts.ERROR_CODE.SUCCESS,
		error_message: '服务调用成功',
		result_data: data
	}
	LogFile.info(JSON.stringify(res))
	return res
}

const resultData = (code, data, mes) => {
	var result = errorMessag(code)
	let res = {
		error_code: result.error_code || code,
		error_message: mes || result.error_message
	}
	if (data) res.result_data = data
	LogFile.info(JSON.stringify(res))
	return res
}
module.exports = {
	success,
	resultData
}

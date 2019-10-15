const logs = require('../config/logConf.js')
const LogFile = logs.logFile('error-code');
const consts = require('./consts.js');
const errorMessag = require('./errorMessag.js');
const extend = require('./extend.js');

/**
 * const exception = require('../utils/exception.js')
 * exception 所有其他异常的基类
 *code 错误值
 * mes，提示信息
 * ```
 */
class HttpException extends Error {
	/**
	 * 构造函数
	 * @param ex 可选参数，通过{}的形式传入
	 */
	constructor(ex, meg) {
		super();
		if (ex && ex.meg) {
			this.meg = ex.meg;
		}
		if (ex && ex.errorCode) {
			this.errorCode = ex.errorCode;
		}

	}
}
/* 错误处理 */
class erroeException extends HttpException {
	/**
	 * 构造函数
	 * @param ex 可选参数，通过{}的形式传入
	 */
	constructor(code, meg) {
		super();
		var result = errorMessag(code)
		this.errorCode = result.error_code || code;
		this.meg = meg || result.error_message;
	}
}

/**
 * 参数错误
 */
class ParametersException extends HttpException {
	constructor(ex) {
		super();
		this.errorCode = consts.ERROR_CODE.PARAM_NULL;
		this.meg = '参数错误'
		if (ex && ex.meg) {
			this.meg = ex.meg;
		}
		if (ex && ex.errorCode) {
			this.errorCode = ex.errorCode;
		}
	}
}


/* 
	catchError 错误监听中间件
 */

const catchError = () => {
	return async function(ctx, next) {
		try {
			await next()
			if (ctx.status == 404) {
				LogFile.info("404：错误地址")
				ctx.body = {
					error_code: consts.ERROR_CODE.SERVICE_NOTEXISTS,
					error_message: '404 服务地址不存在',
					request: ctx.url
				}
			}
		} catch (err) {
			LogFile.info("服务器异常", err)
			ctx.body = extend.resultData(err.errorCode, err.data, err.meg)
		}
	}
}

/* 
	catchHead 请求头中间件
 */

const catchHead = () => {
	return async function(ctx, next) {
		LogFile.info("method:", ctx.method)
		LogFile.info("url:", ctx.url)
		LogFile.info("ip:", ctx.request.ip)
		ctx.data = ctx.method === "POST" ? ctx.request.body : ctx.request.query
		await next()
	}
}


module.exports = {
	HttpException,
	erroeException,
	ParametersException,
	catchError,
	catchHead
};

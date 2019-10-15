const consts = require('../utils/consts.js');
const utils = require('../utils/utils.js')
const Admin = require('../models').Admin
const sequelizeUtils = require('../utils/sequelizeUtils.js')
const exception = require('../utils/exception.js')
const extend = require('../utils/extend.js');
const {
	RegisterValidator,
	LoginValidator
} = require('./testValidator.js');
/* 
添加 Validator 校验器
	exception 异常处理
	
	Validator使用方法参考
	 http://doc.cms.7yue.pro/lin/server/koa/validator.html#%E7%B1%BB%E6%A0%A1%E9%AA%8C
 */

/**
 * 测试 添加用户
 * 
 * 请求参数 {
		"name" : "我是江小二",
		"email" : "shanyanwt@163.com",
		"password" : "123_fsdfsf",
		"confirm_password": "123_fsdfsf",
		"phone": 12356424585,
		"qq" :123456,
		"sex" : 0
	}
 * 
 * 错误返回 {
			"error_code": 20001,
			"error_message": {
				"name": "昵称不可为空",
				"password": "密码长度必须在6~22位之间，包含字符、数字和 _ ",
				"confirm_password": "确认密码不可为空",
				"ConfirmPassword": "两次输入的密码不一致，请重新输入"
			}
		}
 */
const testRegister = async ctx => {
	//调用 RegisterValidator 
	// 校验合法继续向下走 ，不可发则抛出异常 throw Error()
	const v = await new RegisterValidator().validate(ctx);
	/* v  返回 body, query 请求参数 
		 链式取值 可以防止多层对象无结值的错误
		 post取值 v.get('body.user.index.items.name')
		 get取值 v.get('query.name') 
	 */
	let {
		name = null,
			role_id = null,
			email = null,
			password = null,
			phone = null,
			qq = null,
			sex = null,
			content = null,
			status = 0,
			create_time = utils.time(),
			update_time = utils.time()
	} = ctx.data
	let is_name = await Admin.findOne({
		where: {
			name
		}
	})
	if (is_name) {
		throw new exception.erroeException(consts.ERROR_CODE.CHECK_ALREADY_EXISTS, '该用户已存在')
	}
	await Admin.create({
			name,
			role_id,
			email,
			password,
			phone,
			qq,
			sex,
			content,
			status,
			create_time,
			update_time
		})
		.then(su => {
			ctx.body = extend.success(su)
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}

/**
 *测试 查询用户
 */
const testGetInfo = async ctx => {
	const v = await new LoginValidator().validate(ctx);
	//根据主键查询
	await Admin.findByPk(v.get('query.id'))
		.then(su => {
			ctx.body = extend.success(su)
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}


module.exports = {
	['POST test/register']: testRegister,
	['GET test/info']: testGetInfo
};

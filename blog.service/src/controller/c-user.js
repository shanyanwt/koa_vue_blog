const Op = require('sequelize').Op;
const consts = require('../utils/consts.js');
const sequelizeUtils = require('../utils/sequelizeUtils.js')
const scopes = require('../utils/scopes.js')
const utils = require('../utils/utils.js')
const Admin = require('../models').Admin
const {
	token,
	auth
} = require('../utils/token.js')
const exception = require('../utils/exception.js')
const extend = require('../utils/extend.js');
const logs = require('../config/logConf.js')
const LogFile = logs.logFile(__dirname);


/**
 *添加用户
 */
const adminAdd = async ctx => {
	let {
		role_id = null,
			email = null,
			user_ticket = null,
			name = null,
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
			role_id,
			email,
			password: user_ticket,
			name,
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
 *查询用户
 */
const adminCheckName = async ctx => {
	await Admin.findOne({
			where: {
				name: ctx.params.name
			}
		})
		.then(su => {
			ctx.body = extend.success({
				is_user: su ? 1 : 0
			})
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}

/**
 *登录
 */
const adminLogin = async ctx => {
	// let auth =  new auth()

	// console.log(auth)
	let body = ctx.data
	await Admin.findOne({
			where: {
				name: body.name
			}
		})
		.then(su => {
			let res = {}
			if (su) {
				if (su.status == 1) {
					ctx.body = extend.resultData(consts.ERROR_CODE.ACCOUNT_CANCELLATION)
				}
				let load_pas = su.password
				let user_ticket = utils.md5(load_pas + body.timestamp)
				if (user_ticket == body.user_ticket) {
					// ctx.append(consts.ACCESSTOKEN,token(su.id))  //可以添加 headers 但前端接收不到 ？？？？
					su.setDataValue([consts.ACCESSTOKEN], token(su))
					su.setDataValue('password', null)
					ctx.body = extend.success(su)
				} else {
					ctx.body = extend.resultData(consts.ERROR_CODE.USERNAME_OR_PASS_ERRROR)
				}
			} else {
				ctx.body = extend.resultData(consts.ERROR_CODE.USERNAME_OR_PASS_ERRROR)
			}
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}
/**
 *查询用户
 */
const adminSelect = async ctx => {
	//根据主键查询
	await Admin.findByPk(...ctx.params.id)
		.then(su => {
			ctx.body = extend.success(su)
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}
/**
 *查询用户
 */
const adminSelectList = async ctx => {
	let {
		where = {},
			id,
			name,
			phone,
			email,
			qq,
			start_date,
			end_date,
			status,
			row_start = 0,
			row_count = 10
	} = ctx.data
	if (id || id === 0) {
		where.id = id
	}
	if (name) {
		where.name = {
			[Op.like]: `%${name}%`
		}
	}
	if (phone) {
		where.phone = {
			[Op.like]: `%${phone}%`
		}
	}
	if (email) {
		where.email = {
			[Op.like]: `%${email}%`
		}
	}
	if (qq) {
		where.qq = {
			[Op.like]: `%${qq}%`
		}
	}

	if (status || status === 0) {
		where.status = status
	}
	if (start_date && end_date) {
		where.create_time = {
			[Op.between]: [start_date, end_date]
		}
	}
	await Admin.findAndCountAll({
			...scopes.user,
			where,
			order: [
				['create_time', 'DESC']
			],
			offset: parseInt(row_start), //开始的数据索引
			limit: parseInt(row_count) //每页多少条
		})
		.then(su => {
			let res = {
				...extend.success({
					items: su.rows
				}),
				total_row: su.count || 0
			}
			ctx.body = res
		})
		.catch(ex => {
			LogFile.error(ex)
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}

/**
 *更新用户
 */
const adminUpdate = async ctx => {
	let time = Date.parse(new Date()) / 1000
	let body = ctx.data
	let values = {
		role_id: body.role_id,
		email: body.email,
		name: body.name,
		phone: body.phone,
		password: body.user_ticket,
		qq: body.qq,
		sex: body.sex,
		content: body.content,
		update_time: time,
		last_login_time: body.last_login_time
	}
	if (body.status || body.status === 0) {
		values.status = body.status
	}
	await Admin.update({ ...values
		}, {
			where: {
				id: body.id
			}
		})
		.then(su => {
			ctx.body = extend.success()
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}
/**
 *删除用户
 */
const adminDelete = async ctx => {
	let id = ctx.params.id
	await Admin.destroy({
			where: {
				id: id
			}
		})
		.then(su => {
			let res = {
				error_code: consts.ERROR_CODE.SUCCESS,
				result_data: {
					is_user: su
				}
			}
			ctx.body = res
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}



module.exports = {
	['POST admin_add']: adminAdd,
	['GET admin_select/:id']: adminSelect,
	['GET admin_check/:name']: adminCheckName,
	['POST admin_login']: adminLogin,
	['POST admin_list']: adminSelectList,
	['POST admin_update']: adminUpdate,
	['GET admin_del/:id']: adminDelete,
};

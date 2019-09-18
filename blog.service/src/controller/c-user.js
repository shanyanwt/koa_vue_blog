const Op = require('sequelize').Op;
const consts = require('../utils/consts.js');
const sequelizeUtils = require('../utils/sequelizeUtils.js')
const utils = require('../utils/utils.js')
const Admin = require('../models').Admin
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
			update_time =  utils.time()
	} = ctx.request.body
	let is_name = await Admin.findOne({
		where: {
			name
		}
	})
	if (is_name) {
		let res = {
			error_code: consts.ERROR_CODE.CHECK_ALREADY_EXISTS,
			error_message: '该用户名一被创建'
		}
		ctx.body = res
		return
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
			let res = {
				error_code: consts.ERROR_CODE.SUCCESS,
				result_data: su
			}
			ctx.body = res
		})
		.catch(ex => {
			let res = {
				error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
				error_message: sequelizeUtils.validation(ex)
			}
			ctx.body = res
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
			let res = {
				error_code: consts.ERROR_CODE.SUCCESS,
				result_data: {
					is_user: su ? 1 : 0
				}
			}
			ctx.body = res
		})
		.catch(ex => {
			let res = {
				error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
				error_message: sequelizeUtils.validation(ex)
			}
			ctx.body = res
		})
}

/**
 *登录
 */
const adminLogin = async ctx => {
	let body = ctx.request.body
	await Admin.findOne({
			where: {
				name: body.name
			}
		})
		.then(su => {
			let res = {}
			if (su) {
				if (su.status == 1) {
					res.error_code = consts.ERROR_CODE.ACCOUNT_CANCELLATION
					res.error_message = '用户已注销'
					ctx.body = res
					return
				}
				let load_pas = su.password
				let user_ticket = utils.md5(load_pas + body.timestamp)
				if (user_ticket == body.user_ticket) {
					delete su.password
					res.error_code = consts.ERROR_CODE.SUCCESS
					res.result_data = su
				} else {
					res.error_code = consts.ERROR_CODE.USERNAME_OR_PASS_ERRROR
					res.error_message = '用户名密码错误'
				}
			} else {
				res.error_code = consts.ERROR_CODE.USERNAME_OR_PASS_ERRROR
				res.error_message = '用户名密码错误'
			}
			ctx.body = res
		})
		.catch(ex => {
			let res = {
				error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
				error_message: sequelizeUtils.validation(ex)
			}
			ctx.body = res
		})
}
/**
 *查询用户
 */
const adminSelect = async ctx => {
	//根据主键查询
	await Admin.findByPk({
			...ctx.params.id
		})
		.then(su => {
			let res = {
				error_code: consts.ERROR_CODE.SUCCESS,
				result_data: su[0]
			}
			ctx.body = res

		})
		.catch(ex => {
			let res = {
				error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
				error_message: sequelizeUtils.validation(ex)
			}
			ctx.body = res
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
	} = ctx.request.body
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
			where,
			order: [
				['create_time', 'DESC']
			],
			offset: parseInt(row_start), //开始的数据索引
			limit: parseInt(row_count) //每页多少条
		})
		.then(su => {
			let res = {
				error_code: consts.ERROR_CODE.SUCCESS,
				result_data: {
					items: su.rows
				},
				total_row: su.count || 0
			}
			ctx.body = res
		})
		.catch(ex => {
			LogFile.error(ex)
			let res = {
				error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
				error_message: sequelizeUtils.validation(ex)
			}
			ctx.body = res
		})
}

/**
 *更新用户
 */
const adminUpdate = async ctx => {
	let time = Date.parse(new Date()) /1000
	let body = ctx.request.body
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
			let res = {
				error_code: consts.ERROR_CODE.SUCCESS,
				error_message: '更新完成'
			}
			ctx.body = res
		})
		.catch(ex => {
			let res = {
				error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
				error_message: sequelizeUtils.validation(ex)
			}
			ctx.body = res
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
			let res = {
				error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
				error_message: sequelizeUtils.validation(ex)
			}
			ctx.body = res
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

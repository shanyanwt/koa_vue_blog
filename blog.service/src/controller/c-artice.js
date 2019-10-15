const Op = require('sequelize').Op;
const consts = require('../utils/consts.js');
const sequelizeUtils = require('../utils/sequelizeUtils.js')
const utils = require('../utils/utils.js')
const Article = require('../models').Article
const exception = require('../utils/exception.js')
const extend = require('../utils/extend.js');
const logs = require('../config/logConf.js')
const LogFile = logs.logFile(__dirname);

/**
 *添加文章
 */
const articleAdd = async ctx => {
	let body = ctx.data
	let time = Date.parse(new Date()) / 1000
	await Article.create({
			...body,
			create_time: time,
			update_time: time,
		})
		.then(su => {
			ctx.body = extend.success(su)
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}

/**
 *批量添加文章
 */
const articleAddList = async ctx => {
	let body = ctx.data
	let time = Date.parse(new Date()) / 1000
	body.map(item => {
		item.create_time = time
		item.update_time = time
	})
	await Article.bulkCreate([...body])
		.then(su => {
			ctx.body = extend.success(su)
		})
		.catch(ex => {
			// LogFile.info(ex)
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}

/**
 *查询文章
 */
const articleSelect = async ctx => {
	await Article.findOne({
			where: {
				id: ctx.params.id
			}
		})
		.then(su => {
			ctx.body = extend.success(su)
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}
/**
 *查询文章
 */
const articleList = async ctx => {
	let {
		where = {},
			order = [
				['create_time', 'DESC'],
			],
			keyword,
			id,
			title,
			status,
			type,
			order_key,
			start_date,
			end_date,
			row_start = 0,
			row_count = 10
	} = ctx.data
	if (id || id === 0) {
		where.id = id
	}
	if (title) {
		where.title = {
			[Op.like]: `%${title}%`
		}
	}
	if (status || status === 0) {
		where.status = status
	}
	if (type || type === 0) {
		where.type = type
	}
	if (start_date && end_date) {
		where.create_time = {
			[Op.between]: [start_date, end_date]
		}
	}
	if (keyword) {
		where[Op.or] = [{
			title: {
				[Op.like]: `%${keyword}%`
			}
		}, {
			content: {
				[Op.like]: `%${keyword}%`
			}
		}, {
			summary: {
				[Op.like]: `%${keyword}%`
			}
		}, {
			classify: {
				[Op.like]: `%${keyword}%`
			}
		}]
	}
	if (order_key && utils.objectType(order_key, 'Array')) {
		order = order_key
	}
	await Article.findAndCountAll({
			where,
			order: [
				...order
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
 *更新文章
 */
const articleUpdate = async ctx => {
	let body = ctx.data
	let time = Date.parse(new Date()) / 1000
	await Article.update({
			...body,
			update_time: time,
		}, {
			where: {
				id: body.id
			}
		})
		.then(su => {
			// increment findOne返回后可以直接调用
			
			var error_code = su[0] ? consts.ERROR_CODE.SUCCESS : consts.ERROR_CODE.INTERNAL_SERVER_ERROR;
			var error_message = su[0] ? '更新完成' : '更新失败'
			ctx.body = extend.resultData(error_code, error_message)
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}
/**
 *删除文章
 */
const articleDelete = async ctx => {
	let id = ctx.params.id
	await Article.destroy({
			where: {
				id: id
			}
		})
		.then(su => {
			ctx.body = extend.success(su)
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}



module.exports = {
	['POST add']: articleAdd,
	['POST add_list']: articleAddList,
	['GET select/:id']: articleSelect,
	['POST article_list']: articleList,
	['POST search']: articleList,
	['POST update']: articleUpdate,
	['GET del/:id']: articleDelete,
};

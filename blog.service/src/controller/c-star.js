const Op = require('sequelize').Op;
const consts = require('../utils/consts.js');
const sequelizeUtils = require('../utils/sequelizeUtils.js')
const utils = require('../utils/utils.js')
const db = require('../models').db
const Star = require('../models').Star
const Article = require('../models').Article
const Admin = require('../models').Admin
const exception = require('../utils/exception.js')
const extend = require('../utils/extend.js');

const {
	starValidator
} = require('../validator/star.js');

const logs = require('../config/logConf.js')
const LogFile = logs.logFile(__dirname);

/**
 *收藏api
 * 添加收藏
 */
const starAdd = async ctx => {
	var body = ctx.data
	var time = Date.parse(new Date()) / 1000
	const v = await new starValidator().validate(ctx);
	var isRepeat = await Star.count({
		where: {
			article_id: v.get('body.article_id'),
			admin_id: v.get('body.admin_id')
		}
	})
	// 验证是否重复数据
	if (isRepeat) {
		throw new exception.erroeException(consts.ERROR_CODE.CHECK_ALREADY_EXISTS)
	}
	// console.log(db.model('skd_article'),11111)
	return db.transaction(async t => {
		await Star.create({
			...body,
			create_time: time,
			update_time: time,
		}, {
			transaction: t
		}).catch(ex => {
			throw new Error(ex)
		})
		const updateNum = await Article.update({
			star_number: db.literal('`star_number` +1'), //自增函数
			update_time: time
		}, {
			where: {
				id: v.get('body.article_id')
			},
			transaction: t
		}).catch(ex => {
			throw new Error(ex)
		})
		if (updateNum) {
			return updateNum
		} else {
			throw new Error("更新失败")
		}
	}).then(function(result) {
		// 事务已被提交
		// result 是 promise 链返回到事务回调的结果
		ctx.body = extend.success({
			isAdd: 1
		})
	}).catch(function(err) {
		LogFile.error(err)
		// 事务已被回滚
		// err 是拒绝 promise 链返回到事务回调的错误
		throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR)
	});
}

/**
 *批量添加收藏
 */
const starAddList = async ctx => {
	let body = ctx.data
	let time = Date.parse(new Date()) / 1000
	body.map(item => {
		item.create_time = time
		item.update_time = time
	})
	await Star.bulkCreate([...body])
		.then(su => {
			ctx.body = extend.success(su)
		})
		.catch(ex => {
			// LogFile.info(ex)
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}

/**
 *查询收藏
 */
const starSelect = async ctx => {
	await Star.findOne({
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
/* 
 用户关联收藏查询
 */

// Article.hasOne(Star, {
// 	foreignKey: 'id',
// 	as: 'article'
// })
Star.belongsTo(Article, {
	foreignKey: 'article_id',
	as: 'article'
});


const userStar = async ctx => {
	var body = ctx.data
	var time = Date.parse(new Date()) / 1000
	const v = await new starValidator().validate(ctx);

	/*
	foreignKey VS targetKey理解不清晰
	 Article.findAll
		ON  `skd_star`.`article_id` = `article`.`id` AND `article`.`id` = `skd_star`.`article_id`
	 */
	// Star.belongsTo(Article, {
	// 	foreignKey: 'article_id',
	// 	targetKey: 'id',
	// 	as: 'a'
	// });

	/* 
	 belongsTo 根据 Article 的外键查询Star的主键
	 Article.findAll
		输出sql 
			FROM `skd_article` AS `skd_article` LEFT OUTER JOIN `skd_star` AS `star`
		 ON `skd_article`.`id` = `star`.`id` WHERE `skd_article`.`id` = 31;
	*/
	// Article.belongsTo(Star, {
	// 	foreignKey: 'id',
	// 	as: 'star'
	// })


	/* 
	 hasOne => 根据Article 的主键 查询 Star的外键
	 Article.findAll
	 输出sql
		 FROM `skd_article` AS `skd_article` LEFT OUTER JOIN `skd_star` AS `star`
		ON ` skd_article `.`id` = `star`.`article_id` WHERE` skd_article`.`id` = 31;
		Article.hasOne(Star, {
			foreignKey: 'article_id',
			as: 'star'
		})
	 */

	var isRepeat = await Star.findAll({
		include: [{
			model: Article,
			as: 'article',
		}],
		where: {
			admin_id: v.get('body.admin_id')
		},
		// raw: true
	})
	// console.log("关联表: " + JSON.stringify(isRepeat));
	ctx.body = extend.success(isRepeat)

}

/**
 *查询收藏
 */
const starList = async ctx => {
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
	await Star.findAndCountAll({
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
 *更新收藏
 */
/*  */

const starUpdate = async ctx => {
	let body = ctx.data
	let time = Date.parse(new Date()) / 1000
	await Star.update({
			...body,
			update_time: time,
		}, {
			where: {
				id: body.id
			}
		})
		.then(su => {
			var error_code = su[0] ? consts.ERROR_CODE.SUCCESS : consts.ERROR_CODE.INTERNAL_SERVER_ERROR;
			var error_message = su[0] ? '更新完成' : '更新失败'
			ctx.body = extend.resultData(error_code, error_message)
		})
		.catch(ex => {
			throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
		})
}
/**
 *删除收藏
 */
const starDelete = async ctx => {
	let id = ctx.params.id
	await Star.destroy({
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
	['POST star/add']: starAdd,
	['POST star/add_list']: starAddList,
	['GET star/select/:id']: starSelect,
	['POST star/star_list']: starList,
	['POST star/search']: starList,
	['POST star/update']: starUpdate,
	['GET star/del/:id']: starDelete,
	['POST star/user']: userStar,
};

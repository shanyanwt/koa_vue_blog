'use strict'

/**
 * 文章公告
 * 
 * */
const articleType = type => {
	if(type == 0) {
		return '首页头部推荐'
	} else if(type == 1) {
		return '普通文章'
	} else if(type == 2) {
		return '资讯'
	} else if(type == 3) {
		return '公告'
	} else {
		return '--'
	}
}
/**
 * 文章状态
 * 
 * */
const articleStatus = type => {
	if(type == 0) {
		return '允许'
	} else if(type == 1) {
		return '禁止'
	} else {
		return '--'
	}
}

module.exports = {
	articleType,
	articleStatus
}
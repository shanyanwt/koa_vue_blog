/* 
	文件上传 
 */
const fs = require('fs');
const path = require('path');
const consts = require('../utils/consts.js');
const dateFormat = require('../utils/dateFormat.js')
const config = require('../config/default.js');
const logs = require('../config/logConf.js')
const LogFile = logs.logFile(__dirname);
const {
	fileUtils
} = require('../utils/fileUtils.js');
/**
 * 文件上传
 * ps 生成文件名为 SKD_日期
 * 	文件路径根据年月分存放
 */
const uploadImg = async ctx => {
	var time = Date.parse(new Date())
	let fileName = 'SDK_' + dateFormat.dateFormat(time, dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT);
	let file = ctx.request.files.file;
	let upload = config.upload.UPLOAD + config.upload.IMAGE //上传保存目录
	let fileYear = fileName.substring(4, 8) + '/' +
		fileName.substring(8, 10);
	let tail = file.name == 'blob' ? 'png' : file.name.split('.').pop()
	let filePath = path.join(upload, fileYear, fileName + '.' + tail);
	//创建文件夹
	await fileUtils({
		type: 'mkdirFile',
		name: upload + fileYear
	})
	//保存文件
	await fileUtils({
		type: 'pipe',
		name: file.path,
		newName: filePath
	}).then(su => {
		let uplaod_img = su.substring(config.upload.UPLOAD.length, su.length)
		ctx.body = {
			error_code: consts.ERROR_CODE.SUCCESS,
			error_message: '上传文件成功',
			realName: uplaod_img,
		}
	}).catch(err => {
		LogFile.error(err)
		ctx.body = {
			error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
			error_message: '上传文件失败！',
		}
	})
}

module.exports = {
	['POST upload']: uploadImg
};

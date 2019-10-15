/* 
	文件服务
 */
const fs = require('fs');
const path = require('path');
const send = require('koa-send');
var jszip = require('jszip');
const consts = require('../utils/consts.js');
const {
	fileUtils
} = require('../utils/fileUtils.js');
const config = require('../config/default.js');
const logs = require('../config/logConf.js')
const LogFile = logs.logFile(__dirname);
var zip = new jszip();

/* 
 根据文件路径读取文件，返回文件列表
 */
var fileList = []
const fileDisplay = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readdir(filePath, function(err, files) {
			if (err) {
				reject(err)
			} else if (files.length == 0) {
				resolve(fileList)
			} else {
				//遍历读取到的文件列表
				files.forEach(function(filename, index) {
					//获取当前文件的绝对路径
					var filedir = path.join(filePath, filename);
					//根据文件路径获取文件信息，返回一个fs.Stats对象
					fs.stat(filedir, function(err, stats) {
						if (err) {
							reject(err)
							return false;
						}
						if (stats.isDirectory()) {
							// fileDisplay(filedir);
							fileList.push({
								name: files[index],
								type: 1
							})
							if (files.length == fileList.length) {
								resolve(fileList)
							}
						}
						if (stats.isFile()) {
							fileList.push({
								name: files[index],
								type: 0
							})
							if (files.length == fileList.length) {
								resolve(fileList)
							}
						}
					});
				});
			}
		})
	});
}

/**
 * 查询目录文件
 */
const fileCatalogue = async ctx => {
	fileList = []
	var body = ctx.data
	var paths = body.path || config.upload.UPLOAD
	var filePath = path.resolve(paths);
	await fileDisplay(filePath).then(su => {
		var suList = []
		su.map(item => {
			var obj = {
				path: paths + '/' + item.name,
				name: item.name,
				type: item.type
			}
			suList.push(obj)
		})
		let res = {
			error_code: consts.ERROR_CODE.SUCCESS,
			result_data: {
				items: suList,
				path: paths
			}
		}
		LogFile.info(JSON.stringify(res))
		ctx.body = res

	}).catch(err => {
		LogFile.error(err)
		let res = {
			error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
			error_message: '服务器异常'
		}
		ctx.body = res
	})
}

/**
 * 删除文件
 */
const delFile = async ctx => {
	var body = ctx.data
	if (!body.path) {
		LogFile.error(err)
		let res = {
			error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
			error_message: '请输入文件名称'
		}
		ctx.body = res
		return false;
	}
	await fileUtils({
		type: body.type ? 'rmdir' : 'unlink',
		name: body.path
	}).then(su => {
		let res = {
			error_code: consts.ERROR_CODE.SUCCESS,
			result_data: {
				ischeck: 1
			}
		}
		LogFile.info(JSON.stringify(res))
		ctx.body = res

	}).catch(err => {
		LogFile.error(err)
		let res = {
			error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
			error_message: '服务器异常'
		}
		ctx.body = res
		return false;
	})
}

/* 压缩文件
 读取目录及文件
 */
function readDir(obj, nowPath, laodPath) {
	let files = fs.readdirSync(nowPath); //读取目录中的所有文件及文件夹（同步操作）
	files.forEach(function(fileName, index) { //遍历检测目录中的文件
		let fillPath = nowPath + "/" + fileName;
		let file = fs.statSync(fillPath); //获取一个文件的属性
		if (file.isDirectory()) { //如果是目录的话，继续查询
			let pushPath = fillPath.replace(laodPath, '')
			let dirlist = zip.folder(pushPath); //压缩对象中生成该目录
			readDir(dirlist, fillPath, laodPath); //重新检索目录文件
		} else {
			obj.file(fileName, fs.readFileSync(fillPath)); //压缩目录添加文件
		}
	});
}
/**
 * 下载文件
 */
const downloadFile = async ctx => {
	var body = ctx.query
	if (!body.path) {
		LogFile.error(err)
		let res = {
			error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
			error_message: '请输入文件名称'
		}
		ctx.body = res
		return false;
	}
	var res = {}
	if (body.type == 1) {
		var pathList = body.path.split('/')
		var fileName = pathList[pathList.length - 1]
		var fileTemp = '/upload/temp/'
		await readDir(zip, body.path, body.path);
		await fileUtils({
			type: 'mkdirFile',
			name: fileTemp,
		})
		await zip.generateAsync({ //设置压缩格式，开始打包
			type: "nodebuffer", //nodejs用
			compression: "DEFLATE", //压缩算法
			compressionOptions: { //压缩级别
				level: 9
			}
		}).then(function(content) {
			fileUtils({
				type: 'writeFile',
				name: `${fileTemp}${fileName}.zip`,
				txt: content
			}).then(su => {
				LogFile.info('压缩成功！')
			}).catch(err => {
				LogFile.error(err)
				let res = {
					error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
					error_message: '服务器异常'
				}
				ctx.body = res
				return false;
			})
		});
		await send(ctx, `${fileTemp}${fileName}.zip`, {
			root: '/'
		})
		await fileUtils({
			type: 'unlink',
			name: `${fileTemp}${fileName}.zip`
		}).then(su => {
			LogFile.info('清除文件成功！')
		}).catch(err => {
			LogFile.error('删除文件失败', err)
		})
	} else {
		await send(ctx, body.path, {
			root: '/'
		})
	}
}

module.exports = {
	['POST file_catalogue']: fileCatalogue,
	['POST del_file']: delFile,
	['GET download_file']: downloadFile,

};

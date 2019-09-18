/* 
	音乐api
 */
const http = require('http');
const consts = require('../utils/consts.js');
const config = require('../config/default.js');
const logs = require('../config/logConf.js')
const LogFile = logs.logFile(__dirname);
/* 
	请求 网易云音乐163
 */
const get163 = async ctx => {
	var url = "http://music.163.com/api/playlist/detail?id=" + ctx
	return new Promise((resolve, reject) => {
		http.get(url, (res) => {
			var resData = ""
			res.on("data", (data) => {
				resData += data
			})
			res.on("end", () => {
				resolve(resData)
			})
		}).on("error", (e) => {
			reject(e)
		})
	})

}

/**
 * 网易云音乐接口
 */
const music163 = async ctx => {
	let playUrl = "http://music.163.com/song/media/outer/url?id="
	var id = ctx.params.id
	if (!id) {
		LogFile.error('请填写ID')
		let res = {
			error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
			error_message: '请填写ID'
		}
		ctx.body = res
	}
	await get163(id).then(res => {
		res = JSON.parse(res)
		if (res.code != 200) throw new Error('Sync Error')
		var musicList = [];
		(res.result.tracks || []).map(item => {
			let obj = {
				name: item.name,
				artist: item.artists ? item.artists[0].name : '音乐是世界的',
				id: item.id,
				cover: item.album ? item.album.picUrl : 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
				url: `${playUrl}${item.id}.mp3 `
			}
			musicList.push(obj)
		})
		let resData = {
			error_code: consts.ERROR_CODE.SUCCESS,
			result_data: {
				items: musicList
			}
		}
		LogFile.info(JSON.stringify(resData))
		ctx.body = resData
	}).catch(err => {
		LogFile.error(err)
		let res = {
			error_code: consts.ERROR_CODE.INTERNAL_SERVER_ERROR,
			error_message: '服务器异常'
		}
		ctx.body = res
	})
}
module.exports = {
	['GET music_163/:id']: music163
};

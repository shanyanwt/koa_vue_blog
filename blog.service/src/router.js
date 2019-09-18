const artice = require('./controller/c-artice.js');
const user = require('./controller/c-user.js');
const upload = require('./controller/c-upload.js');
const file = require('./controller/c-file.js');
const music = require('./controller/c-music.js');


const logs = require('./config/logConf.js')
const LogFile = logs.logFile('router');
const top = '/article/v1/'

/**
 *  ps:
 * 		router 是自动生成并且webpack node打包不加载依赖所以只好预加载，防止错误路径问题
 * 逐一引入controller 中的文件
 * 要求：导出命名方式，方便生成正确的router
 * module.exports = {
		['POST admin_add']: adminAdd,
		['GET admin_select/:id']: adminSelect
	};
  *
  * */
var controllerList = { ...artice,
	...user,
	...upload,
	...file,
	...music
}

function addMapping(router, mapping) {
	for (var url in mapping) {
		if (url.startsWith('GET ')) {
			var path = top + url.substring(4);
			router.get(path, mapping[url]);
			LogFile.info(`register URL mapping: GET ${path}`);
		} else if (url.startsWith('POST ')) {
			var path = top + url.substring(5);
			router.post(path, mapping[url]);
			LogFile.info(`register URL mapping: POST ${path}`);
		} else {
			LogFile.info(`invalid URL: ${url}`);
		}
	}
}

module.exports = function(dir) {
	let routers_dir = dir || 'controller',
		router = require('koa-router')();
	addMapping(router, controllerList);
	return router.routes();
};

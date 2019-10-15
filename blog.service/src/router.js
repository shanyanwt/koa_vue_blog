const controller = require('./controller');
const logs = require('./config/logConf.js')
const consts = require('./utils/consts.js')
const LogFile = logs.logFile('router');
const top = '/article/v1/'

/**
 *  ps: 
 * 		router 是自动生成并且webpack node打包不加载依赖所以只好预加载，防止错误路径问题,如果不考虑打包环境可以使用   require-directory 替代方案
 * 逐一引入controller  index.js中的文件
 * 要求：导出命名方式，方便生成正确的router
 * module.exports = {
		['POST admin_add']: adminAdd,
		['GET admin_select/:id']: adminSelect
	};
  *
  * */
function addMapping(router, mapping) {
	for (var url in mapping) {
		if (url.startsWith('GET ')) {
			var path = top + url.substring(4);
			router.get(path, mapping[url]);
			consts.ROUTER.GET.push(path)
			LogFile.info(`register URL mapping: GET ${path}`);
		} else if (url.startsWith('POST ')) { 
			var path = top + url.substring(5);
			router.post(path, mapping[url]);
			consts.ROUTER.POST.push(path)
			LogFile.info(`register URL mapping: POST ${path}`);
		} else {
			LogFile.info(`invalid URL: ${url}`);
		}
	}
}

module.exports = function(dir) {
	let routers_dir = dir || 'controller',
		router = require('koa-router')();
	addMapping(router, controller);
	return router.routes();
};

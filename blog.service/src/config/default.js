/* *
 *	连接配置，
 *	devConfig 开发环境
 *	prodConfig 生产环境
 */
const devConfig = {
	// 启动端口
	port: 8081,
	// 数据库配置
	database: {
		DATABASE: 'skd',
		USERNAME: 'root',
		PASSWORD: 'yan123456',
		PORT: '3306',
		HOST: '127.0.0.1'
	},
	//上传文件目录，如图片为 UPLOAD + IMAGE
	upload: {
		UPLOAD: '/upload',
		IMAGE: '/image/',
		FILE: '/file/',
		MAXFILESIZE: 200 * 1024 * 1024, //上传文件大小
	},
}
const prodConfig = {
	// 启动端口
	port: 8081,
	// 数据库配置
	database: {
		DATABASE: 'skd',
		USERNAME: 'root',
		PASSWORD: 'yan123456',
		PORT: '3306',
		HOST: '127.0.0.1'
	},
	upload: {
		UPLOAD: '/upload',
		IMAGE: '/image/',
		FILE: '/file/',
		MAXFILESIZE: 200 * 1024 * 1024
	}
}
module.exports = process.env.BRANCH_ENV == 'progress' ? prodConfig : devConfig

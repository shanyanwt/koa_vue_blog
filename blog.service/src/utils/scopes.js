/* scopes
	 排除字段方法
	 https://sequelize.org/master/manual/querying.html
	 使用方法
	 const scopes = require('../utils/scopes.js')
	 ...scopes.user,
	 和where同级
	 ps: scopes也可以全局使用，由于自动生成位置需要重复添加所以单独写出来
 
 */

// 查询用户信息排除字段
const user = {
	attributes: {
		exclude: ['password', 'ip']
	}
}

module.exports = {
	user
};

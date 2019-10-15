const jwt = require("jsonwebtoken")
var config = require('../config/default.js')
var exception = require('./exception.js')
var utils = require('./utils.js')
/* token
	jwt 令牌生成
 */

// 查询用户信息排除字段
const token = (user) => {
	var secretKey = config.secretKey
	var expiresIn = config.expiresIn
	var token = jwt.sign({
		user
	}, secretKey, {
		expiresIn
	})
	// return utils.base64encode(token)
	return token
}

module.exports = {
	token
};

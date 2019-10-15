'use strict'
const lodash = require("lodash");
/*!
 * errorMessag.js v1.0.0
 * Author:
 * Date:
 * 使用方法：
 *         const require('ustils/errorMessag.js')
 * 			errorMessag(code)
 */

const codeMessag = [{
		error_code: 10000,
		error_message: '服务器调用成功',
	},
	{
		error_code: 20000,
		error_message: '未知错误',
	}, {
		error_code: 20001,
		error_message: ' 必填参数为空',
	},{
		error_code: 20002,
		error_message: 'headers appname 必填不能为空',
	},
	{
		error_code: 20003,
		error_message: ' 请求参数数值超出业务范围',
	},
	{
		error_code: 20004,
		error_message: '签名错误',
	},{
		error_code: 20006,
		error_message: '参数类型错误',
	},
	{
		error_code: 20005,
		error_message: ' 404服务不存在',
	},
	{
		error_code: 20007,
		error_message: '参数格式错误',
	},
	{
		error_code: 20008,
		error_message: '服务出现了点问题，稍后重试',
	},
	{
		error_code: 20009,
		error_message: '传入的JSON数据格式错误',
	},
	{
		error_code: 20010,
		error_message: '参数数据超过允许长度',
	},
	{
		error_code: 20011,
		error_message: '数据已存在请勿重复提交',
	},
	{
		error_code: 61003,
		error_message: 'access_token不存在',
	},
	{
		error_code: 61004,
		error_message: 'security_id不存在',
	},
	{
		error_code: 61005,
		error_message: '手机号已被使用',
	},
	{
		error_code: 61006,
		error_message: '发送短信验证码成功',
	},
	{
		error_code: 61007,
		error_message: '发送短信验证码失败',
	},
	{
		error_code: 61011,
		error_message: 'instance_id和security_id不匹配',
	},
	{
		error_code: 61012,
		error_message: ' instance_id和access_token不匹配',
	},
	{
		error_code: 61013,
		error_message: '短信验证码不正确或已过期',
	},
	{
		error_code: 61014,
		error_message: '短信验证码，内部错误',
	},
	{
		error_code: 61015,
		error_message: '程序序列错误',
	},
	{
		error_code: 61016,
		error_message: '图形验证码错误',
	},
	{
		error_code: 61017,
		error_message: '短信验证码错误',
	},
	{
		error_code: 61018,
		error_message: '无权访问',
	},
	{
		error_code: 61019,
		error_message: '对象不存在',
	},
	{
		error_code: 61020,
		error_message: '用户名或密码错误',
	},
	{
		error_code: 61024,
		error_message: ' 账号已注销',
	},
	{
		error_code: 61025,
		error_message: 'access_token已过期',
	}
];

const errorMessag = code => {
	var result = lodash.filter(codeMessag, {
		error_code: code || 20008
	});
	return result[0]
}
module.exports = errorMessag

'use strict'
/*!
 * consts.js v1.0.0
 * 常量列表js，主要是用来存一些常量，避免大家都各自在各个地方定义常量，便于统一管理<br>
 * 缓存的前缀和key需要注意，不能重复，所以，缓存的前缀，大家尽量按照模块名称来取，保证前缀不重复，例如登录的相关信息，前缀都用login
 * key也都在这里统一定义，这样就可以很明确的知道那些名字已经被占用了，已经存在了。
 * Author:
 * Date:
 * 使用方法：
 *        import consts from 'common/consts.js'
 *        consts.INSTANCE_ID
 */
/** **************缓存相关start*************************/
// 登录成功,用户相关信息
// 用户信息
const INSTANCE_ID = 'instance_id'
const ACCESSTOKEN = 'access_token'

// 用户信息，不包括权限数据
const USERINFO = 'user_info'
// 应用名称
const APP_NAME = 'app_name'
const APP_NAME_VALUE = 'DOS'
const CONTENT_TYPE = 'Content-Type'
const CONTENT_TYPE_VALUE = 'application/json;charset=UTF-8'

/** **************缓存相关end*************************/

const ERROR_CODE = {
	SUCCESS: 10000, // 成功
	UNKNOWN_ERROR: 20000, // 未知错误
	SIGNATURE_ERROR: 20004, // 签名错误
	SERVICE_NOTEXISTS: 20005, // 404服务不存在
	PARAM_NULL: 20001, // 必填参数为空
	PARAM_TYPE_ERROR: 20006, // 参数类型错误
	PARAM_FORMAT_ERROR: 20007, // 参数格式错误
	PARAM_OVER_ERROR: 20003, // 请求参数数值超出业务范围
	PARAM_NULL_ERROR: 20013, // 请求参数数值超出业务范围
	INTERNAL_SERVER_ERROR: 20008, // 服务器系统异常
	DATA_FORMAT_ERROR: 20009, // 传入的JSON数据格式错误
	PARAM_LENGTH_OVER: 20010, // 参数数据超过允许长度
	CHECK_ALREADY_EXISTS: 20011, // 校验对象已存在
	CHECK_ALREADY_EXISTS: 20011, // 校验对象已存在

	// 账户API错误代码
	NO_ACCESS_TOKEN: 61003, // access_token不存在
	NO_SECURITY_ID: 61004, // security_id不存在
	PHONENUM_OCCUPY: 61005, // 手机号已被使用
	ALREADY_EXIST: 61006, // ？已经存在
	SEND_CODE_FAIL: 61007, // 发送短信验证码失败
	INSTANCE_ID_NO_SECURITY_ID: 61011, // instance_id和security_id不匹配
	INSTANCE_ID_NO_ACCESS_TOKEN: 61012, // instance_id和access_token不匹配
	CODE_EXPIRED: 61013, // 短信验证码不正确或已过期
	INNER_ERROR: 61014, // 内部错误
	PROGRAM_ERROR: 61015, // 程序序列错误
	GRAPHICAL_ERROE: 61016, // 图形验证码错误
	CODE_ERROR: 61017, // 短信验证码错误
	UNAUTHORIZED_ACCESS: 61018, // 无权访问
	NO_OBJECT: 61019, // 对象不存在
	USERNAME_OR_PASS_ERRROR: 61020, // 用户名或密码错误
	ACCOUNT_CANCELLATION: 61024, // 账号已注销
}

module.exports = {
	ACCESSTOKEN,
	INSTANCE_ID,
	USERINFO,
	APP_NAME,
	APP_NAME_VALUE,
	CONTENT_TYPE,
	CONTENT_TYPE_VALUE,
	ERROR_CODE
}
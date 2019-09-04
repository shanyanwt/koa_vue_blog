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
//确认订单缓存

// 用户信息，不包括权限数据
const USERINFO = 'user_info'
// 权限list，存在loaclstorage里面，因为超过4kb，cookies存不了了
const PERMISSION_LIST = 'permission_list'


// 应用名称
const APP_NAME = 'application_name'
// 应用名称
const APP_NAME_VALUE = 'WMW'
const CONTENT_TYPE = 'Content-Type'
const CONTENT_TYPE_VALUE = 'application/json; charset=UTF-8'
// 验证码类型
const OPERATION_TYPE = {
	login:'login',
	register:'register',
	findPwd:'find_pwd'
}
//全局状态
const GLOBALSTATUS='globalStatus';
//sessionStorage正在发送中
const SENDING='sending';
//事件类型中心
const NULL ='"null"';//null字符串

/** **************缓存相关end*************************/

const ERROR_CODE = {
  SUCCESS: '10000', // 成功
  UNKNOWN_ERROR: '20000', // 未知错误
  SIGNATURE_ERROR: '20004', // 签名错误
  SERVICE_NOTEXISTS: '20005', // 404服务不存在
  PARAM_NULL: '20001', // 必填参数为空
  PARAM_TYPE_ERROR: '20006', // 参数类型错误
  PARAM_FORMAT_ERROR: '20007', // 参数格式错误
  PARAM_OVER_ERROR: '20003', // 请求参数数值超出业务范围
  INTERNAL_SERVER_ERROR: '20008', // 服务器系统异常
  DATA_FORMAT_ERROR: '20009', // 传入的JSON数据格式错误
  PARAM_LENGTH_OVER: '20010', // 参数数据超过允许长度
  INSUFFICIENT_PERMISSIONS: '20011', // 权限不足，无法执行此操作
  INVALID_ORDER: '40001', // 无效的订单
  NOTEXISTS_ORDER: '40002', // 该订单不存在
  MONEY_OVER: '40003', // 支付金额必须小于等于电商系统订单的未支付金额
  ORDER_HASEXISTED: '40004', // 该订单及支付流水已经存在
  ORDER_TIME_OVER: '40005', // 查询订单时间间隔过大
  GOODS_MAX_SHORTAGE: '40012', // 商品购买超过最大购买数量
  UPLOAD_IMG_FAIL: '30001', // 上传图片失败
  UPLOAD_FILE_TYPE_ERROR: '30002', // 上传文件格式不整确
  UPLOAD_FILE_ERROR: '30003', // 上传文件失败
  UPLOAD_IMG_NUMBER_OVER: '30004', // 上传图片数量超过限制
  GOODS_COLLECTED: '50001', // 商品已经被关注过
  GOODS_COLLECT_FAIL: '50002', // 商品已关注失败
  CANCEL_COLLECT_FAIL: '50003', // 取消关注失败
  GOODS_INVENTORY_SHORTAGE: '50004', // 该商品库存不足
  GOODS_SHORTAGE:'500114',//加采购清单校验该商品库存不足
  GOODS_DELIVERY_AREA_OVER: '40006', // 商品超出配送范围
  NO_GOODS_DETAIL: '80001', // 无商品详情数据
  GOODS_XIAJIA: '80002', // 商品已下架
  GOODS_OVER_UPLINE: '80003', // 商品选购量大于允许购买上限
  PROBLEMS:'400010',//加入采购清单提示有问题商品
  // 账户API错误代码
  NO_ACCESS_TOKEN: '61003', // access_token不存在
  NO_SECURITY_ID: '61004', // security_id不存在
  PHONENUM_OCCUPY: '61005', // 手机号已被使用
  ALREADY_EXIST: '61006', // ？已经存在
  SEND_CODE_FAIL: '61007', // 发送短信验证码失败
  INSTANCE_ID_NO_SECURITY_ID: '61011', // instance_id和security_id不匹配
  INSTANCE_ID_NO_ACCESS_TOKEN: '61012', // instance_id和access_token不匹配
  CODE_EXPIRED: '61013', // 短信验证码不正确或已过期
  INNER_ERROR: '61014', // 内部错误
  PROGRAM_ERROR: '61015', // 程序序列错误
  GRAPHICAL_ERROE: '61016', // 图形验证码错误
  CODE_ERROR: '61017', // 短信验证码错误
  UNAUTHORIZED_ACCESS: '61018', // 无权访问
  NO_OBJECT: '61019', // 对象不存在
  USERNAME_OR_PASS_ERRROR: '61020', // 用户名或密码错误
  COMPANY_NAME_EXISTS_ERROR: '120003' // 物流公司名称已存在
}

export default {
  INSTANCE_ID,
	USERINFO,
	PERMISSION_LIST ,
	APP_NAME ,
	 APP_NAME_VALUE ,
	 CONTENT_TYPE,
	CONTENT_TYPE_VALUE,
	 OPERATION_TYPE ,
	 GLOBALSTATUS,
	 SENDING,
 	NULL ,
 	ERROR_CODE
}
export {   INSTANCE_ID,
	USERINFO,
	PERMISSION_LIST ,
	APP_NAME ,
	 APP_NAME_VALUE ,
	 CONTENT_TYPE,
	CONTENT_TYPE_VALUE,
	 OPERATION_TYPE ,
	 GLOBALSTATUS,
	 SENDING,
 	NULL ,
 	ERROR_CODE 
}

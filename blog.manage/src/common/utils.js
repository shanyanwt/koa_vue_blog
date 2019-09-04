'use strict';
/*!
 * utils v1.0.0
 * 工具类,提供各种工具方法，会陆续添加
 *
 * Author: liaoxm
 * Date: 2019-07-21
 *
 */

import nodeUuid from 'node-uuid';
import crypto from 'crypto';
/**
 * 选择器
 * @param {String} sel   是一个字符串，包含一个或是多个 CSS 选择器 ，多个则以逗号分隔
 * @return {DomObject} 一个 element 对象（DOM 元素）
 * @public
 */
/**
 * 获取url参数
 * @param {Object} name 想要的参数名
 * 如果没有取到，返回的是null
 */
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
/**
 * 深拷贝JSON对象
 * @param {Object} source 需拷贝的对象
 * 如果没有取到，返回的是null
 */
function deepCopy(source) {
	var result = {};
	for(var key in source) {
		result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
	}
	return result;
}

/**
 * 冒泡排序
 * @param {Array} data 需拷贝的对象
 * @param {String} sortField 需拷贝的对象
 * @return 排序后的数组(JS只能值引用，所以需要用排序后的数组对原数组变量重新赋值，而不能直接通过函数对原数组进行排序)
 */
function bubbleSort(data, sortField) {
	if(data == null) {
		return null;
	}
	for(var i = 0; i < data.length; i++) {
		for(var j = 0; j < data.length - i - 1; j++) {
			if(data[j][sortField] - 0 > data[j + 1][sortField] - 0) {
				var tempObj = data[j + 1];
				data[j + 1] = data[j];
				data[j] = tempObj;
			}
		}
	}
	return data;
}

const query = sel => {
	return document.querySelector(sel);
};

/**
 * 选择器
 * @param {String} sel 一个由逗号连接的包含一个或多个CSS选择器的字符串
 * @return {NodeList} 一个non-live的 NodeList 类型的对象
 * @public
 */
const queryAll = sel => {
	return document.querySelectorAll(sel);
};

/**
 * 产生一个 v1 (基于时间的) id
 * @return {String} uuid 36位带四个中划线
 * @public
 */
const uuid = () => {
	return nodeUuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'
};

/**
 * 产生一个 v4 (基于时间的) id
 * @return {String} uuid 36位带四个中划线
 * @public
 */
const uuidV4 = () => {
	return nodeUuid.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1’
};

/**
 * hash方法
 *
 * @param {String} e.g.: 'md5', 'sha1'
 * @param {String|Buffer} s
 * @param {String} [format] 'hex'，'base64'. default is 'hex'.
 * @return {String} 编码值
 * @private
 */
const hash = (method, s, format) => {
	var sum = crypto.createHash(method);
	var isBuffer = Buffer.isBuffer(s);
	if(!isBuffer && typeof s === 'object') {
		s = JSON.stringify(sortObject(s));
	}
	sum.update(s, isBuffer ? 'binary' : 'utf8');
	return sum.digest(format || 'hex');
};

/**
 * md5 编码
 *
 * @param {String|Buffer} s
 * @param {String} [format] 'hex'，'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
const md5 = (s, format) => {
	return hash('md5', s, format);
};

/**
 * sha1 编码
 *
 * @param {String|Buffer} s
 * @param {String} [format] 'hex'，'base64'. default is 'hex'.
 * @return {String} sha1 hash string
 * @public
 */
const sha1 = (s, format) => {
	return hash('sha1', s, format);
};

/**
 * sha256 编码
 *
 * @param {String|Buffer} s
 * @param {String} [format]  'hex'，'base64'. default is 'hex'.
 * @return {String} sha256 hash string
 * @public
 */
const sha256 = (s, format) => {
	return hash('sha256', s, format);
};

/**
 * Base64编码.
 *
 * @param {String|Buffer} s 需要编码的字符串
 * @param {Boolean} [urlsafe=false] E是否是url类型，暂时屏蔽.
 * @return {String} base64编码.
 * @public
 */
const base64encode = (s /*, urlsafe*/ ) => {
	if(!Buffer.isBuffer(s)) {
		s = new Buffer(s);
	}
	var encode = s.toString('base64');
	var urlsafe = false;
	if(urlsafe) {
		encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
	}
	return encode;
};

/**
 * Base64字符串解码.
 *
 * @param {String} encode, 需要解码的字符串.
 * @param {Boolean} [urlsafe=false] 是否是url类型，暂时屏蔽.
 * @param {encoding} [encoding=utf8] 字符编码，默认utf8,可选参数
 * @return {String|Buffer}
 * @public
 */
const base64decode = (encodeStr /*, urlsafe*/ , encoding) => {
	var urlsafe = false;
	if(urlsafe) {
		encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/');
	}
	var buf = new Buffer(encodeStr, 'base64');
	if(encoding === 'buffer') {
		return buf;
	}
	return buf.toString(encoding || 'utf8');
};

/**
 * 对象排序
 * @param {Object} o, 需要排序的对象.
 * @return {Object} 安装key进行排序的对象
 * @public
 */
const sortObject = o => {
	if(!o || Array.isArray(o) || typeof o !== 'object') {
		return o;
	}
	var keys = Object.keys(o);
	keys.sort();
	var values = [];
	for(var i = 0; i < keys.length; i++) {
		var k = keys[i];
		values.push([k, sortObject(o[k])]);
	}
	return values;
};

/**
 * @desc 对象克隆
 * @Author yupeng
 * @param {Object} obj  需要克隆的对象.
 * @return {Object} 克隆出来的对象
 * @public
 */
const clone = obj => {
	var o;
	switch(typeof obj) {
		case 'undefined':
			break;
		case 'string':
			o = obj + '';
			break;
		case 'number':
			o = obj - 0;
			break;
		case 'boolean':
			o = obj;
			break;
		case 'object':
			if(obj === null) {
				o = null;
			} else {
				if(obj instanceof Array) {
					o = [];
					for(var i = 0, len = obj.length; i < len; i++) {
						o.push(clone(obj[i]));
					}
				} else {
					o = {};
					for(var k in obj) {
						o[k] = clone(obj[k]);
					}
				}
			}
			break;
		default:
			o = obj;
			break;
	}
	return o;
};

/***
 * 计算相对位置工具用于定位(像弹出层)
 * 
 * 
 */
const offset = (el, parent) => {
	var o = {};
	parent = parent ? parent : el.offsetParent ? el.offsetParent : false;
	if(!parent) {
		o.left = 0;
		o.top = 0;
		return o;
	}
	var l = 0,
		t = 0,
		temp = el;
	while(parent != temp) {
		if(temp.offsetParent != parent) {
			l += temp.offsetLeft;
			t += temp.offsetTop;
		} else {
			l += temp.offsetLeft;
			t += temp.offsetTop;
			break;
		}
		temp = temp.offsetParent;
	}
	o.left = l;
	o.top = t;
	return o;
}

/**
 * 将后台返回的数据key转换成驼峰表示法
 * data 生成对象
 * resultData 拷贝对象
 * flag=true 将驼峰转成下划线加小写(baseInfo=>base_info)
 */
const processKeyAndData = (data, resultData, flag, filterStr) => {
	let kyes, reg = flag ? /([A-Z])/g : /_(.)/g,
		toCase = flag ? ''.toLocaleLowerCase : ''.toLocaleUpperCase;
	for(let key in resultData) {
		if(filterStr) {
			if(filterStr.indexOf(key) == -1) {
				continue;
			}
		}
		kyes = key.replace(reg, function() {
			return flag ? '_' + toCase.call(arguments[1]) : toCase.call(arguments[1]);
		});
		data[kyes] = resultData[key];
	}
}

/**
 * parseFloat数值转换成2个小数点 
 * eg: 0.00
 * val 要转换的对象
 * author: wjl
 */
const tofixed = (val) => {
	val = val || '0.00';
	return parseFloat(val.toString()).toFixed(2);
}

/**
 * markSplit 符号分割
 * val: 值
 * mark 符号
 */
const markSplit = (val, mark) => {
	val = val || '';
	mark = mark || ','
	return val.indexOf(mark) != -1 ? val.split(mark) : [val]
}

/**
 * 分开导出，用哪个取哪个，引用时需要大括号 ，eg:import {md5,uuid} from 'common/utils',md5('333')
 */
module.exports = {
	offset,
	query,
	queryAll,
	uuid,
	uuidV4,
	sortObject,
	base64decode,
	base64encode,
	sha256,
	sha1,
	md5,
	clone,
	getQueryString,
	deepCopy,
	bubbleSort,
	processKeyAndData,
	tofixed,
	markSplit
};
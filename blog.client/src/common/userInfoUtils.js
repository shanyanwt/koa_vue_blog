import consts from './consts';
import { cookie, localStorage, sessionStorage, separator, separator1 } from './cacheUtils';

const getSession = 'getSessionStorage@'; //请求更新
const updateSession = 'updateSessionStorage@'; //推送更新
const completeSession = 'completeSessionStorage@'; //更新完成
let getter = false; //事件发起者
const getUserInfo = function() { //获取用户信息
	return sessionStorage(consts.USERINFO).getObject(consts.USERINFO);
}
let callBack = [] /*回调处理队列*/ ,
	noLogin = [] /*未登录处理队列*/ ,
	tm /*定时器*/ , tokenKey = consts.ACCESSTOKEN + separator + consts.ACCESSTOKEN /*token的key*/ ;
let setCallBack = function(callback, nologin) { //处理函数,界面初始化时会被调用
	getter = true;
	if(!getToken())
		tm || (tm = setTimeout(function() {
			getter = false;
			runCallBack(tokenKey, null, noLogin);
		}, 300));
	else
		callback(consts.USERINFO, getUserInfo());
	if(typeof callback == 'function')
		callBack.push(callback);
	if(typeof nologin == 'function')
		noLogin.push(nologin);
}
const runCallBack = function(key, value, callBacks) { //执行待处理队列
	callBacks.forEach(function(item, i, arr) {
		item(key, value);
	})
}
//登出调用
const logout = function() {
	runCallBack(tokenKey, null, noLogin);
}
const updateInfo = function(prefix, key) { //推送更新
	let value = sessionStorage(prefix).get(key);
	value = value ? value : consts.NULL;
	let key1 = updateSession + prefix + separator + key;
	window.localStorage.setItem(key1, value);
	window.localStorage.removeItem(key1);
}
const updateSessionStorage = function(prefix, key, obj) { //放入缓存并推送更新
	sessionStorage(prefix).setObject(key, obj);
	updateInfo(prefix, key);
}
const getInfo = function(key) { //请求更新
	window.localStorage.setItem(key, Date.now());
	window.localStorage.removeItem(key);
}
const getToken = function() { //获取token
	return sessionStorage(consts.ACCESSTOKEN).get(consts.ACCESSTOKEN) //cookie.get(consts.ACCESSTOKEN);
}
//多页面自动共享sessionStorage start
let userInfo = getUserInfo();
if(!userInfo) { //获取token和用户信息
	// 这个调用能触发目标事件，从而达到共享数据的目的
	localStorage(consts.SENDING).del(consts.SENDING);
	let key1 = getSession + tokenKey;
	key1 += separator1 + consts.USERINFO + separator + consts.USERINFO;
	getInfo(key1);
};
// 该事件是核心
window.addEventListener('storage', function(event) {
	let isSending = localStorage(consts.SENDING).get(consts.SENDING);
	if(!event.key //clear
		||
		event.key.indexOf('@') == -1 ||
		!event.newValue
	) {
		return;
	}
	if(!isSending && event.key.indexOf(getSession) != -1) { //处理请求更新
		// 已存在的标签页会收到这个事件
		let key = event.key.split('@')[1],
			arr = key.split(separator1);
		arr.map(function(item, i, arr) {
			localStorage(consts.SENDING).set(consts.SENDING, 'sending');
			let ar1 = item.split(separator)
			let value = sessionStorage(ar1[0]).get(ar1[1]);
			updateInfo(ar1[0], ar1[1]);
			if(i == arr.length - 1) {
				window.localStorage.setItem(completeSession, true);
			}
		});
	} else {
		// 新开启的标签页会收到这个事件
		//		if(getter)
		//			localStorage(consts.SENDING).del(consts.SENDING);
		if(event.key.indexOf(updateSession) != -1) { //处理推送更新
			clearTimeout(tm);
			let key = event.key.split('@')[1],
				arr = key.split(separator),
				prefix = arr[0],
				key1 = arr[1];
			sessionStorage(prefix).set(key1, event.newValue);
			if(key.indexOf(consts.ACCESSTOKEN) != -1 || key.indexOf(consts.USERINFO) != -1)
				event.newValue && event.newValue != consts.NULL ? runCallBack(key, event.newValue, callBack) : runCallBack(key, null, noLogin);
			else {
				let value = event.newValue == consts.NULL ? null : event.newValue;
				runCallBack(key, value, callBack)
			}
		}
		if(event.key.indexOf(completeSession) != -1 && event.newValue && getter) { //处理更新完成
			getter = false;
			window.localStorage.removeItem(completeSession);
		}
	}
});
//多页面自动共享sessionStorage end

export default {
	getUserInfo,
	updateInfo,
	setCallBack,
	getToken,
	updateSessionStorage,
	logout
}
export {
	getUserInfo,
	updateInfo,
	setCallBack,
	getToken,
	updateSessionStorage,
	logout
}
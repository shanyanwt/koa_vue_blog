'use strict';
/*!
 * cacheUtils.js v1.0.0
 * 缓存工具类
 * 目前缓存有cookie、LocalStorage、SessionStorage
 * Dom Storage 是通过存储字符串的 Key/Value 对来提供的，并提供 5MB （不同浏览器可能不同，分 HOST)的存储空间（Cookies 才 4KB)。
 * 另外 Dom Storage 存储的数据在本地，不像 Cookies，每次请求一次页面，Cookies 都会发送给服务器。
 *
 * DOM Storage 分为 sessionStorage 和 localStorage。
 * localStorage 对象和 sessionStorage 对象使用方法基本相同，它们的区别在于作用的范围不同。
 * sessionStorage 用来存储与页面相关的数据，它在页面关闭后无法使用。
 * 而 localStorage 则持久存在，在页面关闭后也可以使用
 *
 * Author: liaoxm
 * Date: 2016-06-17
 *
 */
import CONSTS from './consts';
const separator='__',separator1='|';

const sessionStorage = prefix => {
  /**
   * @desc 存入缓存
   * @param {String} key
   * @param {String} val
   * @public
   */
    var set = (key, val) => {
        key = prefix + separator + key;
        if (!window.sessionStorage) {
            window.alert('Your browser not support localStorage. Please check set browser private model.');
            return;
        }
        try {
            window.sessionStorage.setItem(key, val);
        } catch (e) {
            window.console.warn('Your browser not support localStorage. ' + e);
            window.alert('Your browser not support localStorage. Please check set browser private model.');
        }
    };

  /**
   * @desc 获取数据
   * @param {String} key
   * @return {String} 获取的字符串内容
   * @public
   */
    var get = key => {
        key = prefix + separator + key;
        return window.sessionStorage.getItem(key) === CONSTS.NULL||window.sessionStorage.getItem(key) === null ? '' : window.sessionStorage.getItem(key);
    };
    return {
        set: set,
        get: get,

    /**
     * @desc 存入缓存，Object
     * @param {String} key
     * @param {Object} val
     * @public
     */
        setObject: (key, val) => {
            val = JSON.stringify(val);
            set(key, val);
        },

    /**
     * @desc 获取数据,Object
     * @param {String} key
     * @return {Object}
     * @public
     */
        getObject: key => {
            let result = get(key);
            let json = null;
            if (!result) {
                return undefined;
            } else {
                try {
                    json = JSON.parse(result);
                } catch (e) {
                    console.log('缓存数据解决json异常!');
                }
                return json;
            }
        },

    /**
     * @desc 删除数据
     * @param {String} key
     * @public
     */
        del: key => {
            key = prefix + separator + key;
            window.sessionStorage.removeItem(key);
        },

    /**
     * @desc 清理缓存
     * @public
     */
        clear: () => {
            window.sessionStorage.clear();
        },

    /**
     * @desc 获取key根据角标
     * @param {Number} i
     * @return {String} val
     * @public
     */
        key: i => {
            i = i || 0;
            return Object.keys(window.sessionStorage)[i];
        },

    // 获取所有的key
        keys: () => {
            return Object.keys(window.sessionStorage);
        },

    // 获取所有的value
        values: () => {
            return Object.values(window.sessionStorage);
        },

        length: () => {
            return Object.keys(window.sessionStorage).length;
        }
    };
};

const localStorage = prefix => {
  /**
   * @desc 存入缓存，String
   * @param {String} key
   * @param {String} val
   * @public
   */
    var set = (key, val) => {
        key = prefix + separator + key;
        if (!window.localStorage) {
            window.alert('Your browser not support localStorage. Please check set browser private model.');
            return;
        }
        try {
            window.localStorage.setItem(key, val);
        } catch (e) {
            window.console.warn('Your browser not support localStorage. ' + e);
            window.alert('Your browser not support localStorage. Please check set browser private model.');
        }
    };

  /**
   * @desc 获取数据,String
   * @param {String} key
   * @return {String}
   * @public
   */
    var get = key => {
        key = prefix + separator + key;
        return window.localStorage.getItem(key) === CONSTS.NULL||window.localStorage.getItem(key) === null ? '' : window.localStorage.getItem(key);
    };
    return {

        set: set,
        get: get,

    /**
     * @desc 存入缓存，Object
     * @param {String} key
     * @param {Object} val
     * @public
     */
        setObject: (key, val) => {
            val = JSON.stringify(val);
            set(key, val);
        },

    /**
     * @desc 获取数据,Object
     * @param {String} key
     * @return {Object}
     * @public
     */
        getObject: key => {
            let result = get(key);
            let json = null;
            if (!result) {
                return undefined;
            } else {
                try {
                    json = JSON.parse(result);
                } catch (e) {
                    console.log('缓存数据解决json异常!');
                }
                return json;
            }
        },

    /**
     * @desc 删除数据
     * @param {String} key
     * @public
     */
        del: key => {
            key = prefix + separator + key;
            window.localStorage.removeItem(key);
        },

    /**
     * @desc 清除数据,instanceId需要保留
     * @param {String} key
     * @public
     */
        clear: () => {
            window.localStorage.clear();
            cookie.clear();
            window.sessionStorage.clear();
        },

    /**
     * @desc 获取key根据角标
     * @param {Number} i
     * @return {String} key
     * @public
     */
        key: i => {
            i = i || 0;
            return Object.keys(window.localStorage)[i];
        },

    /**
     * @desc 获取所有的key
     * @param {Number} i
     * @return {Array} key数组
     * @public
     */
        keys: () => {
            return Object.keys(window.localStorage);
        },

    /**
     * @desc 获取所有的value
     * @return {Object} 数据集合
     * @public
     */
        values: () => {
            return Object.values(window.localStorage);
        },

    /**
     * @desc 获取key的数量
     * @return {Number} key数量
     * @public
     */
        length: () => {
            return Object.keys(window.localStorage).length;
        }
    };
};

/**
 * 缓存cookie默认存储一个月
 * @type {Object}
 */
const cookie = {
  /**
   * @desc 存入缓存，String
   * @param {String} key
   * @param {String} val
   * @param {time} time 保留时间
   * @param {String} domain  域名
   * @param {Boolean} temporary  cookie 过期时间为关闭浏览器
   * @public
   */
    set: (key, val, time, domain,temporary) => {
        var exp = new Date();
        var t = !time ? (exp.getTime() + 2592000000) : (exp.getTime() + time);
        exp.setTime(t);

        if (domain === true) {
      /* no-useless-escape */
      // .xx.com
            domain = document.domain.replace(/[a-zA-Z]+/, '');
        }
        var extr = domain ? ';domain=' + domain + ';path=/' : ';path=/';
        document.cookie = key + '=' + escape(val) + (temporary?'':';expires=' + exp.toGMTString()) + extr;
    },

  /**
   * @desc 获取数据,String
   * @param {String} key
   * @return {String}
   * @public
   */
    get: key => {
        var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        var arr = document.cookie.match(reg);
        return arr ? unescape(arr[2]) : '';
    },

  /**
   * @desc 存入缓存，Object
   * @param {String} key
   * @param {Object} val
   * @public
   */
    setObject: (key, val, time, domain,temporary) => {
        val = JSON.stringify(val);
        var exp = new Date();
        var t = !time ? (exp.getTime() + 2592000000) : (exp.getTime() + time);
        exp.setTime(t);

        if (domain === true) {
      /* no-useless-escape */
      // .xx.com
            domain = document.domain.replace(/[a-zA-Z]+/, '');
        }
        var extr = domain ? ';domain=' + domain + ';path=/' : ';path=/';
        document.cookie = key + '=' + escape(val) + (temporary?'':';expires=' + exp.toGMTString()) + extr;
    },

  /**
   * @desc 获取数据,Object
   * @param {String} key
   * @return {Object}
   * @public
   */
    getObject: key => {
        var reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        var arr = document.cookie.match(reg);
        let json = null;
        try {
            json = JSON.parse(arr ? unescape(arr[2]) : '');
        } catch (e) {
            console.log('缓存数据解决json异常!');
        }
        return json;
    },

  /**
   * @desc 删除数据
   * @param {String} key
   * @param {String} domain  域名
   * @public
   */
    del:function (key, domain) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.get(key);

        if (domain === true) {
            domain = document.domain.replace(/[a-zA-Z]+/, '');
        }
        var extr = domain ? ';domain=' + domain + ';path=/' : ';path=/';
        if (cval) {
            document.cookie = key + '=1;expires=' + exp.toGMTString() + extr;
        }
    },

  /**
   * @desc 清理数据
   * @public
   */
    clear:function (domain){
    	if (domain === true) {
            domain = document.domain.replace(/[a-zA-Z]+/, '');
        }
    	var extr = domain ? ';domain=' + domain + ';path=/' : ';path=/';
        var keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (!keys || !keys.length) return;
        for (var i = keys.length-1;i>=0;i--) {
            document.cookie = keys[i] + '=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;'+ extr;
        }
    }
};

const globalStatus = (prefix,model,localStorage) => {
  /**
   * @desc 存入缓存，String
   * @param {String} key
   * @param {String} val
   * @public
   */
  	let storage=localStorage||'sessionStorage';
    var set = (key, val) => {
        key = prefix + separator + model + separator + key;
        if (!window[storage]) {
            window.alert('Your browser not support '+storage+'. Please check set browser private model.');
            return;
        }
        try {
            window[storage].setItem(key, val);
        } catch (e) {
            window.console.warn('Your browser not support '+storage+'. ' + e);
            window.alert('Your browser not support '+storage+'. Please check set browser private model.');
        }
    };

  /**
   * @desc 获取数据,String
   * @param {String} key
   * @return {String}
   * @public
   */
    var get = key => {
        key = prefix + separator + model + separator + key;
        return window[storage].getItem(key) === CONSTS.NULL||window[storage].getItem(key) === null ? '' : window[storage].getItem(key);
    };
    return {

        set: set,
        get: get,

    /**
     * @desc 存入缓存，Object
     * @param {String} key
     * @param {Object} val
     * @public
     */
        setObject: (key, val) => {
            val = JSON.stringify(val);
            set(key, val);
        },

    /**
     * @desc 获取数据,Object
     * @param {String} key
     * @return {Object}
     * @public
     */
        getObject: key => {
            let result = get(key);
            let json = null;
            if (!result) {
                return undefined;
            } else {
                try {
                    json = JSON.parse(result);
                } catch (e) {
                    console.log('缓存数据解决json异常!');
                }
                return json;
            }
        },

    /**
     * @desc 删除数据
     * @param {String} key
     * @public
     */
        del: key => {
            key = prefix + separator + model + separator + key;
            window[storage].removeItem(key);
        },

    /**
     * @desc 清除数据,instanceId需要保留
     * @param {String} key
     * @public
     */
        clear: () => {
        	Object.keys(window[storage]).map(function(key,i,arr){
        		key.indexOf(prefix)!=-1 && window[storage].removeItem(key);
        	});
        },

    /**
     * @desc 获取key根据角标
     * @param {Number} i
     * @return {String} key
     * @public
     */
        key: i => {
            i = i || 0;
            return Object.keys(window[storage])[i];
        },

    /**
     * @desc 获取所有的key
     * @param {Number} i
     * @return {Array} key数组
     * @public
     */
        keys: () => {
            return Object.keys(window[storage]);
        },

    /**
     * @desc 获取所有的value
     * @return {Object} 数据集合
     * @public
     */
        values: () => {
            return Object.values(window[storage]);
        },

    /**
     * @desc 获取key的数量
     * @return {Number} key数量
     * @public
     */
        length: () => {
            return Object.keys(window[storage]).length;
        }
    };
};

export default {
    localStorage,
    cookie,
    sessionStorage,
    globalStatus,
    separator,
    separator1
};

export { localStorage, cookie, sessionStorage,globalStatus,separator,separator1 };

'use strict';
/*!
 * dateFormat.js v1.0.0
 * 日期格式化工具类
 *
 * Author: liaoxm
 * Date: 2016-06-16
 *
 */
const ISO8601_FORMAT = 'yyyy-MM-dd hh:mm:ss';
const ISO8601_FORMAT_WITHOUT_TIME = 'yyyy-MM-dd';
const ISO8601_WITH_TZ_OFFSET_FORMAT = 'yyyy-MM-ddThh:mm:ssO';
const DATETIME_FORMAT = 'dd MM yyyy hh:mm:ss.SSS';
const ABSOLUTETIME_FORMAT = 'hh:mm:ss.SSS';

/**
 * 补0
 * @private
 */
function padWithZeros(vNumber, width) {
    var numAsString = vNumber + '';
    while (numAsString.length < width) {
        numAsString = '0' + numAsString;
    }
    return numAsString;
}
/**
 * 补0
 * @private
 */
function addZero(vNumber) {
    return padWithZeros(vNumber, 2);
}

/**
 * 时区
 * @private
 */
function offset(timezoneOffset) {
    // Difference to Greenwich time (GMT) in hours
    var os = Math.abs(timezoneOffset);
    var h = String(Math.floor(os / 60));
    var m = String(os % 60);
    if (h.length === 1) {
        h = '0' + h;
    }
    if (m.length === 1) {
        m = '0' + m;
    }
    return timezoneOffset < 0 ? '+' + h + m : '-' + h + m;
}
/**
 * 时间格式化
 * @param {Date|String|timestamp}  date 需要格式化的对象
 * @public
 */
const dateFormat = function(date, format, timezoneOffset) {
    if (!date) {
        return date;
    }
    if (typeof (date) === 'string' || typeof (date) === 'number') {
        date = new Date(arguments[0]);
        format = arguments[1];
        timezoneOffset = arguments[2];
    }
    if (format === undefined) {
        format = ISO8601_FORMAT;
    }
    if (timezoneOffset === undefined) {
        timezoneOffset = date.getTimezoneOffset();
    }
    date.setUTCMinutes(date.getUTCMinutes() - timezoneOffset);
    var vDay = addZero(date.getUTCDate());
    var vMonth = addZero(date.getUTCMonth() + 1);
    var vYearLong = addZero(date.getUTCFullYear());
    var vYearShort = addZero(date.getUTCFullYear().toString().substring(2, 4));
    var vYear = (format.indexOf('yyyy') > -1 ? vYearLong : vYearShort);
    var vHour = addZero(date.getUTCHours());
    var vMinute = addZero(date.getUTCMinutes());
    var vSecond = addZero(date.getUTCSeconds());
    var vMillisecond = padWithZeros(date.getUTCMilliseconds(), 3);
    var vTimeZone = offset(timezoneOffset);
    date.setUTCMinutes(date.getUTCMinutes() + timezoneOffset);
    var formatted = format
        .replace(/dd/g, vDay)
        .replace(/MM/g, vMonth)
        .replace(/y{1,4}/g, vYear)
        .replace(/hh/g, vHour)
        .replace(/mm/g, vMinute)
        .replace(/ss/g, vSecond)
        .replace(/SSS/g, vMillisecond)
        .replace(/O/g, vTimeZone);
    return formatted;
};

/**
 * 时间格式化为yyyy/MM/dd
 * @param {Date|String|timestamp}  date 需要格式化的对象
 * @public
 */
const dateConversion = function(data, format){
	if(!data){
		console.log('请传入时间戳')
	}
	if(!format){
		format = ISO8601_FORMAT_WITHOUT_TIME;
	}
	return this.dateFormat(data * 1000, format).replace(/-/g,'/');
}
/**
 * 格式化时间当天显示时间
 * 昨天显示昨天
 * 前天显示前天
 * 
 */
const datatime = time =>{	
				var date = (typeof time === 'number') ? new Date(time) : new Date((time || '').replace(/-/g, '/'))
			    var diff = (((new Date()).getTime() - date.getTime()) / 1000)
			    var dayDiff = Math.floor(diff / 86400)
			    var oneDay = new Date().getDate() - date.getDate();
			    var isValidDate = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())
			
			    if (!isValidDate) {
			        console.error('not a valid date')
			        return time
			    }
			
			        var today = new Date(date)
			        var year = today.getFullYear()
			        var month = ('0' + (today.getMonth() + 1)).slice(-2)
			        var day = ('0' + today.getDate()).slice(-2)
			        var hour = ('0' + today.getHours()).slice(-2)
			        var minute = ('0'+today.getMinutes()).slice(-2)
			    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 3) {
			        return `${year}-${month}-${day}`
			    }
			        return (dayDiff === 0 && oneDay===0 ) && (
			            diff < 86400 && `${hour}:${minute}`
			            ) ||
			            (dayDiff < 2&& oneDay<2) && '昨天'||
			            (dayDiff < 3 && oneDay<3) && '前天'||
			            oneDay >=3 && `${year}-${month}-${day}`
}				

/**
 * 格式化时间与当前时间差
 * @param {String} item 一个由逗号连接的包含一个或多个CSS选择器的字符串
 * @return {NodeList} 一个non-live的 NodeList 类型的对象
 * @public
 */
const diffTime = item => {
    var nowTime = new Date().getTime();
    var minuteTime = 60 * 1000;
    var hourTime = 60 * minuteTime;
    var dayTime = 24 * hourTime;
    var monthTime = dayTime * 30;
    var yearTime = monthTime * 12;

    var publishTime = new Date(item).getTime();
    var historyTime = parseInt(nowTime) - parseInt(publishTime);
    var descTime;
    if (historyTime >= yearTime) {
        // 按年算
        descTime = parseInt(historyTime / yearTime) + '年前';
    } else if (historyTime < yearTime && historyTime >= monthTime) {
        // 按月算
        descTime = parseInt(historyTime / monthTime) + '月前';
    } else if (historyTime < monthTime && historyTime >= dayTime) {
        // 按天算
        descTime = parseInt(historyTime / dayTime) + '天前';
    } else if (historyTime < dayTime && historyTime >= hourTime) {
        // 按小时算
        descTime = parseInt(historyTime / hourTime) + '小时前';
    } else if (historyTime < hourTime && historyTime >= minuteTime) {
        // 按分钟算
        descTime = parseInt(historyTime / minuteTime) + '分钟前';
    } else {
        descTime = '刚刚';
    }
    return descTime;
};
/**
 *   功能:实现VBScript的DateAdd功能.
 *   参数:interval,字符串表达式，表示要添加的时间间隔.
 *   参数:number,数值表达式，表示要添加的时间间隔的个数.
 *   参数:date,时间对象.
 *   返回:新的时间对象.
 *   var now = new Date();
 *   var newDate = DateAdd( "d", 5, now);
 */
const dateAdd = (interval, number, date) => {
    if (!date) {
        return date;
    }
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }
    switch (interval) {
        case 'y':
            {
                date.setFullYear(date.getFullYear() + number);
                return date;
            }
        case 'q':
            {
                date.setMonth(date.getMonth() + number * 3);
                return date;
            }
        case 'm':
            {
                let d = date.setMonth(date.getMonth() + number, 0);
                // let m = date.getMonth();
                let currentDays = new Date(d).getDate() < new Date().getDate() ? new Date(d).getDate() : new Date().getDate();
                // console.log('new Date(d).getDate():' + new Date(d).getDate() + '  new Date().getDate()：' + new Date().getDate());
                // console.log(d + ':d:' + currentDays + 'm::' + m);
                return date.setMonth(date.getMonth(), currentDays);
            }
        case 'w':
            {
                date.setDate(date.getDate() + number * 7);
                return date;
            }
        case 'd':
            {
                date.setDate(date.getDate() + number);
                return date;
            }
        case 'H':
            {
                date.setHours(date.getHours() + number);
                return date;
            }
        case 'M':
            {
                date.setMinutes(date.getMinutes() + number);
                return date;
            }
        case 'S':
            {
                date.setSeconds(date.getSeconds() + number);
                return date;
            }
        default:
            {
                date.setDate(date.getDate() + number);
                return date;
            }
    }
};

export default {
	datatime,
    diffTime,
    dateFormat,
    dateAdd,
    ISO8601_FORMAT,
    ISO8601_FORMAT_WITHOUT_TIME,
    ISO8601_WITH_TZ_OFFSET_FORMAT,
    dateConversion,
    DATETIME_FORMAT,
    ABSOLUTETIME_FORMAT
};

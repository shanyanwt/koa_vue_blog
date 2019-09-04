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
const ISO8601_WITH_TZ_OFFSET_FORMAT = 'yyyyMMddhhmmss';
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


module.exports =  {
    dateFormat,
    ISO8601_FORMAT,
    ISO8601_FORMAT_WITHOUT_TIME,
    ISO8601_WITH_TZ_OFFSET_FORMAT,
    DATETIME_FORMAT,
    ABSOLUTETIME_FORMAT
};

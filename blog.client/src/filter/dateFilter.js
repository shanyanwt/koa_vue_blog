
let format = (value) => {
    return value >= 10 ? value : '0' + value;
};
/**
 * 时间戳格式化
 */
export let dateFilter = (time, type) => {
    let date = new Date(time*1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    let result;
    switch (type) {
    case 0: // 01-05
        result = `${format(month)}-${format(day)}`;
        break;
    case 1: // 11:12
        result = `${format(hours)}-${format(minutes)}`;
        break;
    case 2: // 2015-01-05
        result = `${year}-${format(month)}-${format(day)}`;
        break;
    case 3: // 2015-01-05 11:12
        result = `${year}-${format(month)}-${format(day)} ${format(hours)}:${format(minutes)}`;
        break;
    case 4: // 2015-01-05 11:12:06
        result = `${year}-${format(month)}-${format(day)} ${format(hours)}:${format(minutes)}:${format(second)}`;
        break;
    default: // 2015-01-05 11:12:06
        result = `${year}-${format(month)}-${format(day)} ${format(hours)}:${format(minutes)}:${format(second)}`;
    }
    return result;
};
//日期格式化
export let dateTwoFilter = (time, type) => {
	var date = new Date(time);
	let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    let result;
    switch (type) {
    case 0: // 01-05
        result = `${format(month)}-${format(day)}`;
        break;
    case 1: // 11:12
        result = `${format(hours)}-${format(minutes)}`;
        break;
    case 2: // 2015-01-05
        result = `${year}-${format(month)}-${format(day)}`;
        break;
    case 3: // 2015-01-05 11:12
        result = `${year}-${format(month)}-${format(day)} ${format(hours)}:${format(minutes)}`;
        break;
    case 4: // 2015-01-05 11:12:06
        result = `${year}-${format(month)}-${format(day)} ${format(hours)}:${format(minutes)}:${format(second)}`;
        break;
    default: // 2015-01-05 11:12:06
        result = `${year}-${format(month)}-${format(day)} ${format(hours)}:${format(minutes)}:${format(second)}`;
    }
    return result;
}
//消息类格式化
export let dateFormatFilter = (time) => {
	var date = (typeof time === 'number') ? new Date(time) : new Date((time || '').replace(/-/g, '/'))
    var diff = (((new Date()).getTime() - date.getTime()) / 1000)
    var dayDiff = Math.floor(diff / 86400)
    var oneDay = new Date().getDate() - date.getDate();
    var isValidDate = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())
    if (!isValidDate) {
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
    return (dayDiff === 0 && oneDay===0 ) && (diff < 86400 && `${hour}:${minute}`) || (dayDiff < 2&& oneDay<2) && '昨天'||(dayDiff < 3 && oneDay<3) && '前天'|| oneDay >=3 && `${year}-${month}-${day}`
}

/*
 * 倒计时过滤器 格式 2017-12-12
 */
 
export let ShowCountDown = (time, type) => {
	var date1 = new Date(time);
	let year = date1.getFullYear();
	let month = date1.getMonth() + 1;
	let day = date1.getDate();
	let ref = null;
	window.setInterval(function() {
		console.log(year,month,day)
	   	var now = new Date(); 
		var endDate = new Date(year, month-1, day); 
		var leftTime=endDate.getTime()-now.getTime(); 
		var leftsecond = parseInt(leftTime/1000); 
		//var day1=parseInt(leftsecond/(24*60*60*6)); 
		var day1=Math.floor(leftsecond/(60*60*24)); 
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
		ref = "活动提示距离"+year+"年"+month+"月"+day+"日还有："+day1+"天"+hour+"小时"+minute+"分"+second+"秒";
		console.log(ref)
		return ref;
	},1000);
	console.log(ref,"cdcdd")
};

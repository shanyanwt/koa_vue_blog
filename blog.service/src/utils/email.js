/* 
	邮箱服务
 */
const nodemailer = require("nodemailer");
// 参数：发件人，收件人，主题，正文（支持html格式）
/* 
 from          发件人
 aliasName     邮箱抬头
 tos          收件人
 subject       主题
 msg            正文（支持html格式
 */
function sendEmail(from, aliasName, tos, subject, msg) {
	return new Promise((resolve, reject) => {
		const smtpTransport = nodemailer.createTransport({
			service: '163',
			secureConnection: true, // use SSL
			secure: true,
			port: 465,
			auth: {
				user: from,
				pass: 'yanjiang123',
			}
		});
		smtpTransport.sendMail({
			from: aliasName + ' ' + '<' + from + '>',
			to: tos,//收件人邮箱，多个邮箱地址间用英文逗号隔开
			subject: subject, //邮件主题
			//text    : msg,
			html: msg
		}, function(err, res) {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		});
	})
}
module.exports = {
	sendEmail
};

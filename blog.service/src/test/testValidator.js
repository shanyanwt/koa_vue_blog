'use strict';

const {
	XValidator,
	Rule
} = require('../validator/validator.js');

/* 
	模拟用户注册规则
 */

class RegisterValidator extends XValidator {
	constructor() {
		super();
		this.name = [
			new Rule('isNotEmpty', '昵称不可为空'),
			new Rule('isLength', '昵称长度必须在2~10之间', 2, 10)
		];
		this.email = [
			new Rule('isOptional'),
			new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
		];
		this.password = [
			// 自定义matches 方法
			new Rule(
				'matches',
				'密码长度必须在6~22位之间，包含字符、数字和 _ ',
				/^[A-Za-z0-9_*&$#@]{6,22}$/
			)
		];
		this.confirm_password = new Rule('isNotEmpty', '确认密码不可为空');
	}
	/* 
		自定义 calidate 校验规则
		必须以 calidate开头的一个方法， data是传入参数
		 成功是 返回true
		 错误 ConfirmPassword 
	 */
	validateConfirmPassword(data) {
		if (!data.body.password || !data.body.confirm_password) {
			return [false, '两次输入的密码不一致，请重新输入'];
		}
		let ok = data.body.password === data.body.confirm_password;
		if (ok) {
			return ok;
		} else {
			return [false, '两次输入的密码不一致，请重新输入'];
		}
	}
}

class LoginValidator extends XValidator {
	constructor() {
		super();
		this.id = [
			new Rule('isNotEmpty', 'ID不可为空')
		];
	}
}
module.exports = {
	RegisterValidator,
	LoginValidator
};

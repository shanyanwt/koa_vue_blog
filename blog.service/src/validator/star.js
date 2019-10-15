/** 收藏校验器
 * @param {Object}
 * @return {Boolean}
 * @author Jiang Xiao Er
 **/
const {
	XValidator,
	Rule
} = require('../validator/validator.js');


class starValidator extends XValidator {
	constructor() {
		super();
		this.article_id = new Rule('isNotEmpty', '文章ID不可为空');
	}
	validateRepeat(data) {
		var uid = data.auth.user ? data.auth.user.id : null;
		if (!uid) {
			return [false, '用户信息不存在'];
		} else {
			return true;
		}
	}
}

module.exports = {
	starValidator
};

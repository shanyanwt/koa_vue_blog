'use strict';
/*!
 * api.js v1.0.0
 * api配置类
 */

import { ARTICLEAPI, UPLOAD, IMGURL } from './domain';

/**
 * api的版本，鉴于api的版本可能会出现不统一的情况，所以还是在url里面进行拼接
 */
/* eslint-disable no-unused-vars */
const API_VERSION = 'v1';

//文章列表
const API = {
	article_add: ARTICLEAPI + API_VERSION + '/add',
	article_select: ARTICLEAPI + API_VERSION + '/select',
	article_list: ARTICLEAPI + API_VERSION + '/article_list',
	article_update: ARTICLEAPI + API_VERSION + '/update',
	article_delete: ARTICLEAPI + API_VERSION + '/del',
	article_search: ARTICLEAPI + API_VERSION + '/search',
	admin_add: ARTICLEAPI + API_VERSION + '/admin_add',
	admin_select: ARTICLEAPI + API_VERSION + '/admin_select',
	admin_check: ARTICLEAPI + API_VERSION + '/admin_check',
	admin_list: ARTICLEAPI + API_VERSION + '/admin_list',
	admin_update: ARTICLEAPI + API_VERSION + '/admin_update',
	admin_delete: ARTICLEAPI + API_VERSION + '/admin_del',
	admin_login: ARTICLEAPI + API_VERSION + '/admin_login',
	upload: ARTICLEAPI + API_VERSION + '/upload',
	github: 'https://api.github.com/repos/shanyanwt/'
};
const UPLOAD_API = {
	UPLOAD_AJXA: UPLOAD + 'upload',
}

export default {
	API,
	UPLOAD_API,
	IMGURL
};
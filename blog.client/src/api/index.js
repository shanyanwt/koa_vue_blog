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

//账户系统
const ARTICLE_API = {
	article_add: ARTICLEAPI + API_VERSION + '/add',
	article_select: ARTICLEAPI + API_VERSION + '/select',
	article_list: ARTICLEAPI + API_VERSION + '/article_list',
	article_update: ARTICLEAPI + API_VERSION + '/update',
	article_delete: ARTICLEAPI + API_VERSION + '/delete',
	article_search: ARTICLEAPI + API_VERSION + '/search',
	upload: ARTICLEAPI + API_VERSION + '/upload',
};
const UPLOAD_API = {
	UPLOAD_AJXA: ARTICLEAPI + API_VERSION + '/upload',
}

export default {
	ARTICLE_API,
	UPLOAD_API,
	IMGURL
};
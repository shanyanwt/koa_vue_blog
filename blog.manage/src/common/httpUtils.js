'use strict'

/*
 *
 * http请求工具类
 * eg：
 * 		import axios from 'common/httpUtils';
        axios({
		  method:'get',
		  url: 'xxxx/xxxxx',
		  params: {
		    id:id,
		    token:token
		  }
		})
		.then(response => {
		  sucess(response);
		}).catch(error => {
			error(error);
		});
 * 		axios({
		  method:'post',
		  url: 'xxxx/xxxxx',
		  data: {
		  	id:id,
		    token:token
		  }
		}).then(response => {
		    sucess(response);
		}).catch(error => {
			error(error);
		});

 *  并发执行

		function getUserAccount() {
		  return axios.get('/user/12345');
		}

		function getUserPermissions() {
		  return axios.get('/user/12345/permissions');
		}

		axios.all([getUserAccount(), getUserPermissions()])
		  .then(axios.spread(function (acct, perms) {
		    // Both requests are now complete
		  }));
 *
 */

// import iview from 'iview';
/*require('es6-promise').polyfill()*/
import axios from 'axios'
import consts from './consts'
import cacheUtils from './cacheUtils'
import utils from './utils'
axios.defaults.timeout = 5000
axios.defaults.hasGlobalSpin = true
axios.defaults.headers.post[consts.CONTENT_TYPE] = consts.CONTENT_TYPE_VALUE

// POST传参序列化,增加token
axios.interceptors.request.use((config) => {
	//	console.log('请求参数:' + JSON.stringify(config))
	// 加载loading动画
	//		iview.LoadingBar.start();
	/*if(config.hasGlobalSpin === true) {
		document.querySelector('#global-spin').style.display = 'block'
	}*/
	return config
}, (error) => {
	console.log('错误的传参')
	//	iview.LoadingBar.error();
	/*document.querySelector('#global-spin').style.display = 'none'*/
	return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
	//	console.log('请求结果:' + JSON.stringify(res.data))
	//	iview.LoadingBar.finish();
	if(!res.data.result_data) {
		res.data.result_data = [];
	}
	if(res.data.result_data && Object.keys(res.data.result_data).indexOf('items') != -1 && res.data.result_data.items != null) {
		res.data.result_data = res.data.result_data['items']
	}
	/*setTimeout(function(){
		document.querySelector('#global-spin').style.display = 'none'
	},300);*/
	return res.data || res
}, (error) => {
	console.log('网络异常' + error)
	//	iview.LoadingBar.error();
	/*document.querySelector('#global-spin').style.display = 'none'*/
	return Promise.reject(error)
})
export default axios
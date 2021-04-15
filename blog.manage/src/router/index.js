
import Vue from 'vue';
import iView from 'view-design';
import VueRouter from 'vue-router';
import { routers, appRouter } from './router';
import cacheUtils from 'common/cacheUtils'
import consts from 'common/consts'
Vue.use(VueRouter);

//路由配置
const RouterConfig = {
	routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
	let userInfo = cacheUtils.localStorage(consts.USERINFO).get(consts.USERINFO)
	if (!userInfo && to.name != 'login') { // 判断是否已经登录且前往的是登录页
		next({
			name: 'login'
		});
	} else if (userInfo && to.name == 'index') {
		next({
			name: 'home'
		});
	} else {
		next();
	}
});
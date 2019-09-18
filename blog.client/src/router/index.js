import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			component: resolve => require(['../view/main.vue'], resolve),
			children: [ {
					path: '/',
					name:'index',
					component: resolve => require(['../view/index/index.vue'], resolve)
				}, {
					path: '/about',
					component: resolve => require(['../components/about.vue'], resolve)
				},{
					path: '/article/:id(\\d+)',
					component: resolve => require(['../view/article/details.vue'], resolve)
				}, {
					path: '/postedit',
					component: resolve => require(['../view/article/postedit.vue'], resolve),
					/*beforeEnter:(to,from,next) => {
			            console.log(to)
			          	console.log("=======上是to下是from==========")
			            console.log(from)
				        / next({path:'/index'})/可以执行  里面有trun  false打不开   可执行和不
				        /执行路径  还可以匿名函数
			        }*/
				}, {
					path: '/tools',
					component: resolve => require(['../view/article/tools.vue'], resolve)
				}, {
					path: '/history',
					component: resolve => require(['../view/article/history.vue'], resolve)
				}, {
					path: '/regular',
					component: resolve => require(['../view/test/regular.vue'], resolve)
				}, {
					path: '/search',
					component: resolve => require(['../view/search/search.vue'], resolve)
				}, {
					path: '/autograph',
					component: resolve => require(['../view/wx/autograph.vue'], resolve)
				}, {
					path: '/codeImg',
					component: resolve => require(['../view/wx/codeImg.vue'], resolve)
				}, {
					path: '/popper',
					component: resolve => require(['../view/test/popper/index.vue'], resolve)
				}, {
					path: '/music',
					component: resolve => require(['../view/music/music.vue'], resolve)
				},

				{
					path: '/404',
					component: resolve => require(['../error/404.vue'], resolve)
				},
			]
		},
		{
			/*404页面*/
			path: '*',
			redirect: '/404'
		}
	]
})
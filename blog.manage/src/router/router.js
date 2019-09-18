import Main from '@/view/main.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
	path: '/login',
	name: 'login',
	meta: {
		title: 'Login - 登录'
	},
	component: () =>
		import('@/view/login/login.vue')
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
	path: '/',
	name: 'index',
	component: Main,
	children: [{
			path: 'home',
			name: 'home',
			component: resolve => require(['../view/index/index.vue'], resolve)
	},
		{
			path: 'articleList',
			name: 'articleList',
			component: resolve => require(['../view/articleList.vue'], resolve)
		},
		{
			path: '/rtf',
			name: 'rtf',
			component: resolve => require(['../view/rtf.vue'], resolve)
		}, {
			path: '/user',
			name: 'user',
			component: resolve => require(['../view/user.vue'], resolve)
		},
		{
			path: '/about',
			name: 'about',
			component: resolve => require(['../view/about/about.vue'], resolve)
		},{
			path: '/file',
			name: 'file',
			component: resolve => require(['../view/file.vue'], resolve)
		}
	]
}];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
	loginRouter,
	...appRouter,
];
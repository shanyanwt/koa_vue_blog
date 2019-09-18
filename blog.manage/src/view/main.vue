<template>

	<div class="layout" :class="{'layout-hide-text': spanLeft < 3}">
		<Row type="flex">
			<i-col :span="spanLeft" class="layout-menu-left">
				<Menu :active-name="setActive" theme="dark" width="auto" @on-select="routeTo">
					<div class="layout-logo-left">
						<h3 @click="routeTo('home')">时刻点管理系统</h3>
					</div>
					<div v-for="item in Menu" ref="me">
						<Menu-item :name="item.url">
							<Icon :type="item.icon" :size="iconSize"></Icon>
							<span class="layout-text">{{item.text}}</span>
						</Menu-item>
					</div>
				</Menu>
			</i-col>
			<i-col :span="spanRight">
				<div class="layout-header">
					<i-button type="text" @click.native="toggleClick">
						<Icon type="navicon" size="32"></Icon>
					</i-button>
					<div class="login-img">
						<!--<img src="../../static/img/logo.png"/>-->
						<Dropdown style="margin-left: 20px">
							<Button type="text">
					            	{{userInfo.name||'--'}}
					            <Icon type="arrow-down-b"></Icon>
					        </Button>
							<DropdownMenu slot="list">
								<DropdownItem @click.native="routeTo('login')">退出</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
				<div class="layout-breadcrumb">
					<Breadcrumb>
						<Breadcrumb-item>首页</Breadcrumb-item>
						<Breadcrumb-item>{{menuFilter($route.name)}}</Breadcrumb-item>
						<!--<Breadcrumb-item>{{this.$route.path.replace('/','')}}</Breadcrumb-item>-->
					</Breadcrumb>
				</div>
				<div class="layout-content">
					<div class="layout-content-main">
						<transition mode="out-in">
							<router-view></router-view>
						</transition>
					</div>
				</div>
				<div class="layout-copy">
					2016-2019 &copy; NSLab
				</div>
			</i-col>
		</Row>
	</div>

</template>

<script>
	import consts from 'common/consts';
	import cacheUtils from 'common/cacheUtils'
	export default {
		data() {
			return {
				spanLeft: 3,
				spanRight: 21,
				Menu: [{
						text: '文章管理',
						url: 'articleList',
						icon: 'navicon'
					}, {
						text: '编辑文章',
						url: 'rtf',
						icon: 'edit'
					},
					{
						text: '账号管理',
						url: 'user',
						icon: 'ios-personadd'
					},{
						text: '文件管理',
						url: 'file',
						icon: 'ios-personadd'
					},  {
						text: '关于我们',
						url: 'about',
						icon: 'ios-navigate'
					}
				],
				userInfo: {}
			}
		},
		computed: {
			iconSize() {
				return this.spanLeft === 3 ? 18 : 24;
			},
			setActive() {
				return this.$route.path.replace('/', '');
			}
		},
		methods: {
			toggleClick() {
				if(this.spanLeft === 3) {
					this.spanLeft = 1;
					this.spanRight = 23;
				} else {
					this.spanLeft = 3;
					this.spanRight = 21;
				}
			},
			routeTo(e) {
				this.$router.push("/" + e);
				if(e == 'login') {
					this.touLogin(true)
				}
			},
			menuFilter(e) {
				let menus = this.Menu.filter(item => e == item.url)
				return menus.length > 0 ? menus[0].text : 'home'
			},
			touLogin(nodesc) {
				this.$Notice.success({
					title: '退出成功'
				});
				cacheUtils.localStorage(consts.USERINFO).del(consts.USERINFO);
			},
		},
		mounted() {
			let userInfo = cacheUtils.localStorage(consts.USERINFO).get(consts.USERINFO);
			if(userInfo) this.userInfo = JSON.parse(userInfo)
		},
	}
</script>
<style scoped>
	* {
		font-size: 14px;
	}
	
	.layout {
		background: #f5f7f9;
		position: relative;
		overflow: hidden;
	}
	
	.layout-breadcrumb {
		padding: 10px 15px 0;
	}
	
	.layout-content {
		min-height: 700px;
		margin: 15px;
		background: #fff;
		border-radius: 4px;
	}
	
	.layout-content-main {
		padding: 20px 10px;
	}
	
	.layout-copy {
		text-align: center;
		padding: 10px 0 20px;
		color: #9ea7b4;
	}
	
	.layout-menu-left {
		background: #464c5b;
		/*min-width: 100px;*/
	}
	
	.layout-header {
		height: 60px;
		background: #fff;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
	}
	
	.login-img {
		display: initial;
		position: absolute;
		right: 50px;
		top: 10px;
	}
	
	.layout-logo-left {
		width: 60%;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		margin: 15px auto;
		line-height: 30px;
		color: white;
		text-align: center;
		vertical-align: middle;
		overflow: hidden;
		cursor: pointer;
	}
	
	.layout-ceiling-main a {
		color: #9ba7b5;
	}
	
	.layout-hide-text .layout-text {
		display: none;
	}
	
	.ivu-col {
		transition: width .2s ease-in-out;
	}
	
	.ivu-menu {
		z-index: 1;
	}
</style>
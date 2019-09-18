<template>
	<div class="home">
		<Row class="area">
			<template v-for="(item,index) in areaList">
				<Col span="8">
				<Card>
					<div class="left-area" :style="{background: item.iconBg}">
						<Icon :type="item.icon" size="32" color="#fff"></Icon>
					</div>
					<div class="right-area">
						<count-up :class-name="'area-number'" :id-name="'area'+index" :end-val="item.number">
							<p slot="intro" class="">{{ item.title }}</p>
						</count-up>
					</div>
				</Card>
				</Col>
			</template>
		</Row>
		<a href="https://github.com/shanyanwt/wx_sign" target="_blank">
			数据来源：
			<Icon type="social-github"></Icon> github
		</a>
		<Row class="home-form">
			<template v-for="(item,index) in formList">
				<Col span="8">
				<Card :style="{background: item.iconBg}" @click.native="routeTo(item.url)">
					<h2>{{item.text}}</h2>
					<p>{{item.introduce}}</p>
				</Card>
				</Col>
			</template>
		</Row>

	</div>
</template>
<script>
	import axios from 'common/httpUtils';
	import consts from 'common/consts';
	import api from 'api/index'
	import countUp from 'components/countUp.vue'
	export default {
		data() {
			return {
				areaList: [{
					icon: 'ios-eye',
					iconBg: '#8158fc',
					title: '查看数量',
					number: 1
				}, {
					icon: 'ios-star',
					iconBg: '#27aa80',
					title: '收藏数量',
					number: 1
				}, {
					icon: 'network',
					iconBg: '#9ea9f0',
					title: '拉取数量',
					number: 1
				}],
				formList: [{
						text: '文章管理',
						introduce: '文章管理列表，文章增删改查，阅读权限，文章分类设置等等...',
						url: 'articleList',
						iconBg: '#9ea9f0',
					}, {
						text: '编辑文章',
						introduce: '添加文章，修改文章，修改文章分类。',
						url: 'rtf',
						iconBg: '#8a00d4',
					},
					{
						text: '账号管理',
						introduce: '账号管理列表，增删改查用户',
						url: 'user',
						iconBg: '#99b19c',
					}, {
						text: '文件管理',
						introduce: '上传文件等资料管理，文件删除、查看、下载',
						url: 'file',
						iconBg: '#da9833',
					}, {
						text: '关于我们',
						introduce: '关于无名小子的介绍',
						url: 'about',
						iconBg: '#293462',
					}
				]
			}
		},
		mounted() {
			this.getsum()
		},
		methods: {
			//		查询所有项目	https://api.github.com/users/shanyanwt/repos
			//      查询某一仓库       https://api.github.com/repos/shanyanwt/仓库名
			getsum() {
				axios({
					method: 'get',
					url: api.API.github + 'koa_vue_blog',
					data: {}
				}).then(res => {
					if(res.subscribers_count) {
						this.areaList[0].number = res.subscribers_count + 100
					}
					if(res.watchers) {
						this.areaList[1].number = res.watchers + 100
					}
					if(res.forks) {
						this.areaList[2].number = res.forks + 100
					}

					//					console.log(res)
				}).catch(err => {
					console.log("错误信息：" + err);
				})
			},
			routeTo(url) {
				this.$router.push({
					name: url
				});
			},
		},
		components: {
			countUp
		}

	}
</script>

<style>
	.home .ivu-col-span-8 {
		padding: 10px;
	}
	
	.area .ivu-card-body {
		height: 100px;
		padding: 0 !important;
	}
	
	.area .ivu-card {
		overflow: hidden;
	}
	
	.left-area,
	.right-area {
		float: left;
		width: 30%;
		display: table;
		text-align: center;
		height: 100%;
	}
	
	.right-area p {
		text-align: center;
	}
	
	.area-number {
		font-size: 40px;
		margin-bottom: 16px;
	}
	
	.left-area i,
	.right-area>div {
		display: table-cell;
		vertical-align: middle;
	}
	
	.right-area {
		width: 70%;
	}
	
	.home-form {
		color: #fff;
	}
	
	.home-form .ivu-card-body {
		height: 100px;
		cursor: pointer;
	}
	
	.home-form p {
		margin-top: 10px;
	}
</style>
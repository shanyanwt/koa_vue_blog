/* * 左侧菜单 */

<template>
	<div class="left-menu">
		<Card :bordered="false" class="M-bottom">
			<p slot="title">
				<Icon type="ribbon-b"></Icon>
				Top 10
			</p>
			<div class="recommend">
				<ul>
					<li v-for="item in articleList" class="skd-ellipsis">
						<a @click="goArticle(item)">{{item.title}}</a>
					</li>
					<li v-show="articleList.length==0">
						<a href="#">小二又偷懒了 (ー`´ー)</a>
					</li>
				</ul>
			</div>
		</Card>
		<Card :bordered="false">
			<p slot="title">
				<Icon type="ios-pricetags"></Icon>
				热门标签
			</p>
			<div id="tagscloud">
				<a v-for="item in tagList" @click="getSearch(item)" :style="{background:randomColor()}">{{item.title}}</a>
			</div>
		</Card>

	</div>

</template>

<script>
	import axios from '../common/httpUtils'
	import api from '../api/index'
	import CONSTS from '../common/consts';
	import dateFormat from '../common/dateFormat'
	import utils from '../common/utils'
	import coldTag from '../common/coldTag'
	export default {
		data() {
			return {
				articleList: [],
				tagList: [{
					title: 'ES6-ES12',
					id: 10
				}, {
					title: 'vue',
					id: 10
				}, {
					title: 'nodejs',
					id: 10
				}, {
					title: 'java',
					id: 10
				}, {
					title: 'webpack',
					id: 10
				}, {
					title: 'mysql',
					id: 10
				}, {
					title: 'linux',
					id: 10
				}, {
					title: 'jenkins',
					id: 10
				}, {
					title: 'nginx',
					id: 10
				}, {
					title: 'css',
					id: 10
				}, {
					title: '微博今天又宕机了',
					id: 10
				}],
				colorList: ['494ca2', '0075f6', '1d1919', '421b9b', '8293ff', '302387', 'e88a1a', '6d70c6', '78b0a0', 'f8d0b0', 'ebebe3', '74b49b', '509aaf', '12e6c8', '573697', 'ca431d', 'f7aa00', '4ab8b8', '1a2c5b', '5628b4']
			}
		},
		methods: {
			getArticle(type) {
				axios({
					method: 'post',
					url: api.ARTICLE_API.article_list,
					data: {
						status: 0,
						row_start: 0,
						row_count: 10,
						order_key: [
							['number', 'DESC']
						]
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						this.articleList = res.result_data

					} else {
						console.log("服务器异常")
					}
				}).catch(err => {
					console.log("失误：" + err);
				})
			},
			goArticle(type) {
				var url = "/article/" + type.id;
				this.$router.push(url);
			},
			/**
			 * 产生随机整数，包含下限值，包括上限值
			 * @param {Number} lower 下限
			 * @param {Number} upper 上限
			 * @return {Number} 返回在下限到上限之间的一个随机整数
			 */
			random(lower, upper) {
				return Math.floor(Math.random() * (upper - lower + 1)) + lower;
			},
			randomColor() {
				// 随机生成 rgb 值，每个颜色值在 0 - 255 之间
				/*				var r = this.random(0, 256),
									g = this.random(0, 256),
									b = this.random(0, 256);
								var result = "rgb(" + r + "," + g + "," + b + ")";*/
				let max = this.colorList.length
				this.colorList[this.random(0, max)]
				return '#' + this.colorList[this.random(0, max)];
			},
			getSearch(item) {
				this.$router.push({
					path: '/search',
					query: {
						q: item.title
					}
				});

			},
		},
		mounted() {
			this.getArticle()
			this.$nextTick(() => {
				coldTag.winOnload()
			})
		},
	}
</script>

<style scoped>
	.left-menu {
		padding: 0 10px;
	}
	
	.left-menu_ui li {
		float: left;
		width: 45%;
		text-align: center;
		font-size: 18px;
		line-height: 36px;
	}
	
	.left-menu_ui li:first-child {
		border-right: solid 1px #999;
	}
	
	.left-menu-bottom {
		height: 1px;
		position: 20px;
		width: 80%;
		margin: auto;
	}
	
	.recommend {
		clear: both;
	}
	
	.recommend ul li {
		line-height: 40px;
		font-size: 18px;
	}
	
	.left-menu .ivu-card {
		min-height: 300px !important;
	}
	
	#tagscloud {
		height: 260px;
		position: relative;
		text-align: center;
		z-index: 1;
	}
	
	#tagscloud a {
		color: #fff;
		position: absolute;
		top: 0px;
		left: 0px;
		text-decoration: none;
		margin: 0 10px 15px 0;
		line-height: 18px;
		padding: 1px 5px;
		display: inline-block;
		border-radius: 4px;
	}
	
	#tagscloud a:hover {
		background: #2f4bff !important;
	}
</style>
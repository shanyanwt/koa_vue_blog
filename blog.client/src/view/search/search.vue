/* * 搜索文章 */

<template>
	<div class="skd-search">
		<div class="skd-body">
			<div class="set-search">
				<Input v-model="keyword" ref="sh" :maxlength='100' size="large" @on-enter="search(keyword)">
				<span slot="append" style="cursor:pointer;" @click="search(keyword)"> 搜 一 搜 </span>
				</Input>
				<!--<span v-money="0">1043</span>-->
				<!--<Table border :columns="columns7" :data="data6"></Table>-->
			</div>
			<template v-if="articleList.length >0">
				<div class="srecommend ba" v-for="item in articleList">
					<h2 class="skd-ellipsis wid80 f-left">
					<a @click="goArticle(item)">{{item.title}}</a>
				</h2>
					<div class="number f-right">
						<p>{{item.number}}</p>
						<p>阅读量</p>
					</div>
					<div class="foot wid80 f-left">
						<a @click="goArticle(item)" v-if="item.classify" class="classify">
							{{item.classify}}
						</a>
						<span>
						{{item.create_time}}
					</span>
					</div>
				</div>
				<p>共搜索： <span style="color: #ed3f14;">{{articleList.length}}</span>条</p>

			</template>
			<template v-else>
				<div class="noArticle">
					哦！<span style="color: #ed3f14;"> 小二 </span>又在偷懒了 (ー`´ー)
				</div>

			</template>

			<re-a style="margin-top: 20px;"></re-a>
		</div>
		<vmenu class="skd-recommend-lsit"></vmenu>
	</div>

</template>

<script>
	import axios from '../../common/httpUtils'
	import api from '../../api/index'
	import CONSTS from '../../common/consts'
	import dateFormat from '../../common/dateFormat'
	import path from "../../common/navData.js"
	import reA from "../../components/recommendArticle.vue"
	import Vmenu from '../../components/menu.vue'
	export default {
		data() {
			return {
				article: '',
				nav: path.currentPath,
				articleList: [],
				keyword: '',
				ww: "green",
				columns7: [{
						title: 'Age',
						key: 'age',
						render: (h, params) => {
							return h('div', [
								h('span', {
									props: {
										size: 'small'
									},
									attrs: {
										"v-money": 0
									},
									style: {
										marginRight: '5px'
									},
								}, params.row.age)
							])
						}
					},
					{
						title: 'Address',
						key: 'address'
					},
				],
				data6: [{
					age: 122,
					address: 'dsdsd'
				}]
			}
		},
		methods: {
			searchArticle(v) {
				this.keyword = v
				this.autofocus()
				axios({
					method: 'post',
					url: api.ARTICLE_API.article_search,
					data: {
						keyword: v,
						status: 0
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						this.articleList = res.result_data;
						this.articleList.map(item => {
							if(item.classify) {
								item.classify = item.classify.split(',')[0];
							}
							item.create_time = dateFormat.diffTime(item.create_time * 1000)
						})
					} else {
						console.log("服务器异常")
					}
				}).catch(err => {
					console.log("失误：" + err);
				})
			},
			search(v) {
				if(v != '') {
					this.$router.replace({
						path: '/search',
						query: {
							q: v
						}
					}).catch(e => {});
				}
			},
			goArticle(type) {
				var url = "/article/" + type.id;
				this.$router.push(url);
			},
			//自动获取焦点
			autofocus() {
				this.$refs.sh.focus()
			},
		},
		mounted() {
			var index = {
				path: "",
				name: "search",
				title: "搜索"
			}
			this.nav.push(index)
			this.searchArticle(this.$route.query.q)
		},
		watch: {
			$route(v) {
				this.searchArticle(v.query.q)
			}
		},
		components: {
			reA,
			Vmenu
		}
	}
</script>

<style type="text/css">
	.set-search {
		margin-bottom: 20px;
	}

	.set-search .ivu-input-group-large .ivu-input {
		font-size: 20px !important;
		height: 45px !important;
	}

	.set-search .ivu-input-group-append,
	.ivu-input-group-prepend {
		font-size: 20px;
		color: #FFFFFF;
		background: #ed3f14;
		width: 140px;
	}

	.skd-search .ta {
		float: left;
		margin-left: -18px;
	}

	.skd-search .srecommend {
		height: 120px;
		padding: 20px 24px;
		margin-bottom: 2px;
	}

	.number p:nth-child(1) {
		text-align: center;
		font-size: 30px;
		color: #00a1ec;
		line-height: 44px;
	}

	.skd-search .foot {
		margin-top: 20px;
		padding-left: 10px;
	}

	.skd-search .classify {
		color: #00a1ec;
	}

	.skd-search .foot a,
	span {
		margin-right: 20px;
	}

	.skd-search .load {
		margin-top: 20px;
	}

	.noArticle {
		text-align: center;
		font-size: 40px;
		line-height: 5;
		background: #fff;
	}
</style>
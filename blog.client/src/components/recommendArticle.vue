/** * 文章推荐 */

<template>
	<div class="">
		<!--{{articleList}}-->
		<div class="recommend ba" v-for="item in articleList" v-if="item.id != $route.params.id">
			<h2 class="skd-ellipsis wid80 f-left">
				<a @click="goArticle(item)">{{item.title}}</a>
			</h2>
			<div class="number f-right">
				<p>{{item.number}}</p>
				<p>阅读量</p>
			</div>
			<div class="foot wid80 f-left">
				<a @click="goArticle(item)" v-if="item.classify" v-for="items in markSplit(item.classify)" class="classify">
					{{items}}
				</a>
				<span>
					{{item.create_time*1000 | diffTime}}
				</span>
			</div>
			<!--<img src="../../assets/img/aa.svg"/>-->
		</div>
		<div class="load">
			<Spin v-if="spinShow">{{spinMessage}}</Spin>
		</div>
		<!--底部自动加载组件-->
		<Affix :offset-bottom="20" @on-change="change">
			<span> </span>
		</Affix>
	</div>
</template>

<script>
	import axios from '../common/httpUtils'
	import api from '../api/index'
	import CONSTS from '../common/consts';
	import dateFormat from '../common/dateFormat'
	import utils from '../common/utils'
	export default {
		filters: {
			diffTime: (time) => dateFormat.diffTime(time)
		},
		data() {
			return {
				articleList: [],
				spinShow: false,
				spinMessage: '加载中...',
				page: {
					page_size: 0,
					row_start: 0,
					row_count: 2,
				}
			}
		},
		methods: {
			getArticle(type) {
				this.spinShow = true;
				let page = this.page
				axios({
					method: 'post',
					url: api.ARTICLE_API.article_list,
					data: {
						type: 1,
						status: 0,
						row_start: page.row_start,
						row_count: page.row_count,
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						this.articleList.push(...res.result_data);
						this.page.page_size++;
						this.page.row_start = this.page.page_size * page.row_count
						if(this.articleList.length >= res.total_row) {
							this.spinShow = true;
							this.spinMessage = '已经到底了！';
						} else {
							this.spinShow = false;
						}
					} else {
						console.log("服务器异常")
					}
				}).catch(err => {
					console.log("失误：" + err);
				})
			},
			change(status) {
				if(!status && !this.spinShow) {
					this.getArticle(1)
				}
			},
			goArticle(type) {
				var url = "/article/" + type.id;
				this.$router.push(url);
			},
			markSplit(value) {
				return utils.markSplit(value)
			}

		},
		mounted() {
			this.getArticle()
		},
		components: {
		}

	}
</script>
<style scoped>
	.ta {
		float: left;
		margin-left: -18px;
	}
	
	.recommend {
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
	
	.foot {
		margin-top: 20px;
		padding-left: 10px;
	}
	
	.classify {
		color: #00a1ec;
	}
	
	.foot a,
	span {
		margin-right: 20px;
	}
	
	.load {
		margin-top: 20px;
	}
</style>
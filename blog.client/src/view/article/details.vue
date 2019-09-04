/* * 文章详情 */

<template>
	<div>
		<div class="skd-body">
			<div class="skd-content" v-if="article.id">
				<h2 class="skd-ellipsis">{{article.title}}</h2>
				<div class="tag">
					<template v-for="item in article.classify">
						<Tag checked color="green" v-if="article.classify">{{item}}</Tag>
					</template>
				</div>
				<div class="message">
					<span>{{article.create_time || '--'}}</span>
					<span>
						<Icon type="ios-book-outline" size="20" class="book"></Icon>
						{{article.number}}
					</span>
				</div>
				<div class="quill-editor ql-container ql-snow no-b">
					<div class="ql-editor" v-html="article.content"></div>
				</div>
			</div>

			<div class="noDetails" v-else>
				哦！<span class="un404"> 404 </span> (ー`´ー)
			</div>
			<re-a></re-a>
		</div>
		<keep-alive>
			<vmenu class="skd-recommend-lsit"></vmenu>
		</keep-alive>
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
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	export default {
		data() {
			return {
				article: '',
				nav: path.currentPath,
			}
		},
		methods: {
			get() {
				var self = this;
				axios({
					method: 'get',
					url: api.ARTICLE_API.article_select + '/' + self.$route.params.id
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						self.article = res.result_data;
						document.title = res.result_data.title || '404从你的全世界路过！';
						if(self.article.classify) {
							self.article.classify = res.result_data.classify.split(',')
						}
						self.article.create_time = dateFormat.dateFormat(res.result_data.create_time * 1000, 'yyyy-MM-dd hh:mm:ss')
						setTimeout(function() {
							self.articleUpdate(self.article);
						}, 4600)
					} else {
						self.$router.push("/404");
						console.log("服务器异常")
					}
				}).catch(err => {
					console.log("失误：" + err);
				})
			},
			articleUpdate(type) {
				axios({
					method: 'post',
					url: api.ARTICLE_API.article_update,
					data: {
						id: type.id,
						number: type.number + 1
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {

					} else {
						console.log("...")
					}
				}).catch(err => {
					console.log("失误：" + err);
				})
			}
		},
		mounted() {
			this.get()
			var index = {
				path: "",
				name: "index",
				title: "文章详情"
			}
			this.nav.push(index)
		},
		watch: {
			$route() {
				this.get();
			}
		},
		components: {
			reA,
			Vmenu
		}
	}
</script>

<style type="text/css">
	.message {
		height: 44px;
		line-height: 44px;
		color: #bbb;
		border-bottom: 1px solid #dbdbdb;
	}
	
	.message span:nth-child(2) {
		float: right;
		font-size: 20px;
	}
	
	.book {
		font-size: 16px;
		margin-right: 5px;
	}
	
	.tag {
		display: flex;
		float: right;
		margin-top: -42px;
		margin-right: 5px;
	}
	/*编译器的样式修改*/
	
	.no-b {
		border: 0 !important;
	}
	
	.ql-container {
		font-size: 14px;
	}
	
	.ql-snow .ql-editor pre.ql-syntax {
		background-color: #EFEFEF;
		color: #4F4F4F;
	}
	
	.noDetails {
		height: 404px;
		line-height: 404px;
		font-size: 40px;
		margin-bottom: 20px;
		text-align: center;
		background: #fff;
	}
	
	.un404 {
		font-size: 80px;
		color: #ed3f14;
	}
</style>
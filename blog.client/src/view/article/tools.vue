/** * 工具类 */

<template>
	<div class="tools">
		<ul class="tools-ul">
			<a v-for="item in toolsList" :href="item.url" target="_blank">
				<Card>
					<Row>
						<Col span="6" class="col-img"><img v-lazy="item.img" class="imgWidth imgs"></Col>
						<Col span="17" offset="1">
						<h3>{{item.name}}</h3>
						<p class="skd-ellipsis3 tools-introduce">{{item.introduce}}</p>
						</Col>
					</Row>
				</Card>
			</a>
		</ul>
		<Card>
			<p>给大家推荐这些工具类希望能够新欢，这些是工作中经常使用到，当然也会持续添加。</p>
			<p>如果朋友们发现有什么好用的好玩的，可以踊跃投稿私信我哦！邮箱 shanyanwt@163.com</p>
		</Card>

	</div>
</template>
<script>
	import axios from '../../common/httpUtils'
	import consts from '../../common/consts'
	import api from '../../api/index'
	import CONSTS from '../../common/consts';

	export default {
		data() {
			return {
				toolsList: [{
						name: 'vuejs',
						introduce: 'Vue 是数据驱动框架。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。',
						url: 'https://cn.vuejs.org',
						img: 'https://cn.vuejs.org/images/logo.png',
					}, {
						name: 'iView',
						introduce: 'iView 是一套基于 Vue.js 的开源 UI 组件库，主要服务于 PC 界面的中后台产品。',
						url: 'https://www.iviewui.com/overview',
						img: 'https://file.iviewui.com/dist/2ecd3b0452aa197097d5131afacab7b8.png',
					}, {
						name: 'YAPI',
						introduce: 'YApi 是高效、易用、功能强大的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务。可以帮助开发者轻松创建、发布、维护 API，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。',
						url: 'http://yapi.demo.qunar.com',
						img: require('../../static/img/yapi.png'),
					}, {
						name: 'iconfont',
						introduce: '阿里矢量图库，免费丰富的icon可供使用',
						url: 'https://www.iconfont.cn',
						img: require('../../static/img/iconfont.png'),
					}, {
						name: 'cloudconvert',
						introduce: '一个在线可以把任何格式的文件转换为任何格式，当然没有那么牛逼啦，但还是很厉害的格式转换工具',
						url: 'https://cloudconvert.com',
						img: require('../../static/img/cloudconvert.png'),
					}, {
						name: '创可贴',
						introduce: '平面设计工具，丰富的模板，简单易懂的操作，全局拖动操作',
						url: 'https://www.chuangkit.com',
						img: 'https://www.chuangkit.com/distweb/img/logo-colored-2019.11081299.svg',
					}, {
						name: 'weavesilk',
						introduce: '可以在随便划拉划拉的在线绘图工具，你什么也不会也可以画出精美的图案',
						url: 'http://weavesilk.com/',
						img: require('../../static/img/weavesilk.png'),
					}, {
						name: '鬼畜小视频制作',
						introduce: '一个在线可以让图片跟着音乐点头的网站，动动嘴巴动动头，鬼畜视频',
						url: 'http://nodtotherhythm.com',
						img: require('../../static/img/nodtotherhythm.gif'),
					},
					{
						name: 'photofunia',
						introduce: '在线场景P图，想怎么P就怎么P',
						url: 'http://photofunia.com',
						img: 'http://cdn.photofunia.com/effects/passage/icons/medium.jpg',
					}
				]
			}
		},
		methods: {},
		mounted() {
			document.title = "工具类";

		},
		components: {}
	}
</script>

<style scoped>
	.col-img {
		overflow: hidden;
	}
	
	.imgWidth {
		width: 100%;
		height: 100px;
		transition: all 500ms linear;
	}
	
	.ivu-card-body:hover img {
		-webkit-transition: scale(1.2, 1.2);
		-moz-transition: scale(1.2, 1.2);
		-ms-transition: scale(1.2, 1.2);
		-o-transition: scale(1.2, 1.2);
		transform: scale(1.2, 1.2);
	}
	
	.tools-ul {
		width: 100%;
		display: inline-block;
	}
	
	.tools-ul a {
		color: #666;
		width: 32.33%;
		list-style: none;
		float: left;
		margin: 5px 0.5%;
	}
	
	.tools-introduce {
		padding-top: 10px;
		line-height: 22px;
	}
</style>
<!--微信签名算法-->
<template>
	<div id="">
		<input type="file" id="imgOne1" class="uploadfile" @change="preImg">
		<img id="imgid" src='' />
	</div>
</template>

<script>
	import axios from '../../common/httpUtils'
	import api from '../../api/index'
	import CONSTS from '../../common/consts.js'
	export default {
		data() {
			return {}
		},
		methods: {

			//将图片转换成Base64编码
			getBase64Image(img) {
				var canvas = document.createElement("canvas");
				canvas.width = 1000;
				canvas.height = canvas.width * img.height / img.width;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
				var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
				var dataURL = canvas.toDataURL("image/" + ext);
				return dataURL;
			},

			//获取本地图片的url
			getFileUrl(sourceId) {
				var url;
				if(navigator.userAgent.indexOf("MSIE") >= 1) { // IE   
					url = document.getElementById(sourceId).value;
				} else if(navigator.userAgent.indexOf("Firefox") > 0) { // Firefox   
					url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
				} else if(navigator.userAgent.indexOf("Chrome") > 0) { // Chrome   
					url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
				} else {
					var fileitem = document.getElementById(sourceId).files[0];
					var reader = new FileReader();
					reader.readAsDataURL(fileitem);
					reader.onload = function(e) {
						postphp(this.result);
					}
				}
				return url;

			},

			//请求处理阿里api的php
			postphp(data) {
				console.log(data);
				let appid = '608dea28b71047d9a582f93555992d78'

				axios({
					method: 'post',
					url: 'http://aliapi.aisegment.com/segment/matting',
					data: {
//						AppCode:appid,
						"type": "jpg",
						"photo": data,
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {

					} else {}
				}).catch(err => {
					console.log("失误：" + err);
				})

			},

			//提取url并提交处理
			preImg(sourceId) {
				var url = this.getFileUrl('imgOne1');
				var image = new Image();
				image.src = url;
				let that = this
				image.onload = function() {
					var base64 = that.getBase64Image(image);
					that.postphp(base64);
				}

			}

		},
		mounted() {},
		components: {}
	}
</script>

<style>

</style>
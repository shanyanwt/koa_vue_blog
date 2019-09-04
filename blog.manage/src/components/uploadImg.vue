<template>
	<div class="upload-img">
		<div class="img-body">
			<img v-if="imgUrl" :src="imgUrl" />
			<img v-if="loadImgUrl" :src="loadImgUrl" />
		</div>
		<input type="file" id="batchUpload" name="files" @change="upload()" multiple="multiple" />
	</div>
</template>
<script>
	import axios from 'common/httpUtils';
	import consts from 'common/consts';
	import api from 'api/index'
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	////    瓦片canvas
	var tCanvas = document.createElement("canvas");
	var tctx = tCanvas.getContext("2d");
	var maxsize = 1 * 1024;
	export default {
		props: {
			format: {
				type: Array,
				default() {
					return [];
				}
			},
			delay: {
				type: Number,
				default: 500
			},
			onFormatError: {
				type: Function,
				default() {
					return {};
				}
			},
			onSuccess: {
				type: Function,
				default() {
					return {};
				}
			},
			onError: {
				type: Function,
				default() {
					return {};
				}
			}
		},
		data() {
			return {
				imgUrl: "",
				loadImgUrl: ''
			}
		},
		mounted() {},
		methods: {
			upload() {
				let upload = document.getElementById('batchUpload')
				let file = upload.files[0]
				let reader = new FileReader();
				let _this = this
				let result;
				// check format
				if(this.format.length) {
					const _file_format = file.name.split('.').pop().toLocaleLowerCase();
					const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
					if(!checked) {
						this.onFormatError(file, this.fileList);
						return false;
					}
				}
				reader.onloadend = function() {
					result = reader.result
					_this.imgUrl = result;
					var img = new Image();
					img.src = result;
					//如果图片大小小于1mb，则直接上传
					if(result.length <= maxsize) {
						img = null;
						//					_this.pushImg(file)
						return;
					}
					// 图片加载完毕之后进行
					if(img.complete) {
						callback();
					} else {
						img.onload = callback;
					}

					function callback() {
						var data = _this.compress(img);
						img = null;
						_this.loadImgUrl = data
						//						_this.basestrUpload(data, file.type)
					}
				}
				if(file) {
					reader.readAsDataURL(file);
				} else {
					this.imgUrl = "";
				}

			},
			basestrUpload(basestr, type) {
				var text = window.atob(basestr.split(",")[1]);
				var buffer = new ArrayBuffer(text.length);
				var ubuffer = new Uint8Array(buffer);
				for(var i = 0; i < text.length; i++) {
					ubuffer[i] = text.charCodeAt(i);
				}
				var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
				var blob;
				if(Builder) {
					var builder = new Builder();
					builder.append(buffer);
					blob = builder.getBlob(type);
				} else {
					blob = new window.Blob([buffer], {
						type: type
					});
				}
				this.pushImg(blob)
			},
			pushImg(files) {
				var formData = new FormData();
				formData.append('file', files);
				axios({
					method: 'post',
					url: api.API.upload,
					data: formData,
					onUploadProgress: progressEvent => {
						let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
					}
				}).then(res => {
					this.onSuccess(res)
				}).catch(err => {
					this.onError(res)
				})
			},
			compress(img) {
				var initSize = img.src.length;
				var width = img.width;
				var height = img.height;

				//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
				var ratio;
				if((ratio = width * height / 4000000) > 1) {
					ratio = Math.sqrt(ratio);
					width /= ratio;
					height /= ratio;
				} else {
					ratio = 1;
				}

				canvas.width = width;
				canvas.height = height;

				//        铺底色
				ctx.fillStyle = "rgba(0,0,0,0)";
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				//如果图片像素大于100万则使用瓦片绘制
				var count;
				if((count = width * height / 1000000) > 1) {
					count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
					//            计算每块瓦片的宽和高
					var nw = ~~(width / count);
					var nh = ~~(height / count);
					tCanvas.width = nw;
					tCanvas.height = nh;
					for(var i = 0; i < count; i++) {
						for(var j = 0; j < count; j++) {
							tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
							ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
						}
					}
				} else {
					ctx.drawImage(img, 0, 0, width, height);
				}
				//进行最小压缩,压缩算法0.1最小
				var ndata = canvas.toDataURL('image/jpeg', 0.8);
				var size = initSize - (initSize / 8) * 2
				var loadSize = ndata.length - (ndata.length / 8) * 2

				console.log('压缩前：' + ~~(size / 1024) + 'kb');
				console.log('压缩后：' + ~~(loadSize / 1024) + 'kb');
				console.log('压缩率：' + ~~(100 * (size - loadSize) / size) + "%");
				tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
				return ndata;
			},
			fileSize(size, type) {
				if(type == 1) {
					var strLen = size.length;
					size = strLen - (strLen / 8) * 2
				}
				let kb = size / 1024
				let obj = {
					total_size: kb,
					size: kb > 1024 ? (~~(10 * kb / 1024)) / 10 + "MB" : ~~(kb) + "KB",
				}
				return obj;
			}

		}
	}
</script>

<style scoped>
	.img-body img {
		max-height: 300px;
		max-width: 40%;
		margin: 0 4%;
	}
	
	.img-body {
		position: relative;
		min-width: 500px;
		background: #000;
	}
</style>
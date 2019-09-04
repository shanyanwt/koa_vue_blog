'use strict';
import $ from 'jquery'

function tar() {
	$(".img-list li").remove("li");
	var filechooser = document.getElementById("choose");
	////    用于压缩图片的canvas
	window.sessionStorage.clear();
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	////    瓦片canvas
	var tCanvas = document.createElement("canvas");
	var tctx = tCanvas.getContext("2d");
	var maxsize = 1000 * 1024;
	filechooser.click();
	filechooser.onchange = function() {
		if(!this.files.length || this.files.length > 1) return;

		var files = Array.prototype.slice.call(this.files);
		var imgIndex = files[files.length - 1];
		console.log(files)

		if(files.length > 1) {
			alert("最多同时只可上传9张图片");
			return;
		}

		files.forEach(function(file, i) {
			if(!/\/(?:jpeg|png|gif)/i.test(file.type)) return;

			var reader = new FileReader();

			var li = document.createElement("li");

			var size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";

			li.innerHTML = '<div class="progress"><span></span></div>';
			$(".img-list").append($(li));

			reader.onload = function() {
				var result = this.result;
				var img = new Image();
				img.src = result;
				//如果图片大小小于1mb，则直接上传
				if(result.length <= maxsize) {
					$(li).css("background-image", "url(" + result + ")");
					$(li).css("height", "300px");
					$(li).css("width", "100%");
					$(li).css("background-size", "contain");
					$(li).css("background-repeat", "no-repeat");
					img = null;
					upload(result, file.type, $(li));

					return;
				}

				//                图片加载完毕之后进行压缩，然后上传
				if(img.complete) {
					callback();
				} else {
					img.onload = callback;
				}

				function callback() {
					var data = compress(img);

					$(li).css("background-image", "url(" + data + ")");
					$(li).css("height", "300px");
					$(li).css("width", "100%");
					$(li).css("background-size", "contain");
					$(li).css("background-repeat", "no-repeat");
					upload(data, file.type, $(li));
					img = null;
				}

			};

			reader.readAsDataURL(file);
		})
	};

	function compress(img) {
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
		ctx.fillStyle = "#fff";
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

		console.log('压缩前：' + initSize / 1024 + 'kb');
		console.log('压缩后：' + ndata.length / 1024 + 'kb');
		console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

		tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
		return ndata;
	}
	//    图片上传，将base64的图片转成二进制对象，塞进formdata上传
	function upload(basestr, type, $li) {
		var session = window.sessionStorage;
		var text = window.atob(basestr.split(",")[1]);
		var buffer = new ArrayBuffer(text.length);
		var ubuffer = new Uint8Array(buffer);
		var pecent = 0,
			loop = null;

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

		var xhr = new XMLHttpRequest();
		var formdata = new FormData();
		formdata.append('file', blob);
		//		session.setItem("imgName",'Y4DX471513652722_.png')
		xhr.open('post', 'http://47.95.7.135:5555/ajaxUpload');
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log('上传成功：' + xhr.responseText);
				clearInterval(loop);
				//当收到该消息时上传完毕
				console.log('xhr.response==========', xhr.response)
				var b = xhr.response;
				console.log('bbbbbbbbb==========', b)

				session.setItem("imgName", b)
				var a = session.getItem('imgName')
				console.log(a)
			}
		};

		//数据发送进度，前50%展示该进度
		xhr.upload.addEventListener('progress', function(e) {
			if(loop) return;

			pecent = ~~(100 * e.loaded / e.total) / 2;
			$li.find(".progress span").css('width', pecent + "%");

			if(pecent == 50) {
				mockProgress();
			}
		}, false);

		//数据后50%用模拟进度
		function mockProgress() {
			if(loop) return;

			loop = setInterval(function() {
				pecent++;
				$li.find(".progress span").css('width', pecent + "%");

				if(pecent == 99) {
					clearInterval(loop);
				}
			}, 100)
		}

		xhr.send(formdata);
	}
	return;
}
export default {
	tar
};

export {
	tar
};
<!--
    	作者：Yan Jiang
    	时间：Date
    	描述：popper 自使用跟随tip
    -->

<template>
	<div>
		<vpopper trigger="click" :options="{
		      placement: 'bottom',
		      modifiers: { offset: { offset: '0,10px' } }
		    }">
			<div class="popper">
				Popper Content Popper Content Popper Content good Popper Content Popper Content Popper Content
			</div>
			<Button slot="reference">
		      vue-popperjs
		    </Button>
		</vpopper>

		<div class="example">
			<div class="my-button">居中显示</div>
			<div class="my-popper">咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咯咕咕咕咕过过过过过过过过过过谷歌谷歌谷歌谷歌谷歌谷歌谷歌个谷歌谷歌过 </div>
		</div>
		<h2>video.js</h2>
		<div v-show='!isError'>
			<video id="videobox" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls preload="auto" webkit-playsinline="true" playsinline="true" type="application/x-mpegURL" allowsInlineMediaPlayback=YES webview.allowsInlineMediaPlayback=YES width='100%' ref='videoRef' x5-video-player-fullscreen="true" :poster="posterSrc">
				<source id="sourceBox" :src="videoSrc" type="rtmp/vlc">
				<p class="vjs-no-js">不支持播放</p>
			</video>
		</div>
		<div v-show='isError' class="errorTip">
			<p>视频出错了！</p>
		</div>

	</div>
</template>
<script>
	import Popper from 'popper.js'
	import qq from './popper.js'
	import vPopper from 'vue-popperjs'
	import 'vue-popperjs/dist/vue-popper.css';

	import videojs from 'video.js'
	import 'videojs-contrib-hls'
	import 'videojs-flash'
	import 'video.js/dist/video-js.css'
	export default {
		components: {
			'vpopper': vPopper
		},
		data() {
			return {
				showPopperParentVar: true,
				showPopper1: true,
				showPopper3: true,
				videoSrc: 'rtmp://58.200.131.2:1935/livetv/hunantv',
				posterSrc: 'https://matrimony001.100msh.net.cn/public/code/material/mp-7261-1554175849.jpg',
				isError: false,
			}
		},
		mounted() {
			var reference = document.querySelector('.my-button');
			var popper = document.querySelector('.my-popper');
			var anotherPopper = new Popper(
				reference,
				popper, {
					placement: 'bottom',
					flipBehavior: ['left', 'bottom', 'top'],
					boundariesElement: 'container'
				}
			);
			//为避免在初始化video时播放源是空的，报播放源错误，需要先给source 的src赋值
			var player = videojs('videobox', {
					bigPlayButton: true,
					textTrackDisplay: true,
					posterImage: true,
					errorDisplay: false,
					controlBar: false,
					playbackRates: [0.5, 1, 1.5, 2],
					ControlBar: {
						customControlSpacer: true
					}
				},
				function onPlayerReady() {
					let _this = this
					this.play();
					setTimeout(() => { //延时确保能监听到视频源错误
						var mediaError = this.error();
						if(mediaError != null && mediaError.code) {
							_this.isError = true
							console.log("播放错误")
						}
					}, 1000);
				});
			// player.width(this.videoW)   //设置播放器宽度
		},
		beforeDestroy() {
			const videoDom = this.$refs.videoRef; //不能用document 获取节点
			videojs(videoDom).dispose(); //销毁video实例，避免出现节点不存在 但是flash一直在执行,也避免重新进入页面video未重新声明
		},
		methods: {
		}
	}
</script>

<style>
	.my-button {
		width: 240px;
	}
	
	.example {
		width: 100%;
		-webkit-order: 1;
		-ms-order: 1;
		order: 1;
		position: relative;
		min-height: 450px;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		align-content: center;
		align-items: center;
	}
	
	.my-button {
		width: 30%;
		margin: 0 auto;
		position: relative;
		text-align: center;
		padding: 20px;
		border-style: dotted;
		border-color: white;
		border-width: medium;
	}
	
	.my-popper {
		background: #FFC107;
		color: black;
		min-width: 150px;
		border-radius: 3px;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
		padding: 10px;
		text-align: center;
	}
</style>
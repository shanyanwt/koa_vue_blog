/* * 搜索文章 */

<template>
	<div class="skd-music">
		<div id="aplayer"></div>

	</div>

</template>

<script>
	import axios from '../../common/httpUtils'
	import api from '../../api/index'
	import CONSTS from '../../common/consts'
	import dateFormat from '../../common/dateFormat'
	import APlayer from 'APlayer';
	import 'APlayer/dist/APlayer.min.css';
	export default {
		data() {
			return {
				musicList: [],
			}
		},
		methods: {
			getMusicList() {
				let id = 19723756 //网易云音乐飙升
				axios({
					method: 'get',
					url: api.ARTICLE_API.music_163 + '/' + id,
					data: {}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						this.musicList = res.result_data
						this.getMusicUrl()
					} else {}
				}).catch(err => {
					console.log("失误：" + err);
				})

			},
			getMusicUrl() {
				var noMusic = [{
					"name": "平庸之上",
					"artists_name": "9m88",
					"id": 1381013230,
					"picUrl": "http://p2.music.126.net/lOXbGuH9gImQAyQd73TKQg==/109951164251141038.jpg",
					"url": "http://music.163.com/song/media/outer/url?id=1381013230.mp3 "
				}]
				var that = this
				const ap = new APlayer({
					container: document.getElementById('aplayer'),
					mini: false,
					autoplay: false,
					theme: '#000',
					loop: 'all',
					order: 'random',
					preload: 'auto',
					volume: 0.7,
					mutex: true,
					listFolded: true,
					listMaxHeight: 90,
					lrcType: 3,
					audio: that.musicList.length > 0 ? that.musicList : noMusic
				});

			}
		},
		mounted() {
			this.getMusicList()

		},
		watch: {},
		components: {}
	}
</script>

<style type="text/css">

</style>
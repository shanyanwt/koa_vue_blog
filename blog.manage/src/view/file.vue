<!--
	文件服务管理 file
-->

<template>
	<div class="file">
		<div class="file-header search-top">
			<Breadcrumb>
				<Breadcrumb-item @click.native="getPath(0)">
					<Icon type="ios-home" size="20"></Icon>
				</Breadcrumb-item>
				<template v-for="(item,index) in breadcrumbList" v-if="item && item !='upload'">
					<Breadcrumb-item @click.native="getPath(index)">
						<a>{{item}}</a>
					</Breadcrumb-item>
				</template>
			</Breadcrumb>

		</div>
		<div>
			<Table stripe size="default" :columns="columns7" :data="dataList"></Table>
		</div>
		<Modal v-model="modal2" :title="fileName" width="800" class-name="file-center-modal">
			<div style="height: 500px;">
				<iframe ref="setIframe" :src="files" width="100%" height="100%"></iframe>
			</div>
			<div slot="footer">
			</div>
		</Modal>
	</div>
</template>
<script>
	import { ShowCountDown } from '../filter/dateFilter';
	import axios from '../common/httpUtils'
	import api from '../api/index'
	import CONSTS from '../common/consts'
	import dateFormat from '../common/dateFormat'
	import utils from 'common/utils'
	import typeFilter from 'common/typeFilter.js'
	import { download, downloadFile } from "common/download.js";

	export default {
		data() {
			return {
				modal2: false,
				fileName: '文档',
				files: '',
				breadcrumbList: [],
				columns7: [{
						title: '文件名',
						key: 'name',
						align: 'center',
						render: (h, params) => {
							return h('a', {
								on: {
									click: () => {
										this.getFile(params.row)
									}
								}
							}, params.row.name)
						}
					},
					{
						title: '操作',
						key: 'address',
						align: 'center',
						render: (h, params) => {
							return('div', [
								h('a', {
									style: {
										marginRight: '10px'
									},
									on: {
										click: () => {
											let path = params.row.path.replace('/upload', '')
											//																						downloadFile(api.IMGURL + path, params.row.name)
											this.downloadFile(params.row)
										}
									}
								}, '下载'),
								h('a', {
									on: {
										click: () => {

											let vm = this
											this.$Modal.confirm({
												title: '提示',
												content: `<p>你确定要删除: ${params.row.name}</p>`,
												onOk() {
													vm.remove(params.row)
												}
											});
										}
									}
								}, '删除')
							]);
						}
					}
				],
				dataList: [],
				checkData: ''
			}
		},
		filters: {
			ShowCountDown,
			articleStatus: typeFilter.articleStatus
		},
		methods: {
			remove(row) {
				axios({
					method: 'post',
					url: api.API.file_unlink,
					data: {
						path: row.path,
						type: row.type,
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						this.notice(1, '删除成功！')
						this.getUserList()
					} else {
						this.notice(0, res.error_code)
					}
				}).catch(err => {
					console.log("错误：" + err);
				})
			},
			getPath(index) {
				let path = this.breadcrumbList.slice(0, index + 1)
				path = path.join('/') || '/upload'
				this.getFile({
					name: path,
					path: path,
				})
			},
			getFile(row) {
				if(row && row.name.indexOf('.') != -1) {
					let name = row.path.replace('/upload', '')
					this.fileName = row.name
					this.files = api.IMGURL + name
					this.modal2 = true
					return
				}
				this.$router.push({
					name: 'file',
					query: {
						p: row ? row.path : (this.$route.query.p || '/upload')
					}
				})
			},
			getUserList() {
				let getPath = this.$route.query.p || ''
				this.breadcrumbList = getPath.split('/')
				axios({
					method: 'post',
					url: api.API.file_catalogue,
					data: {
						path: getPath || '/upload'
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						this.dataList = res.result_data;
					} else {
						this.notice(0, res.error_code)
					}
				}).catch(err => {
					console.log("错误：" + err);
				})
			},

			downloadFile(row) {
				downloadFile(api.API.download_file + '?path=' + row.path + '&type=' + row.type, row.name)
//				axios({
//					method: 'get',
//					url: api.API.download_file + '?path=' + row.path + '&type=' + row.type,
//					data: {}
//				}).then(res => {
//					download(res, row.name)
//				}).catch(err => {
//					console.log("错误：" + err);
//				})

			},

			notice(type, text) {
				if(type == 1) {
					this.$Notice.success({
						title: text,
					});
				} else {
					this.$Notice.error({
						title: '服务器异常',
						desc: '错误信息：' + text
					});
				}
			},
			clear() {}
		},
		watch: {
			'$route' (to) {
				this.getUserList()
			}
		},
		mounted: function() {
			this.getUserList()
		},
	}
</script>

<style lang="less">
	@import "../static/css/main.less";
	.file {
		position: relative;
		min-height: 740px;
	}
	
	.file-header {
		padding: 20px 0;
	}
	
	.file-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		.ivu-modal {
			top: 0;
		}
		.ivu-modal-footer {
			display: none;
		}
		iframe {
			border-width: 0;
		}
		.setIframe {
			html {
				margin: 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
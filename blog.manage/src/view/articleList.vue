<template>
	<div class="details">
		<div class="search-top">
			<Row>
				<Col span="6">
				<p>文章ID：</p>
				<p>
					<Input v-model="form.id" placeholder="请你输入文章ID" style="width: 300px"></Input>
				</p>
				</Col>
				<Col span="6">
				<p>标题：</p>
				<p>
					<Input v-model="form.title" placeholder="请你输入文章标题" style="width: 300px"></Input>
				</p>
				</Col>
				<Col span="6">
				<p>文章分类：</p>
				<p>
					<Select v-model="form.type" style="width: 300px" placeholder="全部">
						<Option v-for="(item,index) in 4" :value="index" :key="index">{{index| articleType}}</Option>
					</Select>
				</p>
				</Col>

				<Col span="6">
				<p>文章状态：</p>
				<p>
					<Select v-model="form.status" style="width: 300px" placeholder="全部">
						<Option v-for="(item,index in 2" :value="index" :key="index">{{index | articleStatus}}</Option>
					</Select>
				</p>
				</Col>
				<Col span="6">
				<p>发布时间：</p>
				<p>
					<DatePicker v-model="accDate" type="daterange" split-panels placeholder="请选择发布时间" style="width: 300px"></DatePicker>
				</p>
				</Col>
				<Col span="6" offset="12" class="search-button">
				<Button type="primary" @click="getAreicleList">搜索</Button>
				<Button @click="clear">重置</Button>
				</Col>
			</Row>
		</div>
		<div>
			<Table border stripe :content="self" :columns="columns7" :data="dataList"></Table>
			<Row class="page">
				<Page placement="top" @on-page-size-change="changes" @on-change="change" :page-size="mypage.pageSN" :current="mypage.pageCurrent" :total="mypage.total_row_number" :page-size-opts="mypage.row_count" show-elevator show-sizer></Page>
				<span>共{{mypage.total_row_number}}条记录，当前页{{(mypage.pageCurrent-1)*mypage.pageSN + 1}}-{{(mypage.pageCurrent)*mypage.pageSN>mypage.total_row_number?mypage.total_row_number:(mypage.pageCurrent)*mypage.pageSN}}条</span>
			</Row>
		</div>
		<Modal v-model="showDetails" width="60%" :styles="{top: '20px'}" :title="details.title">
			<div class="tatile">
				<span>发布时间：{{details.create_time || '--'}}</span>
				<span>阅读数量：{{details.number}}</span>
			</div>
			<div class="quill-editor ql-container ql-snow no-b">
				<div class="ql-editor" v-html="details.content"></div>
			</div>
			<div slot="footer"></div>
		</Modal>

		<Modal v-model="modal2" width="360">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>删除文章！</span>
			</p>
			<div style="text-align:center">
				<p style="color: #f60;">ID:{{atricle.id}}</p>
				<h2>{{atricle.title}}</h2>
			</div>
			<div slot="footer">
				<Button type="error" size="large" long @click="remove(dataIdenx,'2')">确认</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import { ShowCountDown } from '../filter/dateFilter';
	import axios from 'common/httpUtils'
	import api from '../api/index'
	import CONSTS from 'common/consts'
	import dateFormat from 'common/dateFormat'
	import typeFilter from 'common/typeFilter.js'
	export default {
		data() {
			return {
				self: this,
				showDetails: false,
				modal2: false,
				details: {},
				atricle: '',
				dataIdenx: '',
				accDate: [],
				form: {
					id: '',
					title: '',
					type: '',
					status: '',
					start_date: '',
					end_date: '',
					row_start: 0,
					row_count: 10,
				},
				columns7: [{
						title: 'ID',
						key: 'id',
						width: 80,
						align: 'center'
					},
					{
						title: '标题',
						key: 'title',
						align: 'center',
					}, {
						title: '文章分类',
						key: 'type',
						align: 'center',
						render: (h, params) => {
							return h('span', typeFilter.articleType(params.row.type))
						}
					}, {
						title: '摘要',
						key: 'summary',
						align: 'center',
						render: (h, params) => {
							let summary = params.row.summary
							if(summary) {
								return h('Tooltip', {
									props: {
										trigger: 'hover',
										title: summary,
										placement: 'bottom'
									}
								}, [
									h('Tag', summary),
									h('div', {
										slot: 'content',
										style: {
											"white-space": 'normal',
										},
									}, summary)
								]);

							} else {
								return h('span', '--')
							}

						}
					}, {
						title: '阅读数量',
						key: 'number',
						sortable: true,
						align: 'center',
						width: 140,
					}, {
						title: '发布时间',
						key: 'create_time',
						align: 'center',
					}, {
						title: '修改时间',
						key: 'update_time',
						align: 'center',
					},
					{
						title: '状态操作',
						key: 'appSu',
						width: 120,
						align: 'center',
						render: (h, params) => {
							const row = params.row;
							const color = row.status == 0 ? 'primary' : 'error';
							const text = row.status == 0 ? '允许' : row.status == 1 ? '以禁止' : '--';
							return h('Button', {
								props: {
									type: color,
									size: 'small'
								},
								on: {
									click: () => {
										this.setActileAllow(params.index, row.status)
									}
								}
							}, text)
						}
					},
					{
						title: '操作',
						key: 'address',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.show(params.row.id, '2')
										}
									}
								}, '查看详情'),
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.update(params.row.id, '1')
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.row, '1')
										}
									}
								}, '删除')
							]);
						}
					}
				],
				dataList: [],
				mypage: {
					row_start_number: 0,
					row_count: 10,
					total_row_number: 0,
					row_count: [10, 20, 30, 40],
					pageSN: 10,
					pageCurrent: 1
				},
			}
		},
		filters: {
			ShowCountDown,
			articleType: typeFilter.articleType,
			articleStatus: typeFilter.articleStatus
		},
		methods: {
			show(id, type) {
				if(type == 1) {
					this.showDetails = false
				} else {
					this.showDetails = true
					this.getAreicle(id);
				}
			},
			update(id, type) {
				this.$router.push({
					name: 'rtf',
					query: {
						id: id
					}
				})
			},
			remove(index, type) {
				if(type == 1) {
					this.modal2 = true;
					this.atricle = index;
					this.dataIdenx = index;
				} else {
					this.modal2 = false;
					axios({
						method: 'get',
						url: api.API.article_delete + '/' + index.id,
						data: {}
					}).then(res => {
						if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
							this.dataList.splice(index, 1);
							this.notice(1, '删除成功！')
						} else {
							this.notice(0, res.error_code)
						}
					}).catch(err => {
						console.log("错误：" + err);
					})
				}
			},
			getAreicleList(type) {
				if(type == 1) {
					this.form.row_start = this.mypage.row_start_number;
					this.form.row_count = this.mypage.pageSN;
				}
				if(this.accDate[0]) {
					this.form.start_date = Date.parse(this.accDate[0]) / 1000
					this.form.end_date = Date.parse(this.accDate[1]) / 1000
				}
				axios({
					method: 'post',
					url: api.API.article_list,
					data: this.form
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						res.result_data.map(item => {
							item.create_time = dateFormat.dateFormat(item.create_time * 1000, 'yyyy-MM-dd hh:mm:ss') || '--'
							item.update_time = dateFormat.diffTime(item.update_time * 1000) || '--'
						})
						this.mypage.total_row_number = res.total_row;
						this.dataList = res.result_data;
					} else {
						this.notice(0, res.error_code)
					}
				}).catch(err => {
					console.log("错误：" + err);
				})
			},
			//阅读权限
			setActileAllow(index, type) {
				var setStatus = 0;
				if(type == 0) {
					setStatus = 1
				} else {
					setStatus = 0
				}
				axios({
					method: 'post',
					url: api.API.article_update,
					data: {
						id: this.dataList[index].id,
						status: setStatus
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						if(type == 0) {
							this.dataList[index].status = 1
						} else {
							this.dataList[index].status = 0
						}
						this.notice(1, '修改成功！')
					} else {
						this.notice(0, res.error_code)
					}
				}).catch(err => {
					console.log("错误：" + err);
				})
			},
			getAreicle(id) {
				axios({
					method: 'get',
					url: api.API.article_select + '/' + id,
					data: {}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						res.result_data.create_time = dateFormat.dateFormat(res.result_data.create_time * 1000)
						this.details = res.result_data;

					} else {
						this.notice(0, res.error_code)
					}
				}).catch(err => {
					console.log("错误：" + err);
				})
			},
			//分页监测页码的变化函数
			change: function(v) {
				this.mypage.pageCurrent = v;
				this.mypage.row_start_number = (v - 1) * this.mypage.pageSN;
				this.getAreicleList('1');
			},
			changes: function(v) {
				this.mypage.row_start_number = 0;
				this.mypage.pageSN = v;
				this.getAreicleList('1');
			},
			notice(type, text) {
				if(type == 1) {
					this.$Notice.success({
						title: text,
					});
				} else {
					this.$Notice.error({
						title: '服务器异常',
						desc: '错误代码：' + text
					});
				}
			},
			clear() {
				this.accDate = []
				this.form = {
					id: '',
					title: '',
					type: '',
					status: '',
					start_date: '',
					end_date: '',
					row_start: 0,
					row_count: 10,
				}
				this.getAreicleList()
			}
		},

		mounted: function() {
			this.getAreicleList()
		},
		components: {},
	}
</script>

<style lang="less">
	@import "../static/css/main.less";
	.details {
		position: relative;
		min-height: 740px;
	}
	
	.chonTime {
		margin-bottom: 20px;
	}
	
	.helpImg {
		max-width: 100%;
		max-height: 600px;
	}
	
	.showMp4 iframe {
		width: 100% !important;
		height: 600px !important;
	}
	
	.info>span {
		font-size: 24px;
	}
	
	.tatile {
		margin: 5px;
		font-size: 20px;
		font-weight: 600;
	}
	
	.tatile span:nth-child(2) {
		float: right;
	}
	
	.page {
		margin: 12px 0;
	}
	
	.page span {
		float: right;
		line-height: 34px;
	}
</style>
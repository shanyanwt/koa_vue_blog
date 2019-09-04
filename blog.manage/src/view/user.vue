<!--
	用户管理
	
-->

<template>
	<div class="user">
		<div class="user-header search-top">
			<Row>
				<Col span="6">
				<p>用户ID：</p>
				<p>
					<Input v-model="form.id" placeholder="请你输入用户ID"></Input>
				</p>
				</Col>
				<Col span="6">
				<p>用户名：</p>
				<p>
					<Input v-model="form.name" placeholder="请你输入用户名"></Input>
				</p>
				</Col>
				<Col span="6">
				<p>手机号：</p>
				<p>
					<Input v-model="form.phone" placeholder="请你输入手机号"></Input>
				</p>
				</Col>
				<Col span="6">
				<p>邮箱：</p>
				<p>
					<Input v-model="form.email" placeholder="请你输入邮箱号"></Input>
				</p>
				</Col>

				<Col span="6">
				<p>qq：</p>
				<p>
					<Input v-model="form.qq" placeholder="请你输入qq号"></Input>
				</p>
				</Col>

				<Col span="6">
				<p>用户状态：</p>
				<p>
					<Select v-model="form.status" placeholder="全部">
						<Option v-for="(item,index in 2" :value="index" :key="index">{{index | articleStatus}}</Option>
					</Select>
				</p>
				</Col>
				<Col span="6">
				<p>添加时间：</p>
				<p>
					<DatePicker v-model="accDate" type="daterange" split-panels placeholder="请选择发布时间"></DatePicker>
				</p>
				</Col>
				<Col span="6" class="search-button">
				<Button type="primary" @click="show">添加用户</Button>
				</Col>
				<Col span="6" offset="6" class="search-button">
				<Button type="primary" @click="getUserList">搜索</Button>
				<Button @click="clear">重置</Button>
				</Col>
			</Row>

		</div>
		<div>
			<Table border stripe :columns="columns7" :data="dataList"></Table>
			<Row class="page">
				<Page placement="top" @on-page-size-change="changes" @on-change="change" :page-size="mypage.pageSN" :current="mypage.pageCurrent" :total="mypage.total_row_number" :page-size-opts="mypage.row_count" show-elevator show-sizer></Page>
				<span>共{{mypage.total_row_number}}条记录，当前页{{(mypage.pageCurrent-1)*mypage.pageSN + 1}}-{{(mypage.pageCurrent)*mypage.pageSN>mypage.total_row_number?mypage.total_row_number:(mypage.pageCurrent)*mypage.pageSN}}条</span>
			</Row>
		</div>
		<Modal v-model="showAdd" width="460" class-name="vertical-center-modal" :title="isUpdate ? '修改密码':'添加用户'" :mask-closable="false">
			<div class="show-add" v-if="showAdd">
				<Form ref="formInline" label-position="top" :model="formInline" :rules="ruleInline">
					<FormItem :prop="isUpdate ? '':'name'" label="用户名">
						<Input v-model="formInline.name" :disabled="isUpdate"></Input>
					</FormItem>
					<FormItem prop="password" label="用户密码">
						<Input v-model="formInline.password" type="password"></Input>
					</FormItem>
					<FormItem prop="isPassword" label="确认密码">
						<Input v-model="formInline.isPassword" type="password"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer" class="show-add-foot">
				<Button @click="showAdd = false">取消</Button>
				<Button type="success" @click="add('formInline')">确认</Button>
			</div>
		</Modal>
		<Modal v-model="modal2" width="360" class-name="vertical-center-modal">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="information-circled"></Icon>
				<span>删除用户！</span>
			</p>
			<div>
				<p style="color: #f60;">ID:{{adminDetails.id}}</p>
				<h2>用户名：{{adminDetails.name}}</h2>
			</div>
			<div slot="footer" class="modal-foot">
				<Button type="error" size="large"  @click="remove(dataIdenx,'2')">确认</Button>
				<Button  size="large"  @click="modal2 = false">取消</Button>
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

	export default {
		data() {
			return {
				showAdd: false,
				formInline: {
					name: '',
					password: '',
					isPassword: '',
				},
				accDate: [],
				form: {
					id: '',
					name: '',
					phone: '',
					email: '',
					qq: '',
					status: '',
					start_date: '',
					end_date: '',
					row_start: 0,
					row_count: 10,
				},
				isUpdate: false,
				ruleInline: {
					name: [{
						validator: (rule, value, callback) => {
							if(this.isUpdate) {
								callback()
							}
							if(!value) {
								return callback(new Error('请填写用户名！'));
							} else if(value.length < 2) {
								return callback(new Error('用户名不能小于2位!'));
							}
							this.adminCheck().then(res => {
								if(res) {
									callback(new Error('该用户名已存在'));
								} else {
									callback()
								}
							}, function() {
								callback(new Error('网络异常稍后重试！'));
							})
						},
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请填写密码',
						trigger: 'blur'
					}, {
						type: 'string',
						min: 6,
						message: '密码长度不能小于6位',
						trigger: 'blur'
					}],
					isPassword: [{
						validator: (rule, value, callback) => {
							if(!value) {
								return callback(new Error('请填写确认密码！'));
							}
							// 模拟异步验证效果
							if(value != this.formInline.password) {
								callback(new Error('两次密码输入不一致！'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}]
				},

				columns7: [{
						title: 'ID',
						key: 'id',
						width: 80,
						align: 'center'
					},
					{
						title: '用户名',
						key: 'name',
						align: 'center',
					}, {
						title: '手机号',
						key: 'phone',
						width: 150,
						align: 'center',
					}, {
						title: '邮箱',
						key: 'email',
						width: 150,
						align: 'center',
					}, {
						title: 'qq',
						key: 'qq',
						align: 'center',
					}, {
						title: '添加时间',
						key: 'create_time',
						align: 'center',
					}, {
						title: '修改时间',
						key: 'update_time',
						align: 'center',
					}, {
						title: '上次登录时间',
						key: 'last_login_time',
						align: 'center',
					},
					{
						title: '状态操作',
						key: 'status',
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
											this.update(params.row, '1')
										}
									}
								}, '修改密码'),
								h('Button', {
									props: {
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index, '1')
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
				page: {
					row_start: 0,
					row_count: 10,
				},
				modal2: false,
				adminDetails: {},
				player: ""
			}
		},
		filters: {
			ShowCountDown,
			articleStatus: typeFilter.articleStatus
		},
		methods: {
			adminCheck() {
				return new Promise((resolve, reject) => {
					axios({
						method: 'get',
						url: api.API.admin_check + '/' + this.formInline.name,
						data: {}
					}).then(res => {
						if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
							resolve(res.result_data.is_user)
						} else {
							reject()
						}
					}).catch(err => {
						reject()
					})

				})

			},
			add(name) {
				let that = this
				this.$refs[name].validate((valid) => {
					if(valid) {
						let user_ticket = utils.md5((utils.md5((this.formInline.name).toLowerCase() +
							utils.md5(this.formInline.password))).toLowerCase())
						axios({
							method: 'post',
							url: this.isUpdate ? api.API.admin_update : api.API.admin_add,
							data: {
								name: this.formInline.name,
								user_ticket: user_ticket,
								id: this.adminDetails.id
							}
						}).then(res => {
							if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
								this.notice(1, this.isUpdate ? '更新成功！' : '添加用户成功')
								this.isUpdate = false
								that.getUserList()
								that.show()
							} else if(res.error_code == CONSTS.ERROR_CODE.CHECK_ALREADY_EXISTS) {
								that.$Notice.error({
									title: '该创建的用户名已存在！',
									desc: '错误代码：' + res.error_code
								});
							} else {
								this.notice(0, res.error_message)
							}
						}).catch(err => {
							console.log("错误：" + err);
						})

					}
				})

			},
			show() {
				this.showAdd = !this.showAdd
				if(this.showAdd) {
					this.formInline = {
						name: '',
						password: '',
						isPassword: ''
					}
				}
			},
			update(row, type) {
				this.showAdd = true;
				this.isUpdate = true
				this.adminDetails = row;
				this.formInline = {
					name: row.name,
					password: '',
					isPassword: ''
				}
			},
			remove(index, type) {
				if(type == 1) {
					this.modal2 = true;
					this.adminDetails = this.dataList[index];
					this.dataIdenx = index;
				} else {
					this.modal2 = false;
					axios({
						method: 'get',
						url: api.API.admin_delete + '/' + this.adminDetails.id,
						data: {}
					}).then(res => {
						if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
							if(res.result_data.is_user) {
								this.dataList.splice(index, 1); 
								this.notice(1, '删除成功！')
							} else {
								this.notice(0, '删除失败！')
							}
						} else {
							this.notice(0, res.error_code)
						}
					}).catch(err => {
						console.log("错误：" + err);
					})
				}
			},
			getUserList(type) {
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
					url: api.API.admin_list,
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
					url: api.API.admin_update,
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
					url: api.API.admin_select + '/' + id,
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
				this.getUserList('1');
			},
			changes: function(v) {
				this.mypage.row_start_number = 0;
				this.mypage.pageSN = v;
				this.getUserList('1');
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
			clear() {
				this.accDate = []
				this.form = {
					id: '',
					name: '',
					phone: '',
					email: '',
					qq: '',
					status: '',
					start_date: '',
					end_date: '',
					row_start: 0,
					row_count: 10,
				}
				this.getUserList()
			}
		},
		watch: {
			showAdd: function(newValue) {
				if(!newValue) this.isUpdate = false
			}
		},
		mounted: function() {
			this.getUserList()
		},
	}
</script>

<style lang="less">
	@import "../static/css/main.less";
	.user {
		position: relative;
		min-height: 740px;
	}
	
	.user-header {
		padding: 20px 0;
	}
	
	.show-add-foot {
		text-align: center;
	}
	
	.show-add-foot button {
		width: 30%;
	}
	
	.page {
		margin: 12px 0;
	}
	
	.page span {
		float: right;
		line-height: 34px;
	}
	 .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
    .modal-foot{
    	text-align: center;
    	button{
    		width: 40%;
    	}
    }
</style>
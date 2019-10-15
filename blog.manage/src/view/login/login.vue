/** * 登录页面 */
<template>
	<div class="wrapper">
		<h1>后台管理系统</h1>
		<div class="login">
			<i-form ref="formInline" :model="formInline" :rules="ruleInline">
				<Form-item prop="user">
					<Input v-model="formInline.user"></Input>
				</Form-item>
				<Form-item prop="password">
					<Input v-model="formInline.password" type="password"></Input>
				</Form-item>
				<Form-item>
					<i-button type="success" @click.native="handleSubmit('formInline')" long>登录</i-button>
				</Form-item>
			</i-form>
		</div>
	</div>

</template>

<script>
	import axios from '../../common/httpUtils';
	import consts from '../../common/consts';
	import cacheUtils from '../../common/cacheUtils'
	import api from '../../api/index'
	import utils from 'common/utils'

	export default {
		data() {
			return {
				formInline: {
					user: '',
					password: '',
				},
				ruleInline: {
					user: [{
						required: true,
						message: '请填写用户名',
						trigger: 'blur'
					}, {
						type: 'string',
						min: 2,
						message: '用户名不能小于2位',
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
					}]
				}
			}
		},
		methods: {
			handleSubmit(name) {
				let that = this
				this.$refs[name].validate((valid) => {
					if(valid) {
						that.gotoLogin()
					} else {
						this.$Message.error('表单验证失败!');
					}
				})
			},

			gotoLogin() {
				var timestamp = Date.parse(new Date()) / 1000
				let user_ticket = utils.md5(utils.md5((utils.md5((this.formInline.user).toLowerCase() +
					utils.md5(this.formInline.password))).toLowerCase()) + timestamp)
				axios({
					method: 'post',
					url: api.API.admin_login,
					data: {
						'user_ticket': user_ticket,
						'name': this.formInline.user,
						'timestamp': timestamp
					}
				}).then(res => {
					if(res.error_code == consts.ERROR_CODE.SUCCESS) {
						this.$Notice.success({
							title: '登录成功！',
						});
						cacheUtils.sessionStorage(consts.ACCESSTOKEN).set(consts.ACCESSTOKEN, res.result_data[consts.ACCESSTOKEN]);
						let userInfo = JSON.stringify(res.result_data)
						cacheUtils.localStorage(consts.USERINFO).set(consts.USERINFO, userInfo)
						this.$router.push('/home');
					} else if(res.error_code == consts.ERROR_CODE.USERNAME_OR_PASS_ERRROR) {
						this.$Notice.error({
							title: '用户名密码错误！'
						});
					} else {
						this.$Notice.error({
							title: '服务器挤爆了，稍后重试!'
						});
					}
				}).catch(err => {
					this.$Notice.error({
							title: '服务器挤爆了，稍后重试!'
						});
				})

			}
		}
	}
</script>
<style scoped>
	.wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		padding-top: 150px;
		padding-bottom: 200px;
	}
	
	.wrapper>h1 {
		text-align: center;
		vertical-align: middle;
		margin-bottom: 20px;
		color: #000;
	}
	
	.login {
		margin: 0 auto;
		padding: 200px auto;
		width: 200px;
		height: 100%;
	}
</style>
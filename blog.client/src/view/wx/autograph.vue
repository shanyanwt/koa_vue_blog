<!--微信签名算法-->
<template>
	<div id="">
		微信签名
	</div>
</template>

<script>
	import WXBizDataCrypt from '../../common/WXBizDataCrypt.js'
	export default {
		data() {
			return {}
		},
		methods: {},
		mounted() {
			//			https://api.weixin.qq.com/sns/jscode2session?appid=wx0b5ad12553706ebe&secret=SECRET&js_code=023H8Z2F1gtGj70Qbp4F1Oqo3F1H8Z2w&grant_type=authorization_code
			var codeId = "033XD5LS0PbweZ1P4vJS0C5YKS0XD5Lj"
			var signature = "08ebb8fd6567bb1634b45207490e2549c6e6adfd"
			var appId = 'wx0b5ad12553706ebe'
			var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
			var encryptedData = '2ohVESSjeny+nF0Rq15x5y2el5+P1WPZoT3WRs3Q4kG8sf/XXeBsZaqAtN/MCjVX4ZxGeb4wTAC9p8+z88f5RBoUE7bKdBL2E/L6iVYHx+khk/6zX4ef5yB2zqtCUcJFKl0n/lXK8N4pmW/BQmfZzGcTAsZfMIgpww7qkuFdzUpxBxmb70SOf1zs2OCV+2IZO21nJ5WsnviB5H/4nUe4hg=='
			var iv = 'Ecld66mahpYLKQPsfwAYpg=='
//			var pc = new WXBizDataCrypt(appId, sessionKey)
//			var data = pc.decryptData(encryptedData, iv)
//			console.log('解密后 data: ', data)
		},
		components: {}
	}
</script>

<style>

</style>
<!--
	头部搜索组件
-->
<template>
	<div class="search-top">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			labelSapn: {
				type: Number,
				default: 4
			},
		},
		provide() {
			return {
				form: this
			};
		},
		mounted() {},
	};
</script>
<style type="text/css">
	.search-top {
		width: 100%;
		padding: 20px 0;
		display: table;
	}
</style>
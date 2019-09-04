<!--
	头部搜索组件
-->
<template>
	<div class="search-top-item" :style="labelStyles">
		<p class="search-title">
			<slot name="title"></slot>
		</p>
		<slot name="body"></slot>
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
			},
		},
		inject: ['form'],
		mounted() {
		},
		computed: {
			labelStyles() {
				let style = {};
				const labelSapn = this.labelSapn || this.form.labelSapn;
				if(labelSapn) {
					style.width = `${100/labelSapn}%`;
				}
				return style;
			},
		}
	};
</script>
<style type="text/css">
	.search-top .search-top-item  {
		float: left;
		padding: 10px 0;
	}
	.search-top-item .search-title {
		display: inline-block;
	}
	
	.search-top-item .ivu-input-wrapper {
		width: auto;
	}
</style>
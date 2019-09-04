<template>
	<Breadcrumb>
		<BreadcrumbItem v-for="item in list" :href="item.path" :key="item.name">{{ itemTitle(item) }}</BreadcrumbItem>
	</Breadcrumb>
</template>

<script>
	import path from "../common/navData.js"
	export default {
		data() {
			return {
				list: path.currentPath,
			}
		},
		methods: {
			itemTitle(item) {
				if(typeof item.title === 'object') {
					return this.$t(item.title.i18n);
				} else {
					return item.title;
				}
			}
		},
		mounted() {
			//  	var index ={path:"/index",name: "index",title:"首页"}
			//  	this.list.push(index)
			console.log(this.list)
		}
	};
</script>
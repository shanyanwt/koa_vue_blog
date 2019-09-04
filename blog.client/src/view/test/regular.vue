<template>
	<div >
		<Row>
			<Col span="11">
				<Card>
					<p slot="title">
						<Icon type="ios-film-outline"></Icon>
						时间倒计时
					</p>
					<a href="#" slot="extra" @click.prevent="changeLimit">
						<Icon type="ios-loop-strong"></Icon>
						重置
					</a>
					<span>开始-</span>
					 <DatePicker :value="StartTime" v-model="StartTime" format="yyyy年MM月dd日" type="date" placeholder="选择时间" style="width: 32%"></DatePicker>
					 <span>-至结束-</span>
					 <DatePicker :value="endTime" v-model="endTime" format="yyyy年MM月dd日" type="date" placeholder="选择时间" style="width: 32%"></DatePicker>
					<p class="tool">距离来北京 {{day}} 天</p>
					
					 <Collapse v-model="value1">
				        <Panel name="1">
				           	查看源码
				            <p slot="content" type="pre">
				            	<!--<pre>
				            		<code>-->
				            			{{magee}}
				            		<!--</code>
				            	</pre>-->
				            	</p>
				        </Panel>
				    </Collapse>
				</Card>
			</Col>
			<Col span="11" offset="2">
				<Card>
					<p slot="title">
						<Icon type="ios-film-outline"></Icon>
						下载测试
					</p>
					<a @click="downloadFile('')" download="" id="download"><i></i> 下载</a>
					<a href="http://io.shikedian.com/y.pdf" download>下载</a>
				</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				age: '',
				value1: '0',
				StartTime: '2017-03-06',
				endTime: new Date(),
				magee:`GetDateDiff(startDate, endDate) {
					if(startDate && startDate){
						var startTime =Date.parse(startDate)
						var endTime = Date.parse(startDate)
						var dates = parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24));
						return dates;
					}else{
						return 0;
					}
				}`
			}
		},
		methods: {
			downloadFile(url) {
				var url = 'http://io.shikedian.com/y.pdf';
				var aaab = document.getElementById("download");
				aaab.href = url;
			},
			GetDateDiff(startDate, endDate) {
				if(this.StartTime && this.endTime){
					var startTime =Date.parse(this.StartTime)
					var endTime = Date.parse(this.endTime)
					var dates = parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24));
					return dates;
				}else{
					return 0;
				}
			},
			changeLimit(){
				this.StartTime = '';
				this.endTime = '';
			}
		},
		computed:{
			day(){
				return this.GetDateDiff('2017-03-06', '2018-07-15')
			}
		},
		mounted() {
		}

	}
</script>
<style type="text/css" scoped="scoped">
	.tool{
		line-height: 30px;
	}
	.ivu-collapse{
		background-color: #fff;
    	border: 0; 
	}
</style>
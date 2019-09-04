/* * 编辑文章 */

<template>

	<div class="posteditContent">
		<div class="post-from">
			<Form ref="form" :model="form" :rules="ruleValidate" label-position="left" :label-width="120">
				<FormItem label="文章标题" prop="title">
					<Input class="inputWidth500" v-model="form.title" placeholder="标题..."></Input>
				</FormItem>
				<FormItem label="E-email">
					<AutoComplete class="inputWidth500" v-model="form.email" @on-search="handleSearch2" placeholder="敢问英雄是否愿意留下邮箱">
						<Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
					</AutoComplete>
				</FormItem>
				<FormItem label="文章类型">
					<Tag v-for="item in form.classify" :key="item" :name="item" closable color="blue" @on-close="handleClose">{{ item}}</Tag>
					<Select filterable class="inputWidth150" @on-change="selectChange">
						<Option v-for="(option, index) in classifyList" :value="option" :key="index">{{option}}</Option>
					</Select>
					<Input v-model="classify" placeholder="请填写文章类型" clearable class="inputWidth150" @on-enter="inputChange" @on-blur="inputChange"></Input>
				</FormItem>
			</Form>
		</div>

		<quill-editor ref="myTextEditor" :options="editorOption">
			<div id="toolbar" slot="toolbar">
				<span class="ql-formats"><select class="ql-header">
		        <option value="1"></option>
		        <option value="2"></option>
		        <option value="3"></option>
		        <option value="4"></option>
		        <option value="5"></option>
		        <option value="6"></option>
		        <option selected="selected"></option>
		      </select></span>
				<span class="ql-formats"><button type="button" class="ql-bold"></button></span>
				<span class="ql-formats"><button type="button" class="ql-italic"></button></span>
				<span class="ql-formats"><button type="button" class="ql-underline"></button></span>
				<span class="ql-formats"><button type="button" class="ql-strike"></button></span>
				<span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
				<span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
				<span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
				<span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
				<span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
				<span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
				<span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
				<span class="ql-formats"><select class="ql-font">
	        <option selected="selected"></option>
	        <option value="serif"></option>
	        <option value="monospace"></option>
	      </select></span>
				<span class="ql-formats"><select class="ql-color"></select></span>
				<span class="ql-formats"> <select class="ql-background"></select></span>
				<span class="ql-formats">
	        <select class="ql-align">
	        <option selected="selected"></option>
	        <option value="center"></option>
	        <option value="right"></option>
	        <option value="justify"></option>
	      </select>
	      </span>
				<span class="ql-formats">
	          <button type="button" class="ql-clean"></button>
	      </span>
				<span class="ql-formats">
	          <button type="button" class="ql-link"></button>
	      </span>
				<span class="ql-formats">
	         <Upload
		       	ref="upload"
		       	:show-upload-list="false"
		        :on-success="handleSuccess"
		        :format="['jpg','jpeg','png']"
		        :max-size="2048"
		        :on-format-error="handleFormatError"
		        :on-exceeded-size="handleMaxSize"
		        multiple
		        :action="url">
		        <Icon type="image" size="18"></Icon>
		    </Upload>
	      </span>
				<span class="ql-formats">
	           <button type="button" class="ql-video"></button>
	       </span>
			</div>
		</quill-editor>
		<div class="submit skd-text-center">
			<Button type="primary" @click="handleSubmit('form')">提交</Button>
		</div>
		<!--<Button type="success" class="weButton" :disabled="content==''" @click="getContent">查看内容</Button>
		<div v-show="showContent" class="showArticle">
			<h1>{{form.title}}</h1>
			<div class="quill-editor ql-container ql-snow no-b">
				<div class="ql-editor" v-html="content"></div>
			</div>
		</div>-->
	</div>

	</div>

</template>

<script>
	import { quillEditor } from 'vue-quill-editor'
	import axios from '../../common/httpUtils'
	import api from '../../api/index'
	import CONSTS from '../../common/consts'

	export default {
		data() {
			return {
				content: "",
				editorOption: {
					modules: {
						toolbar: '#toolbar'
					},
					placeholder: '请输入内容...',
				},
				classifyList: ["html", "java", "html5", "Git", "svn", "javascript","程序员人生", "php", "css", "VueJS", "python", "node.js", "c++", "c objective-c", "golang", "shell", "swift", "c#", "ruby", "bash", "typescript", "sass asp.net", "less", "lua", "scala", "coffeescript", "actionscript", "erlang", "perl", "rust", "laravel", "spring", "django", "flask", "express", "ruby-on-rails", "yii", "tornado", "koa", "linux", "nginx", "apache", "docker", "ubuntu", "centos", "tomcat", "缓存 负载均衡", "unix", "hadoop", "mysql", "redis", "mongodb", "oracle", "nosql", "memcached", "sqlserver", "sqlite", "postgresql"],
				classify: '',
				imgUrl: '',
				url: api.UPLOAD_API.UPLOAD_AJXA,
				showContent: false,
				data2: [],
				summary: '', //摘要
				form: {
					title: '',
					email: '',
					classify: []
				},
				ruleValidate: {
					title: [{
						required: true,
						message: '请填写标题！',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			handleSuccess(res, file) {
				this.$Message.success("file");
				this.imgUrl = res.realName;
				var url = api.IMGURL + res.realName;
				this.editor.focus();
				this.editor.insertEmbed(this.editor.getSelection().index, 'image', url);
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式错误',
					desc: '你的' + file.name + '请你选择 jpg ， png，jpeg'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '文件过大',
					desc: '文件  ' + file.name + ' 上传文件小于 2M.'
				});
			},
			getContent() {
				this.showContent = true;
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.submitAreicle()
					} else {}
				})
			},
			handleSearch2(value) {
				this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
					value + '@qq.com',
					value + '@163.com',
					value + '@126.com',
					value + '@sina.com',
					value + '@gemail.com',
				];
			},
			handleClose(event, name) {
				let index = this.form.classify.indexOf(name);
				this.form.classify.splice(index, 1);
			},
			selectChange(value) {
				this.form.classify.push(value)
				this.classify = ''
			},
			inputChange() {
				if(!this.classify)return
				this.form.classify.push(this.classify)
				this.classify = ''
			},
			submitAreicle() {
				axios({
					method: 'post',
					url: api.ARTICLE_API.article_add,
					data: {
						title: this.form.title,
						type: 1,
						status: 1,
						content: this.content,
						eemail: this.form.email,
						cover: this.imgUrl,
						summary: this.summary,
						classify: this.form.classify.join(',')
						
					}
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						var url = "article/" + res.result_data.id;
						this.$router.push(url);
						this.$Notice.success({
							title: '添加文章成功',
							desc: '感谢你的支持'
						});
					} else {
						console.log("服务器异常")
					}
				}).catch(err => {
					console.log("失误：" + err);
				})
			}
		},
		computed: {
			editor() {
				return this.$refs.myTextEditor.quill
			}
		},
		mounted() {
			var self = this;
			self.editor.on('editor-change', function(eventName, args) {
				if(eventName === 'text-change') {
					self.content = self.editor.container.firstChild.innerHTML
				} else if(eventName === 'selection-change') {
					//				  	console.log("cdcdf",args)
				}
			});
		},
		components: {
			quillEditor
		},
	}
</script>

<style type="text/css">
	.posteditContent {
		padding: 20px;
		background: #FFFFFF;
	}
	
	.posteditContent .ql-container {
		height: 500px !important;
	}
	
	.ql-snow .ql-tooltip {
		left: 0 !important;
	}
	
	.weButton {
		margin: 20px;
	}
	
	.inputWidth500 {
		width: 500px;
	}
	
	.showArticle {
		margin-bottom: 20px;
		padding: 10px;
		background: #fff;
	}
	
	.tadRigth {
		margin-right: 66px;
	}
	
	.w-e-text {
		padding: 0;
		overflow-y: auto;
	}
	
	.w-e-text-container {
		height: 400px !important;
	}
	
	.submit button {
		width: 20%;
		margin: 20px;
	}
	
	.inputWidth150 {
		width: 150px;
	}
</style>
<template>
  <div class="q-conten">
    <div class="post-form">
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="标题" prop="title">
          <Input
            class="inputWidth500"
            v-model="form.title"
            placeholder="标题..."
          ></Input>
        </FormItem>
        <FormItem label="图片">
          <Upload
            ref="upload"
            type="drag"
            :show-upload-list="false"
            :on-success="upSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            class="upimg"
            multiple
            :action="url"
          >
            <div>
              <img
                v-if="form.imgUrl"
                class="upimg"
                :src="imageUrl + form.imgUrl"
              />
              <Icon
                v-else
                type="ios-cloud-upload"
                size="52"
                style="color: #3399ff; margin: 20px 0"
              ></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="展示位置">
          <RadioGroup v-model="form.type">
            <Radio :label="0">首页推荐</Radio>
            <Radio :label="1">普通文章</Radio>
            <Radio :label="2">资讯</Radio>
            <Radio :label="3">公告</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文章类型">
          <Tag
            v-for="(item, index) in form.classify"
            :key="index"
            :name="item"
            type="border"
            closable
            color="primary"
            @on-close="handleClose"
            >{{ item }}</Tag
          >
          <Select filterable class="inputWidth150" @on-change="selectChange">
            <Option
              v-for="(option, index) in classifyList"
              :value="option"
              :key="option"
              >{{ option }}</Option
            >
          </Select>
          <Input
            v-model="classify"
            placeholder="请填写文章类型"
            clearable
            class="inputWidth150"
            @on-enter="inputChange"
            @on-blur="inputChange"
          ></Input>
        </FormItem>
      </Form>
    </div>

    <quill-editor ref="myTextEditor" :options="editorOption">
      <div id="toolbar" slot="toolbar">
        <span class="ql-formats"
          ><select class="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option selected="selected"></option></select
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-bold"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-italic"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-underline"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-strike"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-blockquote"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-code-block"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-list" value="ordered"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-list" value="bullet"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-script" value="sub"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-script" value="super"></button
        ></span>
        <span class="ql-formats"
          ><button type="button" class="ql-indent" value="+1"></button
        ></span>
        <span class="ql-formats"
          ><select class="ql-font">
            <option selected="selected"></option>
            <option value="serif"></option>
            <option value="monospace"></option></select
        ></span>
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
            :format="['jpg', 'jpeg', 'png', 'gif']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            multiple
            :action="url"
          >
            <Icon type="md-images" size="18"></Icon>
          </Upload>
        </span>
        <span class="ql-formats">
          <button type="button" class="ql-video"></button>
        </span>
        <!--<span class="ql-formats" @click="modal9 = true">
		           <Icon type="eye" size="18"></Icon>
		       </span>-->
      </div>
    </quill-editor>
    <div class="foot">
      <div class="footSu">
        <Input
          v-model="summary"
          class="inputWidth600"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 8 }"
          placeholder="文章摘要"
        ></Input>
      </div>
      <div class="foot-but">
        <Button type="primary" @click="handleSubmit('form')">提交</Button>
        <Button @click="handleReset('form')" style="margin-left: 8px"
          >取消</Button
        >
      </div>
    </div>
    <Modal title="Title" v-model="modal9" width="60%" :styles="{ top: '20px' }">
      <div class="quill-editor ql-container ql-snow no-b">
        <div class="ql-editor" v-html="content"></div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import axios from "common/httpUtils";
import api from "../api/index";
import CONSTS from "common/consts";
import utils from "common/utils";
export default {
  //https://segmentfault.com/a/1190000009877910
  //https://quilljs.com/docs/api/ 官方文档
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: "#toolbar",
        },
        placeholder: "请输入内容...",
      },
      modal9: false,
      url: api.API.upload,
      imageUrl: api.IMGURL,
      summary: "", //摘要
      loading2: false,
      classifyList: [
        "Git",
        "svn",
        "javascript",
        "php",
        "css",
        "vue",
        "html",
        "java",
        "html5",
        "python",
        "node.js",
        "c++",
        "c objective-c",
        "golang",
        "shell",
        "swift",
        "c#",
        "ruby",
        "bash",
        "typescript",
        "sass asp.net",
        "less",
        "lua",
        "scala",
        "coffeescript",
        "actionscript",
        "erlang",
        "perl",
        "rust",
        "laravel",
        "spring",
        "django",
        "flask",
        "express",
        "ruby-on-rails",
        "yii",
        "tornado",
        "koa",
        "linux",
        "nginx",
        "apache",
        "docker",
        "ubuntu",
        "centos",
        "tomcat",
        "缓存 负载均衡",
        "unix",
        "hadoop",
        "mysql",
        "redis",
        "mongodb",
        "oracle",
        "nosql",
        "memcached",
        "sqlserver",
        "sqlite",
        "postgresql",
      ],
      form: {
        title: "",
        classify: [],
        type: 0,
        imgUrl: "",
      },
      classify: "",
      ruleValidate: {
        title: [
          {
            required: true,
            message: "请填写标题！",
            trigger: "blur",
          },
          {
            type: "string",
            max: 50,
            message: "标题最多50个字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    upSuccess(res, file) {
      this.form.imgUrl = res.realName;
    },
    handleSuccess(res, file) {
      this.$Message.success("上传成功");
      var url = api.IMGURL + res.realName;
      this.editor.focus();
      this.editor.insertEmbed(this.editor.getSelection().index, "image", url);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "你的" + file.name + "请你选择 jpg ， png，jpeg",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: "文件  " + file.name + " 上传文件小于 2M.",
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitAreicle();
        } else {
          this.$Message.error("提交失败请检查后在提交");
          console.log(this.content);
        }
      });
    },
    handleReset(name) {
      //				this.$refs[name].resetFields();
      this.$router.go(-1);
    },
    handleClose(event, name) {
      let index = this.form.classify.indexOf(name);
      this.form.classify.splice(index, 1);
    },
    selectChange(value) {
      this.form.classify.push(value);
      this.classify = "";
    },
    inputChange() {
      if (!this.classify) return;
      this.form.classify.push(this.classify);
      this.classify = "";
    },
    getAreicle() {
      axios({
        method: "get",
        url: api.API.article_select + "/" + this.$route.query.id,
      })
        .then((res) => {
          if (res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
            let resData = res.result_data;
            //插入html
            this.editor.focus();
            this.editor.clipboard.dangerouslyPasteHTML(
              this.editor.getSelection().index,
              resData.content
            );
            this.form.title = resData.title;
            this.form.type = resData.type;
            if (resData.classify)
              this.form.classify = utils.markSplit(resData.classify);
            this.form.imgUrl = resData.cover;
            this.summary = resData.summary;
          } else {
            this.notice(0, res.error_code);
          }
        })
        .catch((err) => {
          console.log("失误：" + err);
        });
    },
    submitAreicle() {
      let queryID = this.$route.query.id;
      axios({
        method: "post",
        url: queryID ? api.API.article_update : api.API.article_add,
        data: {
          id: queryID,
          title: this.form.title,
          type: parseInt(this.form.type),
          content: this.content,
          cover: this.form.imgUrl,
          summary: this.summary,
          classify: this.form.classify.join(","),
        },
      })
        .then((res) => {
          if (res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
            this.notice(1, queryID ? "修改文章成功！" : "添加文章成功！");
            this.$router.push("/articleList");
          } else {
            this.notice(0, res.error_code);
          }
        })
        .catch((err) => {
          console.log("失误：" + err);
        });
    },
    notice(type, text) {
      if (type == 1) {
        this.$Notice.success({
          title: text,
        });
      } else {
        this.$Notice.error({
          title: "服务器异常",
          desc: "错误代码：" + text,
        });
      }
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
  },
  mounted() {
    var self = this;
    if (self.$route.query.id) {
      self.getAreicle();
    }
    self.editor.on("editor-change", function (eventName, args) {
      if (eventName === "text-change") {
        self.content = self.editor.container.firstChild.innerHTML;
      } else if (eventName === "selection-change") {
        //				  	console.log("cdcdf",args)
      }
    });
  },
  components: {
    quillEditor,
  },
};
</script>
<style type="text/css">
/*white-space: pre-wrap;*/
/*p标签文字自动样式空格*/

.q-conten {
  padding: 0 12%;
}

.ql-container {
  height: 500px;
}

.ql-snow .ql-tooltip {
  left: 0 !important;
}

.upimg {
  width: 160px;
  /*height: 120px;*/
}

.foot {
  margin-top: 10px;
}

.footSu {
  margin-bottom: 10px;
}

.ivu-form .ivu-form-item-label {
  font-size: 14px;
}

.inputWidth150 {
  width: 150px;
}

.inputWidth500 {
  width: 500px;
}

.inputWidth600 {
  width: 600px;
}
/*编译器的样式修改*/

.no-b {
  border: 0 !important;
}

.ql-snow .ql-editor pre.ql-syntax {
  background-color: #efefef;
  color: #4f4f4f;
}
.foot-but {
  text-align: center;
}
.foot-but button {
  width: 200px;
}
</style>
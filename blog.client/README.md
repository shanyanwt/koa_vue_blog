# 客户端文档

基于Vue2 + iView2.0的后台管理系统解决方案示例.


### 目前实现的功能及用到的组件
- [x] [Vue](https://cn.vuejs.org)
- [x] 页面： [iView2.0](https://github.com/iview/iview)
- [x] 文章列表、文章分类
- [x] 富文本框： [quillEditor](https://github.com/surmon-china/vue-quill-editor)
- [x] 文件上传： [使用iView自带的文件上传组件](https://www.iviewui.com/components/upload)

### 使用
```
npm i               // 安装依赖
npm run dev         // 本地开发
npm run build       // 生产部署
```

### 目录结构

```
.
├─build                             //构建配置目录
│
├─config                            //配置目录端口
│
└─src
    │  App.vue                      //入口文件
    │  main.js                          
    │
    ├─api                           //api接口配置目录
    │
    ├─common                        //工具类
    │
    ├─components                    //组件目录
    │
    ├─error                         //错误页面
    │
    ├─filter                        //过滤器
    │
    ├─router                        //路由文件
    │      index.js
    │
    ├─static                        //静态文件
    │
    └─view                           
        │  main.vue                 //主入口文件
        │
        ├─article                             
        │      details.vue          //文章详情
        │      history.vue          //项目历史记录
        │      postedit.vue         //编辑文章
        │      tools.vue            //推荐小工具
        │
        ├─index                     //首页
        │      index.vue
        │
        ├─search                    //搜索页
        │      search.vue
        │
        └─test                      //测试目录

```
客户端添加的文章默认是普通文章，需要管理端审核后才可以查看相应的内容

![image](https://img-blog.csdnimg.cn/20190903165744277.png)

	

### 我是一只孤独的狼......[欢迎star](https://github.com/shanyanwt/koa_vue_blog)
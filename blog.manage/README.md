# 管理端文档

基于Vue-lic4 + iView4.5.0的后台管理系统解决方案简单示例.
### 目前实现的功能及用到的组件
- [x] [Vue2.6](https://cn.vuejs.org)
- [x] 页面： [iView4.5.0](https://github.com/iview/iview)
- [x] 文章列表、文章分类
- [x] 用户列表、用户注册
- [x] 富文本框： [quillEditor](https://github.com/surmon-china/vue-quill-editor)
- [x] 文件上传： [使用iView自带的文件上传组件](https://www.iviewui.com/components/upload)
- [x] 账号：admin/12345678

###升级指南
新项目忽略 [源项目](https://github.com/shanyanwt/koa_vue_blog/tree/blog_1.0/blog.manage)
1. 去除webpack3.0的多余配置
2. 使用vue-cli4.0脚手架配置更信息
3. 更新原有的package.json，去除多余包
4. 升级iview 4.5.0适用新的文档及须求
5. 于原项目icon不一致的情况，自行检查

### 使用
```
npm i               // 安装依赖
npm run dev         // 本地开发
npm run build       // 生产部署
```

### 目录结构

```
.
├─src
    │  App.vue                           //入口文件
    │  main.js
    │
    ├─api                                //api
    │
    ├─common                             //工具类
    │
    ├─components                         //组件
    │      countUp.vue                   //数字滚动组件
    │      uploadImg.vue                 //压缩图组件
    │
    ├─filter                             //过滤器
    │      dateFilter.js
    │
    ├─router                             //路由
    │      index.js
    │      router.js
    │
    ├─static                             //静态文件
    │
    ├─template                           //打包模板
    │      index.ejs
    │
    ├─vendors                            //打包模板
    │
    └─view
        │  about.vue                     //关于我们
        │  articleList.vue               //文章列表
        │  main.vue                      //入口
        │  rtf.vue                       //编辑文章
        │  user.vue                      //用户列表
        ├─index                          //首页
        │
        └─login                          //登录页

```

![image](https://img-blog.csdnimg.cn/20190903112940295.png)
![image](https://img-blog.csdnimg.cn/201909040911214.png)
![image](https://img-blog.csdnimg.cn/20190904091201544.png)




### 我是一只孤独的狼......[欢迎star](https://github.com/shanyanwt/koa_vue_blog)
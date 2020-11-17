<p align="center">
    <img width="123" src="https://img-blog.csdnimg.cn/20190901094108164.png">
</p>

# koa+mysql+vue+iview 前后端分离blog项目
> 作为前端开发者一直想应用开发出属于自己的应用程序，受制于后端的限制，使用nodejs 环境开发后端作为服务。

> 首先选择数据库Mysql ,它相对于MongoDB 更有学习价值虽然 MongoDB很优秀，Mysql也会和公司的数据库无缝结合。 koa为服务端使用sequelize 很好的异步处理mysql事物处理，koa-body上传文件、koa-cors api多类型传世跨域， sequelize-auto 可为sequelize生成实体类更高效使用。validator 参数校验器自动返回 JSON message和key

> vue+iview（SPA）单页面为客户端和服务端

### 依赖
```
node -v 8.4.0
npm -v 5.3.0
npm2 -v 3.5.1
```

### 目录结构

```
.
├─blog.client                   //客户端
├─blog.manage                   //管理端
├─blog.service                  //服务端    
└─skd.sql                       //博客表
```

### 安装

使用 npm:

```
 git https://github.com/shanyanwt/koa_vue_blog.git
    npm install
    npm run dev
    npm run build
    npm run pm2 //blog.service  服务运行
```
### Docs

```
    blog.service 服务端启动时执行skd.sql
    管理端登录
    name:admin
    password:admin123
    ps:sql
    INSERT INTO `skd_admin` VALUES (null, null, 'admin', null, 'shanyanwt@163.com', '3aceb9fb5f01c2b83c8c2482cc256f51', null, '0', null, '0', '1567476440', '1567476440', null);
```



![koa](https://img-blog.csdnimg.cn/20190904095712258.png)
![客户端](https://img-blog.csdnimg.cn/20190903165744277.png)
![管理端](https://img-blog.csdnimg.cn/201909040911214.png)
![管理端](https://img-blog.csdnimg.cn/20190904091201544.png)
推荐一些小工具
![image](https://img-blog.csdnimg.cn/20190904101410720.png)

### 项目Links
- [客户端](https://github.com/shanyanwt/koa_vue_blog/tree/master/blog.client)
- [管理端](https://github.com/shanyanwt/koa_vue_blog/tree/master/blog.manage)
- [服务端](https://github.com/shanyanwt/koa_vue_blog/tree/master/blog.client)

### [about](https://github.com/shanyanwt/koa_vue_blog/tree/master/blog.manage/src/view/about)
如果你有好的意见和建议，请发邮件到：shanyanwt@163.com

愿你保持独立思考、不卑、不亢、不怂努力长成自己喜欢的样子
### 我是一只孤独的狼......[欢迎star](https://github.com/shanyanwt/koa_vue_blog)
[![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=shanyanwt&orgs=d2-projects&show_icons=true&count_private=true)](https://github.com/anuraghazra/github-readme-stats)

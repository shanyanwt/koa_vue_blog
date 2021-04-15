<p align="center">
    <img width="123" src="https://img-blog.csdnimg.cn/20190901094108164.png">
</p>

# koa+mysql+vue+iview 前后端分离blog项目
> 基于node koa为服务端使用sequelize 很好的异步处理mysql事物处理，koa-body上传文件、koa-cors api多类型传世跨域， sequelize-auto 可为sequelize生成实体类更高效使用。
vue+iview（SPA）单页面为客户端和服务端
### 项目Link
- [管理端](https://github.com/shanyanwt/koa_vue_blog/tree/master/blog.manage)
- [服务端](https://github.com/shanyanwt/koa_vue_blog/tree/master/blog.client)
### 依赖
```
node -v >10.4.0
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
使用 npm 或者 yarn
```
 git https://github.com/shanyanwt/koa_vue_blog.git
    npm install & yarn
    npm run dev
    npm run build
    npm run pm2 //blog.service  服务运行
```
### Docs

```
    blog.service 服务端启动时执行skd.sql
    管理端登录
    name:admin
    password:12345678
    ps:sql
    INSERT INTO `skd_admin` (`role_id`, `name`, `phone`, `email`, `password`, `qq`, `sex`, `content`, `status`, `create_time`, `update_time`, `last_login_time`) VALUES (NULL, 'admin', NULL, 'shanyanwt@163.com', 'da797ae4f8b0c189e521c580a52e3b6c', NULL, '0', '默认密码：12345678', '0', '1567476440', '1618282320', NULL);
```



![koa](https://img-blog.csdnimg.cn/20190904095712258.png)
![客户端](https://img-blog.csdnimg.cn/20190903165744277.png)
![管理端](https://img-blog.csdnimg.cn/201909040911214.png)
![管理端](https://img-blog.csdnimg.cn/20190904091201544.png)
推荐一些小工具
![image](https://img-blog.csdnimg.cn/20190904101410720.png)
### [about](https://github.com/shanyanwt/koa_vue_blog/blog.manage/src/view/about)
如果你有好的意见和建议，请发邮件到：shanyanwt@163.com

>愿你保持独立思考、不卑、不亢、不怂努力长成自己喜欢的样子

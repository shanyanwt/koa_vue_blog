node+koa2+sequelize+mysql+pm2 (欢迎star)

## 简介

- [x]   koa2 作为主要node service 入口
- [x]   webpack 打包node 环境
- [x]   pm2  [服务负载均衡](http://pm2.keymetrics.io/)
- [x]   mysql  数据库
- [x]   sequelize 强大的事务 [mysql](https://github.com/demopark/sequelize-docs-Zh-CN)
- [x]   koa-body，文件上传中间件
- [x]   koa-cors koa 跨域中间件
- [x]   validator 参数校验器自动返回  JSON message和key
- [x]  log4[ 日志输出](https://www.npmjs.com/package/log4js)
  
  ......
  
### 依赖
```
node -v 8.4.0
npm -v 5.3.0
npm2 -v 3.5.1
```
## 目录

```
.
├─auto //sequelize-auto 自动生成 models实体类
└─src
    |  main.js   //入口文件
    |  router.js  // controller 入口
    |
    ├─config    //配置文件
    ├─controller  //api层
    ├─models     // 实体类
    ├─test     // 测试类
    ├─utils     // 工具类
    └─validator //参数校验器
    
```
## 部署

```
    git https://github.com/shanyanwt/koa_vue_blog.git
    npm install
    开发环境
    npm run dev
        localhost:8081
    生产环境
    npm run build  //生成app.js
    npm run pm2
        localhost:8081
```

## supervisor nodejs 热加载 开发环境使用
  supervisor -w src ,添加需要监听的文件，默认是全部但是有时不起作用，加上监听的文件即可
  
## 创建数据库连接 
> sequelize 连接mysql

```
    sequelize 安装
    $> npm i sequelize mysql mysql2 --save-dev
```

>  创建连接

```
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize(dbName, dbUser, dbPas, {
    	host: dbHost,
    	dialect: 'mysql',
    	pool: {
    		max: 5,
    		min: 0,
    		idle: 10000
    	},
    	define: {
    		timestamps: false //关闭时间戳
    	}
    })
    //测试连接
    sequelize.authenticate().then(() => {
    	// 连接成功
    }).catch(err => {
    	 //在这里可以添加邮箱通知
    });
    
```
- [sequelize](https://github.com/demopark/sequelize-docs-Zh-CN/tree/master) wiki

    方法名 | 属性| 返回结果
    ---     |---  |---
    create| 添加       |return 所添加信息 Object
    bulkCreate| 批量添加       |return 所添加信息 Array
    findOne| 查询单条       |return  Object
    findByPk| 根据主键查询       |return  Object
    findAll| 查询       |return  Array
    findAndCountAll| 分页查询       |return  Object -> count:Number,rows:Array
    update| 更新      |return  1 or 0   Number
    destroy | 删除     | return  1or 0   Number
    max('age')  | 计算最大     | return Object
    min('age') | 计算最小     | return  Object
    sum('age') | 计算总和     | return  Object
    count | 查询条数     | return  1or 0   Number
    query | 原始sql查询     | return  Object
 - sequelize属性方法 wiki     
    方法名 | 属性| 备注
        ---     |---  |---
    attributes:['id'] | 包含条件查询     | 只查询id
    db.literal('`star_number` +1') | 自定义字符|不会转义，可作为sql执行
    db.transaction| 事物处理|可对批量操作进行事物处理，失败自行pormise处理或者 throw new Error(), 自行回滚

      
ps: db是从modes中导出已连接库的sequelize
 
  
  
## models生成	sequelize-auto 插件

>  models生成  可在auto 目录中执行密令

```
1. 进入 auto文件夹输入 
    $ node auto.js
2. 执行完 auto.js 会生成models及表实体类并且导出为index.js 
```
> auto.js文件所执行命令，也可手动在终端输入此命令

```
   sequelize-auto -h "数据库地址" -d "数据库名" -u "用户名" -x "密码" -p "端口号"  --dialect mysql -o "生成文件的路径"
```

 
  
## LinValidator 参数校验器
自定校验传入参数是否正确，错误将会返回错误 JSON message和key

1.userValidator.js
```
引入
const {
	XValidator,
	Rule
} = require('../validator/validator.js');

/* 
	模拟用户注册规则
 */

class RegisterValidator extends LinValidator {
	constructor() {
		super();
		//链式校验规则
		this.name = [
			new Rule('isNotEmpty', '昵称不可为空'),
			new Rule('isLength', '昵称长度必须在2~10之间', 2, 10)
		];
		this.email = [
			new Rule('isOptional'),
			new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
		];
		this.password = [
			// 自定义matches 方法
			new Rule(
				'matches',
				'密码长度必须在6~22位之间，包含字符、数字和 _ ',
				/^[A-Za-z0-9_*&$#@]{6,22}$/
			)
		];
		this.confirm_password = new Rule('isNotEmpty', '确认密码不可为空');
	}
	/* 
		自定义 calidate 校验规则
		必须以 calidate开头的一个方法， data是传入参数
		 成功是 返回true
		 错误 ConfirmPassword 
	 */
	validateConfirmPassword(data) {
		if (!data.body.password || !data.body.confirm_password) {
			return [false, '两次输入的密码不一致，请重新输入'];
		}
		let ok = data.body.password === data.body.confirm_password;
		if (ok) {
			return ok;
		} else {
			return [false, '两次输入的密码不一致，请重新输入'];
		}
	}
}
module.exports = {
	RegisterValidator
};
```
2. user.js

```
const {
	RegisterValidator
} = require('./userValidator.js');


const testRegister = async ctx => {
    //调用 RegisterValidator 
    // 校验合法继续向下走 ，不可发则抛出异常 throw Error()
    const v = await new RegisterValidator().validate(ctx);
    /* v  返回 body, query ，params，header请求参数 
		 链式取值 可以防止多层对象无结值的错误
	 */
	 // post取值
	var  name =  v.get('body.user.index.items.name')
	//  get取值
	var getName = v.get('query.name') 
	/**.不合法将会返回
    	{
    			"error_code": 20001,
    			"error_message": {
    				"name": "昵称不可为空",
    				"password": "密码长度必须在6~22位之间，包含字符、数字和 _ ",
    				"confirm_password": "确认密码不可为空",
    				"ConfirmPassword": "两次输入的密码不一致，请重新输入"
    			}
    		}
	*/
}

```

## 生产环境部署 pm2 配置
> 生产环境 centos 7 以及上述所有依赖

```
	全局安装  npm install pm2 -g 
	$ pm2 -v
	> 3.5.1
    配置 pm2.conf.json
	打印日志输出文件
	"out_file": "./out.log",
	"error_file": "./out.log"
	"instances": 2  //打开多任务作为负载均衡
```
## 生产部署步骤
1. build 生成app.js
   ```
    npm run build
    ```
2. 上传服务器文件

    ![image](https://img-blog.csdnimg.cn/20190806104358975.png)

3. 安装依赖
    ```
     npm install
    ```
4. pm2 服务部署
     ```
     $ npm run pm2       //启动服务
     ps: 确保已安装，上述依赖 $ npm install pm2 -g 
    ```
    
    ![image](https://img-blog.csdnimg.cn/20190806111004360.png)
    
    $ pm2 list        //查看已运行服务
    ![image](https://img-blog.csdnimg.cn/2019080611103250.png)
    
   $pm2 logs     //查看服务日志
   
   ![image](https://img-blog.csdnimg.cn/20190806111651791.png)
   
   $ pm2 stop 0  //停止响应的进程
   
   ps: 在此服务已经发布完成，可以根据服务器 ip:8081调用，在次更新只需把打好的app.js上传服务器，重启即可
   
### 我是一只孤独的狼......[欢迎star](https://github.com/shanyanwt/koa_vue_blog)
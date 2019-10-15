/* 
 文件操作工具 
 1. fs.stat  检测是文件还是目录(目录 文件是否存在) 
 2. fs.mkdir  创建目录 （创建之前先判断是否存在） 
 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
 4. fs.appendFile 写入追加文件 
 5. fs.readFile 读取文件 
 6. fs.readdir 读取目录 
 7. fs.rename 重命名 
 8. fs.rmdir  删除目录 
 9. fs.unlink 删除文件 
 10. fs.createReadStream  从文件流中读取数据，读取的文件比较大时建议用流的方式读取，文件比较大会多次读取。  
 11. fs.createWriteStream  写入文件流  
 12. pipe 管道流  
 13. fs.access 判断目录、文件是否存在(读写权限)
 14. fs.mkdirFile 循环创建目录
*/

var fs = require('fs');
const fileUtils = async ctx => {
	var name = ctx.name, //文件名字、路径
		type = ctx.type, //fs方法
		newName = ctx.newName, //新文件名字、路径
		txt = ctx.txt; //写入文件内容
	return new Promise((resolve, reject) => {
		switch (type) {
			//1. fs.stat  检测是文件还是目录  fs.statSync()同步获取stats对象,通过返回值接收。
			case 'stat':
				fs.stat(name, function(error, stats) {
					if (error) {
						reject(error)
						return false;
					}
					resolve(stats)
				})
				break;

				//2. fs.mkdir  创建目录 
			case 'mkdir':
				fs.mkdir(name, function(error) {
					if (error) {
						reject(error)
						return false;
					}
					resolve(1)
				})
				break;
				//3. fs.writeFile  写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略  
			case 'writeFile':
				fs.writeFileSync(name, txt, 'utf8', function(error) {
					if (error) {
						reject(error)
						return false;
					}
					resolve(1)
				})
				break;

				//4. fs.appendFile 追加文件  
			case 'appendFile':
				fs.appendFile(name, txt, 'utf8', function(error) {
					if (error) {
						reject(error)
						return false;
					}
					resolve(1)
				})
				break;


				//5.fs.readFile 读取文件  
			case 'readFile':
				fs.readFile(name, 'utf8', function(error, data) {
					if (error) {
						reject(error)
						return false;
					}
					//data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
					resolve(data)
				})
				break;

				//6.fs.readdir 读取目录下第一级内容  把目录下面的文件和文件夹都获取到。  
			case 'readdir':
				fs.readdir(name, function(error, data) {
					if (error) {
						reject(error)
						return false;
					}
					resolve(data) //data是数组类型，包含文件夹以及文件的名字(只有第一级目录内容)。拿到一个文件夹下面的所有目录 
				})
				break;

				//7.fs.rename 重命名  1.改名  2.剪切文件(移动)  
			case 'rename':
				fs.rename(name, newName, function(error) {
					if (error) {
						reject(error)
						return false;
					}
					resolve(1)
				})
				break;
				//8. fs.rmdir  删除目录   rmdir 这个方法只能删除目录，不能删除文件  
			case 'rmdir':
				fs.rmdir(name, function(error) {
					if (error) {
						reject(error)
						return false;
					}
					resolve(1)
				})
				break;

				//9. fs.unlink删除文件  
			case 'unlink':
				fs.unlink(name, function(error) {
					if (error) {
						reject(error)
						return false;
					}
					resolve(1)
				})
				break;

				//10. fs.createReadStream  从文件流中读取数据，读取的文件比较大时建议用流的方式读取，文件比较大会多次读取。  
			case 'createReadStream':
				var fileReadStream = fs.createReadStream(name);
				var str = '';
				fileReadStream.on('data', (data) => {
					str += data;
				})
				fileReadStream.on('end', () => {
					resolve(str)
				})
				fileReadStream.on('error', (error) => {
					reject(error)
				})
				break;

				//11. fs.createWriteStream  写入文件流  
			case 'createWriteStream':
				var data = txt;
				var writerStream = fs.createWriteStream(name);
				writerStream.write(data, 'UTF8');
				writerStream.end(); //标记文件末尾  结束写入流，释放资源  
				writerStream.on('finish', function() {
					resolve(1)
				});
				writerStream.on('error', function(error) {
					reject(error)
				});
				break;
				//12. pipe 管道流  
			case 'pipe':
				var readerStream = fs.createReadStream(name);
				var writerStream = fs.createWriteStream(newName);
				readerStream.pipe(writerStream);
				writerStream.on('finish', () => {
					resolve(newName)
				});
				writerStream.on('error', (err) => {
					reject(err)
				});
				break;

				//13. fs.access 判断目录、文件是否存在(读写权限)
			case 'access':
				fs.access('package.json', (err) => {
					resolve(err)
				});
				break;
				//14. fs.mkdirFile 循环创建目录
			case 'mkdirFile':
				let pathList = name.split('/');
				let fileDir = ''
				pathList.forEach((i, index) => {
					if (i) {
						fileDir += ('/' + i)
						if (!fs.existsSync(fileDir)) {
							fs.mkdirSync(fileDir, err => {
								reject(err)
							});
						}
						if (pathList.length - 2 == index) {
							resolve(1)
						}
					}
				})
				break;
		}
	})
}
module.exports = {
	fileUtils
};

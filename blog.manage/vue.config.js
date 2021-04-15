
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
    lintOnSave: false,//关闭 eslint
    publicPath: '/',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('api', resolve('./src/api'))
            .set('common', resolve('./src/common'))
            .set('components', resolve('./src/components'))
    }

}
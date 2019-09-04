import Vue from 'vue'

export default new Vue();

/*使用方法，
 * import Bus from 'common/bus'//监听和触发都必须引入Bus（Bus自定义）;
 * 在要触发事件的组件中添加来触发事建；
 * eg:Bus.$emit('getTarget')//getTarget是自定义的，自已命名，getTarget必须是一样的
 * 在要监听的组件中添加监听事件
 * eg:Bus.$on('getTarget',() => {
 * 	//要监听的事件或数据
 * })
 * */
/*eg:
 * Bus.$emit('EVENT_TYPE.upDataCartNum');页面触发
 * Bus.$on('EVENT_TYPE.upDataCartNum', () => {//页面监听
 * 	this.countMarketCart();
 * })
 */
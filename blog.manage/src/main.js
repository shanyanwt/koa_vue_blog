import Vue from 'vue'
import App from './App'
import {router} from './router/index';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'babel-polyfill'
import './static/css/base.css'

//import IEcharts from 'vue-echarts-v3';

Vue.use(iView)
//Vue.use(IEcharts)

Vue.config.productionTip = false

new Vue({
	el: '#app',
    router: router,
    render: h => h(App)
})
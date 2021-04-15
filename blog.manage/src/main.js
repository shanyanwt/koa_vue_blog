

import Vue from 'vue'
import iView from 'view-design'
import App from './App.vue'
import { router } from './router/index';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false
Vue.use(iView)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

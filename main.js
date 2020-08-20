import Vue from 'vue'
import App from './App'
import store from 'store/index'
import http from '@/util/http'

import formatdate from '@/common/formatdate'
import loadTime from '@/common/loadTime'
// 自定义组件
import tabs from '@/components/tabs.vue';
import headTitle from "@/components/title.vue";
import drawer from "@/components/drawer.vue";
// 最新
import popup from "@/components/popup.vue";

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$http', { value: http });
Object.defineProperty(Vue.prototype, '$formatdate', { value: formatdate });
Object.defineProperty(Vue.prototype, '$loadTime', { value: loadTime });
// Vue.prototype.$http = request
Vue.component('tabs',tabs)
Vue.component('headTitle',headTitle)
Vue.component('drawer',drawer)

//**最新组件** 
Vue.component('popup',popup)

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App	
})
app.$mount()

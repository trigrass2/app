import Vue from 'vue'
import App from './App'
import store from 'store/index'
import http from '@/util/http'

import formatdate from '@/common/formatdate'
import popup from "@/components/popup.vue";

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$formatdate', { value: formatdate });
Object.defineProperty(Vue.prototype, '$http', { value: http });

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

import Vue from 'vue'
import App from './App'
import http from './common/http'
import store from 'store/index'

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$http', { value: http });
// Vue.prototype.$http = request

App.mpType = 'app'

const app = new Vue({
	store,
    ...App	
})
app.$mount()

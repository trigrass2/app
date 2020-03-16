import Vue from 'vue'
import App from './App'
import http from './util/http'
import formatdate from 'static/js/formatdate'
import loadTime from 'static/js/loadTime'
import store from 'store/index'

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$http', { value: http });
Object.defineProperty(Vue.prototype, '$formatdate', { value: formatdate });
Object.defineProperty(Vue.prototype, '$loadTime', { value: loadTime });
// Vue.prototype.$http = request

App.mpType = 'app'

const app = new Vue({
	store,
    ...App	
})
app.$mount()

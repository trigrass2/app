import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const userInfo = uni.getStorageSync('userInfo');

const store = new Vuex.Store({
	state: {
		hasLogin: !!userInfo,
		userInfo,
		workShop: []
	},
	mutations: {
		login(state, provider) {
			const {
				token,
				userInfo
			} = provider

			state.hasLogin = true
			state.userInfo = userInfo

			uni.setStorage({
				key: 'userInfo',
				data:userInfo
			});
			uni.setStorage({
				key: 'userToken',
				data: token
			});

		},
		//退出登录
		logout(state) {
			state.hasLogin = false
			state.userInfo = ''
			uni.clearStorageSync();
		},
		set_workShop(state, param) {
			state.workShop = param;
		}
	},
	actions:{
		getWorkShop(context){
			
		}
	}
});
export default store;

import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
Vue.use(Vuex)

const userInfo = uni.getStorageSync('userInfo');
const state = {
	// 登录
	hasLogin: !!userInfo,
	userInfo,
	// 菜单
	nav: {
		list: [{
				iconPath: "home",
				selectedIconPath: "home-fill",
				text: "首页",
				count: 2,
				isDot: true,
				customIcon: false,
			},
			{
				iconPath: "file-text",
				selectedIconPath: "file-text-fill",
				text: "生产",
				customIcon: false,
			},
			{
				iconPath: "calendar",
				selectedIconPath: "calendar-fill",
				text: "设备",
				customIcon: false,
			},
			{
				iconPath: "play-right",
				selectedIconPath: "play-right-fill",
				text: "工艺",
				customIcon: false,
			},
			{
				iconPath: "account",
				selectedIconPath: "account-fill",
				text: "我的",
				count: 23,
				isDot: false,
				customIcon: false,
			},
		],
		current: 0,
		activeColor: '#1890ff',
		isMid: false
	},
	// 车间
	workShopList: []
}
const mutations = {
	login(state, provider) {
		const {
			token,
			userInfo
		} = provider

		state.hasLogin = true
		state.userInfo = userInfo

		uni.setStorage({
			key: 'userInfo',
			data: userInfo
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
	set_state(state, payload) {
		if (payload && typeof(payload) === 'object') {
			for (var key in payload) {
				state[key] = payload[key]
			}
		}
	},
};

const actions = {
	async getWorkShop({commit}) {
		const workShopList = await http.request({
			url: "/api/BWorkShop",
			method: "GET"
		});	
		commit('set_state', { workShopList })
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	actions
});
export default store;

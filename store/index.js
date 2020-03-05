import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const uerInfo=uni.getStorageSync('uerInfo')

const store = new Vuex.Store({
    state: {
		hasLogin:uerInfo?true:false,
        uerInfo:uerInfo?JSON.parse(uerInfo):{},
	    workShop:[]
    },
    mutations: {
        login(state, provider) {  

            state.hasLogin = true
            // state.uerInfo.token = provider.token
            state.uerInfo.userName = provider.userName	
            uni.setStorage({      
                key: 'uerInfo',
                data:  JSON.stringify(provider) 
            });
			
        },
		//退出登录
        logout(state) {        
            state.hasLogin = false
            state.uerInfo = {}
            uni.removeStorage({
                key: 'uerInfo',
            });
        },
		set_workShop(state,param){
			state.workShop=param;
		}
    }
});
export default store;

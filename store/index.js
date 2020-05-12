import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const userName=uni.getStorageSync('userName')

const store = new Vuex.Store({
    state: {
		hasLogin:userName?true:false,
        userName,
		userToken:'',
	    workShop:[]
    },
    mutations: {
        login(state, provider) {  

            state.hasLogin = true
            // state.uerInfo.token = provider.token
            state.userName = provider.userName	
            uni.setStorage({      
                key: 'userName',
                data:provider.userName 
            });
			
        },
		//退出登录
        logout(state) {        
            state.hasLogin = false
            state.userName = ''
            uni.removeStorage({
                key: 'userName',
            });
        },
		set_workShop(state,param){
			state.workShop=param;
		}
    }
});
export default store;

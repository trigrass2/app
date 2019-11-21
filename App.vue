<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
			// uni.getStorage({//获得保存在本地的用户信息  
			//     key: 'uerInfo',  
			//     success:(res) => {  
			//         this.login(res.data);  
			//         uni.request({// 再次校验并刷新token的有效时间  
			//             url: `${this.$serverUrl}/auth.php`,  
			//             header: {  
			//                 "Content-Type": "application/x-www-form-urlencoded",  
			//                 "Token":res.data.token  
			//             },  
			//             data: {  
			//                 "username":res.data.user_name  
			//             },  
			//             method: "POST",  
			//             success: (e) => {  
			//                 if (e.statusCode === 200 && e.data.code === 0) {  
			//                     this.login(e.data);  
			//                 }  
			//             }  
			//         })  
			//     }  
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['login'])
		}
	}
</script>

<style lang="scss">
	@import 'static/style/iconfont.css';
	@import './common/uni.css';

	html,
	body {
		height: 100%;
		width: 100%;
		background: $gray-bj-color;
		font-family:Helvetica;
		font-size:28upx;
		line-height:1.8;
	}
	/*每个页面公共css */
	.farm-title {
		box-sizing: border-box;
		padding: 10px 20px;
		font-size: 32upx;
		text-align: center;
		.iconfont{
			float: left;
			color: $font-light-gray;
		}
	}

	.none {
		color: $font-light-gray;
		font-size: 28upx;
		text-align: center;
	}
	// 省列号
	.ellipsis{
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	}

</style>

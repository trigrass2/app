<template>
	<view class="login-box">
		<view class="login-hd">
		 <view class="login-content">
		 	<view class="login-logo">
		 		<!-- 	<text class="login-title">阳普智能科技</text> -->
		 		<image src="../../static/images/logo.png" mode="aspectFit"></image>
		 	</view>
		 	<!-- /logo -->
		 	<view class="login-form">
		 		<view class="login">
		 			<view class="login-item line">
		 				<text class="iconfont icon-user"></text>
		 				<input
						placeholder-style="color:rgb(207,207,207)" 						
						placeholder="账号" 
						v-model="user"
						class="login-input" >
		 			</view>
		 			<view class="login-item">
		 				<text class="iconfont icon-password"></text>
		 				<input 						 
						password
						placeholder-style="color:rgb(207,207,207)" 
						placeholder="密码" 
						v-model="password" 
						class="login-input" />
		 			</view>
		 		</view>
		 		<!--/登陆表单-->
		 		<view>
		 			<button class="login-btn" @tap="submit">登&emsp;录</button>
		 		</view>
		 	</view>
		 	<!-- form -->
		 </view>
		</view>
		<view class="login-text">©2020广州阳普智能系统科技公司</view>
	</view>
</template>
<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				user: 'admin',
				password: '123456'
			}
		},
		methods: {
				...mapMutations(['login']),
			submit() {
				if (!this.user.length) {
					uni.showToast({
						icon: 'none',
						title: '用户名不能空'
					});
					return;
				}
				if (!this.password.length) {
					uni.showToast({
						icon: 'none',
						title: '密码不能为空'
					});
					return;
				}
				//url
				this.$http.request({
					url: '/api/SEmployee/Login',
					method: 'GET',
					data: {
						empCode: this.user,
						password: this.password
					}
				}).then((res) => {
					const {empName}=res
					this.login({token:"",userInfo:{userName:empName}})
					uni.reLaunch({
						url: '/pages/index/index'
					})
				});

			}
		},
	}
</script>

<style lang="scss" scoped>
	.login-box {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background:#3b99fb;
	}

	.login-content{
		width: 100%;
		padding-bottom: 80upx;
		.login-logo {
			padding-bottom: 60upx;
			text-align: center;		
			image {
				width: 254upx;
				height: 234upx;
			}
		}
		.login-form {padding: 0 40upx;}			
		.login {
			margin-bottom: 30px;
			background: #fafafa;
			border-radius: 10px;
		
			.login-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 20px;
				height: 108upx;
			}
		
			.iconfont {
				font-size: 45upx;
				color:$font-gray;
			}
		}		
		.line {
			border-bottom: 1px solid #dadada;
		}
		
		.login-input {
			flex: 1;
			padding: 36upx 0 36upx 10px;
			font-size: 35upx;
		}		
		.login-input {
			color:$font-text-color;
		}
		
		.login-btn {
			background: #1a6bbd;
			line-height:2.8;
			color: #fff;
			border: 0;
			border-radius:10px;
			font-size:$font-36;

		}
		
		.login-btn:after {
			border: 0;
		}
		
		/*按钮点击效果*/
		.login-btn.button-hover {
			transform: translate(1upx, 1upx);
		}
	}

	.login-hd {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.login-text {
		margin-bottom: 60upx;
		font-size:$font-24;
		text-align: center;
		color: #d5e9f3;
	}
/*#ifdef H5*/
uni-page-body{height: 100%;}
/*#endif*/
</style>

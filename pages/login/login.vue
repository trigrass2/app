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
		 				<input class="login-input" placeholder="账号" v-model="user">
		 			</view>
		 			<view class="login-item">
		 				<text class="iconfont icon-password"></text>
		 				<input class="login-input"  password placeholder="密码" v-model="password" />
		 			</view>
		 		</view>
		 		<!--/登陆表单-->
		 		<view>
		 			<button class="login-btn" @tap="submit">立即登录</button>
		 		</view>
		 	</view>
		 	<!-- form -->
		 </view>
		</view>
		<view class="login-text">©2019广州阳普智能系统科技公司</view>
	</view>
</template>
<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				user: '',
				password: ''
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
					this.login({userName:empName})
					uni.reLaunch({
						url: '/pages/index/index'
					})
				});

			}
		},
		onLoad() {}
	}
</script>

<style lang="scss" scoped>
	.login-box {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
		background: linear-gradient(to bottom, #3890d8 0%, #47acfc 100%);
	}

	.login-content{
		padding-bottom: 80upx;
		.login-logo {
			padding-bottom: 110upx;
			text-align: center;		
			image {
				width: 254upx;
				height: 234upx;
			}
		}	
		.login-form {
			padding: 0 90upx;
		}		
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
				font-size: 50upx;
				color: #555;
			}
		}
		
		.line {
			border-bottom: 1px solid #dadada;
		}
		
		.login-input {
			flex: 1;
			padding-left: 10px;
			height: 108upx;
			font-size: 35upx;
		}
		
		.input-placeholder,
		.login-input {
			color: #444;
		}
		
		.login-btn {
			background: #14e39e;
			color: #fff;
			border: 0;
			border-radius:10px;
			font-size: 36upx;
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

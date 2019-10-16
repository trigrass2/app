<template>
	<view class="login-box">
		<view class="login-logo">
			<text class="login-title">阳普智能科技</text>
		<!-- 	<image src="../../static/images/logo.png" mode="aspectFit" ></image> -->
		</view>
		<!-- logo -->
		<view class="login-form">
			<view class="login-item">
				<input class="login-input" placeholder-class placeholder="账号" v-model="user">
			</view>
			<view class="login-item">
				<input class="login-input" placeholder-class password placeholder="密码" v-model="password" />
			</view>
			<!-- 		<view class="login-label">忘记密码？</view> -->
			<view class="login-item">
				<button class="login-btn" @tap="submit">立即登录</button>
			</view>
		</view>
		<!-- form -->
		<view class="login-text">©2019广州阳普智能系统科技公司</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: 'admin',
				password: "123456"
			}
		},
		methods: {
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
		overflow: hidden;
		position: relative;
		min-height: 100%;
		width: 100%;
		background: $blue-color;
		color: $white-color;
	}

	.login-logo {
		margin: 100upx 0;
		text-align: center;
		.login-title{font-size: 80upx;}
	}

	.login-form {
		padding: 0 40px 0 40px;
	}

	.login-item {
		margin-bottom: 25px;
	}

	.login-input {
		background: $white-color;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}

	.input-placeholder,
	.login-input {
		color: #444;
	}

	.login-btn {
		background: #14e39e;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
	}

	.login-btn:after {
		border: 0;
	}

	/*按钮点击效果*/
	.login-btn.button-hover {
		transform: translate(1upx, 1upx);
	}

	.login-text {
		position: absolute;
		bottom: 50px;
		width: 100%;
		text-align: center;
		font-size: 28upx;
		color: #d5e9f3;
	}
</style>

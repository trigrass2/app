<template>
	<view class="my">
		<view class="user">
			<view class="user-icon">
				<text class="iconfont icon-yonghu"></text>
			</view>
			<text class="user-info">你好，尊敬的管理员</text>
		</view>
		<!-- 用户信息 -->
		<view class="loginOut">
			<button class="loginOut-btn" @tap="signOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		onLoad() {},
		methods: {
			...mapMutations(['logout']),
			signOut() {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		padding: 30px 0;
		text-align: center;

		.user-icon {
			margin: 0 auto 15px auto;
			text-align: center;
			width: 180upx;
			height: 180upx;
			text-align: center;
			color: $blue-color;
			border-radius: 50%;
			background: $white-color;
			border: 1px solid $blue-color;
			box-shadow: 0px 0px 3px #aaa;

			.iconfont {
				font-size: 120upx;
				line-height: 180upx;
			}
		}

		.user-info {
			font-size: 32upx;
			color: $font-gray;
		}
	}
	.loginOut{
		margin: 0 auto;
		width: 90%;
		.loginOut-btn{
			background: $blue-color;
			color: #fff;
			border: 0;
			border-radius: 100upx;
			font-size: 32upx;
		}
	}
</style>

<template>
	<view class="my">
		<!-- 用户信息 -->
		<view class="user">
			<view class="user-icon">
				<text class="iconfont icon-yonghu"></text>
			</view>
			<text class="user-info">你好，{{uerInfo.userName}}</text>
		</view>
		<!-- info -->
		<view class="info">
			<view class="info-text">
				<text class="iconfont icon-yuandianxiao"></text>你有0条未读消息<text class="info-time">0分钟前</text>
			</view>
			<view class="icon">
				<text class="icon-circle"></text>
				<text class="iconfont icon-jiantou"></text>
			</view>
		</view>
		<view class="info">
			<view class="info-text">
				<text class="iconfont icon-yuandianxiao"></text>你有0条未读任务<text class="info-time">0分钟前</text>
			</view>
			<view class="icon">
				<text class="icon-circle"></text>
				<text class="iconfont icon-jiantou"></text>
			</view>
		</view>
		<view class="loginOut">
			<button class="loginOut-btn" @tap="signOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			console.log('登陆打印',uni.getStorageSync('uerInfo'))
		
		},
		computed:{
			 ...mapState(['uerInfo']) 
		},
		methods: {
			...mapMutations(['logout']),
			signOut() {
				this.logout()
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
        background:$blue-color;
		.user-icon {
			margin: 0 auto 15px auto;
			text-align: center;
			width: 180upx;
			height: 180upx;
			text-align: center;
			color: $blue-color;
			border-radius: 50%;
			background: $white-color;
			.iconfont {
				font-size: 120upx;
				line-height: 180upx;
			}
		}

		.user-info {
			font-size: 30upx;
			color:$white-color;
		}
	}
	.loginOut{
	    padding:20px 10px;
		
		.loginOut-btn{
			background: $blue-color;
			color: #fff;
			// border: 0;
			// border-radius: 100upx;
			// font-size: 32upx;
		}
	}
</style>

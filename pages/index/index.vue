<template>
	<view class="home">
		<swiper class="swiper" 
		:indicator-color="dotColor"
		:indicator-active-color='activeColor'
		:indicator-dots="indicatorDots"
		:autoplay="autoplay" 
		:interval="interval" 
		:duration="duration">
			<swiper-item v-for="(item, index) in info" :key="index">
				<view class="swiper-item">
					<image :src="item" mode="scaleToFill" />
				</view>
			</swiper-item>
		</swiper>
		<!-- 幻灯片 -->	
		<view class="nav">
			<view class="nav-item" v-for="(item,i) in navList" :key="i">
				<view @tap="skip(item)">
					<text :class="['iconfont',item.icons]" :style="{'background-color':item.color}"></text>
					<text class="nav-item-text">{{item.text}}</text>
				</view>
			</view>
		</view>
		<!-- nav -->	
		<view class="push-info">
			<view class="push-info-item">
				<view class="info-text">
					<text class="iconfont icon-yuandianxiao"></text>你有0条未读消息
					<text class="info-time">0分钟前</text>
				</view>
				<view class="icon">
					<text class="icon-circle" v-show="spotVisible"></text>
					<text class="iconfont icon-arrow-right"></text>
				</view>
			</view>
			<view class="push-info-item">
				<view class="info-text">
					<text class="iconfont icon-yuandianxiao"></text>你有0条未读任务
					<text class="info-time">0分钟前</text>
				</view>
				<view class="icon">
					<text class="icon-circle" v-show="spotVisible"></text>
					<text class="iconfont icon-arrow-right"></text>
				</view>
			</view>
		</view>
		<!-- info -->
	</view>
</template>
<script>

	export default {
		name: 'Index',
		data() {
			return {
				//幻灯片
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				dotColor:'rgba(255,255,255,.6)',
				activeColor:'#4ca2fb',				
				info: [
					 '/static/images/banner/banner1.jpg',
					'/static/images/banner/banner1.jpg',
					 '/static/images/banner/banner1.jpg'
				],
				//nav
				navList: [{
						icons: 'icon-produce',
						text: '生产详情',
						url: '/pages/product/product',
						color: '#21c284'
					},
					{
						icons: 'icon-device',
						text: '设备管理',
						url: '/pages/device/device',
						color: '#fb9f44'

					},
					// {
					// 	icons: 'icon-analyse',
					// 	text: '效力分析',
					// 	url: '/pages/analyse/analyse',
					// 	color: '#23bab5'
					// },
					{
						icons: 'icon-file',
						text: '工艺追溯',
						url: '/pages/retrospect/retrospect',
						color: '#00b7ee'
					},
					{
						icons: 'icon-effict',
						text: '效力管理',
						url: '/pages/effect/effect',
						color: '#5a9ef1'
					},
					{
						icons: 'icon-quality',
						text: '质量管理',
						url: '/pages/quality/quality',
						color: '#f9b823'
					},
					{
						icons: 'icon-search',
						text: '追溯查询',
						url: '/pages/search/search',
						color: '#9f68ff'
					},
					// {
					// 	icons: 'icon-message',
					// 	text: '我的消息',
					// 	url: '/pages/info/info',
					// 	color: '#ed7240'
					// }
				],
				spotVisible: false,
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			skip(item) {
				const {
					url
				} = item
				if (url === '/pages/product/product' || url === '/pages/device/device') {
					url && uni.switchTab({
						url
					})
				} else {
					url && uni.navigateTo({
						url
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		height: 400rpx;
		.swiper-item {
			display: block;
			height: 400rpx;
			line-height: 400rpx;
			text-align: center;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	/*菜单*/
	.nav {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 40upx 0 0 0;
		background: $white-color;

		.nav-item {
			box-sizing: border-box;
			width: 25%;
			padding-bottom: 40upx;

			text {
				display: block;
				text-align: center;

				// 文字
				&.nav-item-text {
					margin-top: 5upx;
					color: $font-gray;
					font-size: $font-24;
				}

				&.iconfont {
					margin: 0 auto;
					width: 95upx;
					height: 95upx;
					line-height: 95upx;
					font-size: 50upx;
					border-radius: 50%;
					background: $blue-color;
					color: $white-color;

				}
			}
		}
	}
</style>

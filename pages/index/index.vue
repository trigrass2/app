<template>
	<view class="home">
		<swiper class="banner-swiper" :indicator-color="banner.dotColor" :indicator-active-color='banner.activeColor'
		 :indicator-dots="banner.indicatorDots" :autoplay="banner.autoplay" :interval="banner.interval" :duration="banner.duration">
			<swiper-item v-for="(item, index) in info" :key="index">
				<view class="swiper-item">
					<image :src="item" mode="scaleToFill" />
				</view>
			</swiper-item>
		</swiper>
		<!-- swiper -->
		<view class="common-menu">
			<text class="title">常用菜单</text>
			<view class="menu">
				<view class="menu-item" v-for="(menu,i) in commonMenu" :key="i">
					<view @tap="skip(menu)">
						<text :class="['iconfont',menu.icons]" :style="{'background':menu.color}"></text>
						<text class="menu-item-text">{{menu.text}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 常用菜单 -->
		<view class="menu-box">
			<text class="title">全部菜单</text>
			<swiper class="menu-swiper" :indicator-color="menuSwiper.dotColor" :indicator-active-color='menuSwiper.activeColor'
			 :indicator-dots="menuSwiper.indicatorDots" :autoplay="menuSwiper.autoplay" :interval="menuSwiper.interval"
			 :duration="menuSwiper.duration">
				<swiper-item v-for='(menu,i) in menuList' :key='i'>
					<view class="menu">
						<view class="menu-item" v-for="(menuItem,j) in menu" :key="j">
							<view @tap="skip(menuItem)">
								<text :class="['iconfont',menuItem.icons]" :style="{'background':menuItem.color}"></text>
								<text class="menu-item-text">{{menuItem.text}}</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
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
				//ad幻灯片
				banner: {
					indicatorDots: false,
					autoplay: false,
					interval: 2000,
					duration: 500,
					dotColor: 'rgba(255,255,255,.6)',
					activeColor: '#4ca2fb',
				},
				info: [
					'/static/images/banner/banner1.jpg',
				],
				//nav
				menuSwiper: {
					indicatorDots: true,
					autoplay: false,
					interval: 2000,
					duration: 500,
					dotColor: 'rgba(204,204,204,.6)',
					activeColor: '#4ca2fb',
				},
				menu: [{
						icons: 'icon-produce',
						text: '生产详情',
						url: '/pages/product/product',
						color: '#4996e6'
					},
					{
						icons: 'icon-device',
						text: '设备管理',
						url: '/pages/device/device',
						color: '#6db243'
					},
					{
						icons: 'icon-analyse',
						text: '效力分析',
						url: '/pages/analyse/analyse',
						color: '#ff7f45'
					},
					{
						icons: 'icon-file',
						text: '工艺追溯',
						url: '/pages/retrospect/retrospect',
						color: '#4996e8'
					},
					{
						icons: 'icon-effict',
						text: '效力管理',
						url: '/pages/effect/effect',
						color: '#fc5e5b'
					},
					{
						icons: 'icon-quality',
						text: '质量管理',
						url: '/pages/quality/quality',
						color: '#975de1'
					},
					{
						icons: 'icon-search',
						text: '相关查询',
						url: '/pages/search/search',
						color: '#48a5f3'
					},
					{
						icons: 'icon-message',
						text: '我的消息',
						url: '/pages/info/info',
						color: '#f3b64c'
					},
					// 测试用
					{
						icons: 'icon-produce',
						text: '生产详情',
						url: '/pages/product/product',
						color: '#4996e6'
					},
					{
						icons: 'icon-device',
						text: '设备管理',
						url: '/pages/device/device',
						color: '#6db243'
					},
					{
						icons: 'icon-analyse',
						text: '效力分析',
						url: '/pages/analyse/analyse',
						color: '#ff7f45'
					},
					{
						icons: 'icon-file',
						text: '工艺追溯',
						url: '/pages/retrospect/retrospect',
						color: '#4996e8'
					},
					{
						icons: 'icon-effict',
						text: '效力管理',
						url: '/pages/effect/effect',
						color: '#fc5e5b'
					},
					{
						icons: 'icon-quality',
						text: '质量管理',
						url: '/pages/quality/quality',
						color: '#975de1'
					},
					{
						icons: 'icon-search',
						text: '相关查询',
						url: '/pages/search/search',
						color: '#48a5f3'
					},
					{
						icons: 'icon-message',
						text: '我的消息',
						url: '/pages/info/info',
						color: '#f3b64c'
					},
				],
				commonMenu: [{
						icons: 'icon-produce',
						text: '生产详情',
						url: '/pages/product/product',
						color: '#4996e6'
					},
					{
						icons: 'icon-device',
						text: '设备管理',
						url: '/pages/device/device',
						color: '#6db243'
					},
				],
				spotVisible: false
			}
		},
		computed: {
			menuList() {
				let num = 1;
				let size = 10;
				let arr = [];
				for (let i = 0; i < this.menu.length; i += size) {
					arr.push(this.menu.slice(i, i + size));
				}
				return arr;
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
	.banner-swiper {
		height: 350rpx;

		.swiper-item {
			display: block;
			height: 350rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	// ad
	.menu-box {
		padding-bottom: 5px;
		background: $white-color;
	}

	.common-menu {
		margin-bottom: 20rpx;
		background: $white-color;
	}

	// 常用菜单
	.menu-swiper {
		height: 400rpx;
		background: $white-color;
	}

	// 菜单
	.menu {
		// padding: 0 20rpx;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		// padding: 20rpx 0 0 0;
		background: $white-color;

		.menu-item {
			box-sizing: border-box;
			width: 20%;
			padding-bottom: 50rpx;

			text {
				display: block;
				text-align: center;

				// 文字
				&.menu-item-text {
					padding-top: 10rpx;
					color:$font-text-color;
					font-size: $font-26;
				}

				&.iconfont {
					margin: 0 auto;
					width: 85rpx;
					height:85rpx;
					line-height: 85rpx;
					border-radius: 50%;
					font-size: 50rpx;
					background: $blue-color;
					color: $white-color;

				}
			}
		}
	}

	.title {
		display: block;
		padding: 20rpx 30rpx;
		font-size: $font-30;
		font-weight: bold;
		color:#444;
	}
</style>

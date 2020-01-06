<template>
	<view class="home">
		<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- /幻灯片 -->
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in navList" :key="index">
				<navigator class="nav-item-link" hover-class="none" :url="item.url">
					<text :class="['iconfont',item.icons]"></text>
					<text class="nav-item-text">{{item.text}}</text>
				</navigator>
			</view>
		</view>
		<!-- /nav -->
		<view class="info">
			<view class="info-text">
				<text class="iconfont icon-yuandianxiao"></text>你有0条未读消息<text class="info-time">2分钟前</text>
			</view>
			<view class="icon">
				<text class="icon-circle"></text>
				<text class="iconfont icon-jiantou"></text>
			</view>
		</view>
		<view class="info">
			<view class="info-text">
				<text class="iconfont icon-yuandianxiao"></text>你有0条未读任务<text class="info-time">2分钟前</text>
			</view>
			<view class="icon">
				<text class="icon-circle"></text>
				<text class="iconfont icon-jiantou"></text>
			</view>
		</view>
		<!-- info -->
	</view>
</template>
<script>
	import uniSwiperDot from "@/components/uni/uni-swiper-dot/uni-swiper-dot.vue";
	export default {
		components: {
			uniSwiperDot
		},
		data() {
			return {
				//幻灯片
				info: [
					// {
					// 	url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
					// },
					// {
					// 	url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg'
					// },
					{
						url: '/static/images/banner/banner1.jpg',
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				mode: 'long',
				dotsStyles: {
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
				},
				current: 0,
				//nav
				navList: [{
						icons: 'icon-shengchang',
						text: '生产详情',
						url: '/pages/product/product'
					},
					{
						icons: 'icon-shebei',
						text: '设备管理',
						url: '/pages/device/device'
					},
					{
						icons: 'icon-xiaoli',
						text: '效力管理',
						// url: '/pages/effect/effect'
					},
					{
						icons: 'icon-zhiliang',
						text: '质量管理',
						// url: '/pages/quality/quality'
					},
					{
						icons: 'icon-chaxun',
						text: '相关查询',
						// url: '/pages/search/search'
					},
					{
						icons: 'icon-xiaoxi',
						text: '我的消息',
						// url: '/pages/info/info'
					},
					{
						icons: 'icon-woderenwu',
						text: '我的任务',
						// url: '/pages/info/info'
					}
				]
			}
		},
		onLoad() {},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			gridChange(e) {
				let {
					index
				} = e.detail;
				let url = this.list[index].url;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 幻灯片 */
	.swiper-box {
		height: 400upx;

		.swiper-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			color: #fff;
		}

		.swiper-item image {
			width: 100%;
			height: 100%;
		}
	}

	/*菜单*/
	.nav {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding-top: 50upx;
		background: $white-color;

		.nav-item {
			box-sizing: border-box;
			width: 25%;
			padding-bottom: 50upx;

			.nav-item-link {}

			text {
				display: block;
				text-align: center;

				&.iconfont {
					margin: 0 auto;
					width: 82upx;
					height: 82upx;
					line-height: 82upx;
					font-size: 40upx;
					border-radius: 50%;
					background: $blue-color;
					color: $white-color;
					box-shadow: 0px 1px 3px #666;
				}

				&.icon-shengchang {
					background: #fc6c6c;
				}

				&.icon-shebei {
					background: #f59701;
				}

				&.icon-zhiliang {
					background: $font-light-gray;
				}

				&.icon-xiaoli {
					// background: #34bca8;
					background: $font-light-gray;
				}

				&.icon-chaxun {
					// background: #8f82b9;
					background: $font-light-gray;
				}

				&.icon-xiaoxi {
					// background: #0075aa;
					background: $font-light-gray;
				}

				&.icon-woderenwu {
					// background: #00aa6a;
					background: $font-light-gray;
				}

				// 文字
				&.nav-item-text {
					margin-top: 10px;
					// font-size: 26upx;
				}
			}
		}
	}

	/*我的消息*/
	.info {
		margin-top: 10px;
		padding: 0 20px;
		height: 118upx;
		background: $white-color;
		display: flex;
		align-items: center;

		.info-text {
			flex: 1;

			.icon-yuandianxiao {
				padding-right: 5px;
				font-size: 12px;
			}

			.info-time {
				padding-left: 10px;
				color: $font-light-gray;
			}
		}

		.icon {
			// width: 60upx;
			display: flex;
			align-items: center;

			.icon-circle {
				margin-right: 5px;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: $red-color;
			}

			.icon-jiantou {
				color: $font-light-gray;
			}
		}
	}
</style>

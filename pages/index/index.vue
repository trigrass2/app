<template>
	<view class="home">
		<!-- 幻灯片 -->
		<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- nav -->
		<view class="nav">
			<view class="nav-item" v-for="(item,i) in navList" :key="i">
				<!-- 	<navigator class="nav-item-link" hover-class="none" :url="item.url"> -->
				<view @tap="skip(i)">
					<text :class="['iconfont',item.icons]"></text>
					<text class="nav-item-text">{{item.text}}</text>
				</view>
				<!-- 	</navigator> -->
			</view>
		</view>
		<!-- info -->
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
				info: [{
					url: '/static/images/banner/banner1.jpg',
				}],
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
						icons: 'icon-fenxi',
						text: '效力分析',
						// url: ''
						url: '/pages/analyse/analyse'
					},
					{
						icons: 'icon-xiaoli',
						text: '效力管理',
						// url: ''
						url: '/pages/effect/effect'
					},
					{
						icons: 'icon-zhiliang',
						text: '质量管理',
						// url: ''
						url: '/pages/quality/quality'
					},
					{
						icons: 'icon-chaxun',
						text: '相关查询',
						// url: ''
						url: '/pages/search/search'
					},
					{
						icons: 'icon-xiaoxi',
						text: '我的消息',
						// url: ''
						url: '/pages/info/info'
					},
					{
						icons: 'icon-woderenwu',
						text: '我的任务',
						// url: ''
						url: '/pages/info/info'
					}
				],
				spotVisible: false,
			}
		},
		onLoad() {},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			skip(i) {
				const url = this.navList[i].url
				console.log('url',url)
				url && uni.navigateTo({
					url
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

			text {
				display: block;
				text-align: center;		
				// 文字
				&.nav-item-text {					
					margin-top: 15upx;
					color:$font-gray;
					font-size: 26upx;
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
					box-shadow: 0px 1px 3px #999;
				}

				&.icon-shengchang {
					background: #fac42d;
					
				}

				&.icon-shebei {
					background: #fe6256;
				}

				&.icon-fenxi {
					background:#81dd54;
				}

				&.icon-xiaoli {
					background: #6dadf4;
					// background: $disabled-color;
				}

				&.icon-chaxun {
					background: #ae7cff;
					// background: $disabled-color;
				}

				&.icon-xiaoxi {
					background: #f08551;
					// background: $disabled-color;
				}

				&.icon-woderenwu {
					background: #4dd1e6;
					// background:$disabled-color;
				}


			}
		}
	}
</style>

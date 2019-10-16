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
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
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
				//九宫格数据
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
						url: '/pages/effect/effect'
					},
					{
						icons: 'icon-zhiliang',
						text: '质量管理',
						url: '/pages/quality/quality'
					},
					{
						icons: 'icon-chaxun',
						text: '相关查询',
						url: '/pages/search/search'
					},
					{
						icons: 'icon-xiaoxi',
						text: '我的消息',
						url: '/pages/info/info'
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
		padding-top: 10px;
		.nav-item {
			width: 33.33%;
			height: 300upx;
			box-sizing: border-box;
			// border: 1px solid #09BB07;
			.nav-item-link {
				margin: 65upx auto 0 auto;
				width: 140upx;
				font-size: $font32;
			}
			text {
				margin-top: 10px;
				display: block;
				text-align: center;
				&.iconfont {
					margin: 0 auto;
					width: 120upx;
					height: 120upx;
					line-height: 120upx;
					font-size: 55upx;
					border-radius: 50%;
					background: $blue-color;
					color: $white-color;
					box-shadow: 0px 0px 3px #aaa;
				}

				&.icon-shengchang {
					background: #fc6c6c;
				}

				&.icon-shebei {
					background: #f59701;
				}

				&.icon-xiaoli {
					background: #34bca8;
				}

				&.icon-chaxun {
					background: #8f82b9;
				}

				&.icon-xiaoxi {
					background: #0075aa;
				}
			}
		}
	}
</style>

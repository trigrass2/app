<template>
	<view class="pro">
		<drawer :show="visible" :navData="meauList" @close="close" @getItem="getItem"></drawer>
<!-- 			<view>
			<button type="primary" @tap="open">打开抽屉</button>
		</view> -->
		<view class="title">{{currentItem.wsName}}</view>
		<!-- 抽屉菜单 -->
		<view>
			<view class="pro-item" v-for="item in productList" :key="item.orderNo">
				<view class="pro-hd">
					<view class="hd-name">{{item.lineName}}</view>
					<view class="hd-percent">
						<product-percent :percent="item.percent"></product-percent>
					</view>
				</view>
				<!-- /hd -->
				<view @tap="accordion(item)" :class="[{actvie:item.isDisplay},'pro-name',]">
					<!-- pro-actvie -->
					<text class="name">{{item.orderNo}}</text>
					<text :class="['iconfont',item.isDisplay?'icon-zhankai':'icon-shouqi']"></text>
				</view>
				<!-- /产品编号 -->
				<view class="pro-info">
					<view class="info">
						<text class="info-name">产&ensp;&ensp;&ensp;&ensp;品：</text>
						<text class="info-text2">{{item.productName}}</text>
					</view>
					<view class="info-row">
						<view class="info-col">
							<text class="info-name">完&ensp;成&ensp;数：</text>
							<text class="info-text">{{item.cpltQty}}</text>
						</view>
						<view class="info-col">
							<text class="info-name">计&ensp;划&ensp;数：</text>
							<text class="info-text">{{item.qty}}</text>
						</view>
					</view>
					<view class="info-row">
						<view class="info-col">
							<text class="info-name">良&ensp;&ensp;&ensp;&ensp;率：</text>
							<text class="info-text">{{item.yield*100}}%</text>
						</view>
						<view class="info-col">
							<text class="info-name">备&ensp;&ensp;&ensp;&ensp;料：</text>
							<text class="info-text">100%</text>
						</view>
					</view>
				</view>
				<!-- /产品信息 -->
				<view class="pro-info pro-line" v-show="item.isDisplay">
					<view class="info-row">
						<view class="info-col">
							<text class="info-name">客&ensp;&ensp;&ensp;&ensp;户：</text>
							<text>{{item.customer}}</text>
						</view>
						<view class="info-col">
							<text class="info-name">版&ensp;&ensp;&ensp;&ensp;本：</text>
							<text>{{item.bomVersion}}</text>
						</view>
					</view>
					<view class="info mt-5">
						<text class="info-name">工&ensp;&ensp;&ensp;&ensp;艺：</text>
						<text>{{item.flowName}}</text>
					</view>
					<view class="info">
						<text class="info-name">备&ensp;&ensp;&ensp;&ensp;注：</text>
						<text>{{item.remarks}}</text>
					</view>
					<view class="info">
						<text class="info-name">计划时间：</text>
						<text class="info-time">{{item.plannedTime}}</text>
					</view>
				</view>
				<!-- /产品信息展开收起 -->
			</view>
			<!-- 循环 -->
		</view>
		<view class="none" v-if="!productList.length">
			暂时无数据
		</view>

	</view>
</template>

<script>
	import drawer from "@/components/drawer.vue";
	import productPercent from "@/components/product-percent.vue";
	export default {
		components: {
			drawer,
			productPercent
		},
		data() {
			return {
				visible: false,
				meauList: [],
				currentItem: {},
				productList: []
			};
		},
		onLoad() {
			this.init();
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.visible = !this.visible;
			}
		},
		methods: {
			init() {
				uni.showLoading({
					title: "加载中",
					mask: true
				});

				this.getMeauData()
					.then(res => {
						uni.hideLoading();
						this.meauList = res;
						if (res.length) {
							this.currentItem = res[0];
						}
						this.getProduct();
					})
					.catch(error => {
						uni.hideLoading();
					});
			},
			//获取数据
			getMeauData() {
				return this.$http
					.request({
						url: "/api/BWorkShop",
						method: "GET"
					})
					.then(res => {
						return Promise.resolve(res);
					});
			},
			getProduct() {
				this.$http
					.request({
						url: "/api/ProductReport/wsCodeProduct",
						method: "GET",
						data: {
							wsCode: this.currentItem.wsCode
						}
					})
					.then(({
						productList
					}) => {
						uni.hideLoading();
						this.setProduct(productList);
					})
					.catch(() => {
						uni.hideLoading();
					});
			},
			// 处理数据
			setProduct(productList) {
				this.productList=productList.map((product) => {
					if (product) {
						// 良率
						let total = product.cpltQty + product.failQty;
						let yieldNum = product.cpltQty / total;

						// nameline百分比							 
						let percentNum = product.cpltQty / product.qty;

						return {
							...product,
							yield: total === 0 ? 1 : Math.round(yieldNum * 100) / 100,
							percent: Math.round(percentNum * 100) / 100
						}

					}
				});
				  
				console.log('this.productList',this.productList);
			},
			// 重置数据
			resetData() {
				this.productList = [];
			},
			//抽屉菜单操作
			open() {
				this.visible = !this.visible;
			},
			//回调函数抽屉关闭
			close(val) {
				this.visible = val;
			},
			// 抽屉点击函数
			getItem(val) {
				this.currentItem = val;
				this.visible = false;
				this.resetData();
				uni.showLoading({
					title: "加载中",
					mask: true
				});
				this.getProduct();
			},
			// 手风琴展开收齐
			accordion(item) {
				this.$set(item, "isDisplay", !item.isDisplay);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pro-item {
		margin-bottom: 10px;
		background: $white-color;
		font-size: 26upx;

		.pro-hd {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 20px;
			height: 75upx;
			border-bottom: 1px solid $line-color;

			.hd-name {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				margin-right: 20px;
				max-width: 150upx;
				color: $font-bule;
			}
		}

		.actvie {
			margin-bottom: 10px;
			background: #efefef;
		}
	}

	/*生产编号*/
	.pro-name {
		padding: 0 20px;
		height: 58upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;

		.name {
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: $font-dark-green;
			font-weight: bold;
		}

		.iconfont {
			font-size: 28upx;
			color: $font-light-gray;
		}
	}

	/*生产信息*/
	.pro-info {
		margin: 0 20px;
		padding: 0 0 10px 0;
		// line-height: 1.5;
		color: $font-bule;

		.info-name {
			padding-right: 5px;
			color: $font-light-gray;
		}

		.info-text {
			color: $font-bule;
			text-decoration: underline;
		}

		.info-text2 {
			color: #444;
		}

		.info-time {
			color: $font-orange;
		}

		.info-row {
			display: flex;
			flex-direction: row;

			.info-col {
				flex: 1;
			}
		}
	}

	.pro-line {
		padding-top: 10px;
		border-top: 1px dashed #ecebeb;
	}

	.mt-5 {
		margin-top: 5px;
	}
</style>

<template>
	<view class="product">
		<drawer :show="visible" :navData="meauList" @close="close" @getItem="getItem"></drawer>
		<!-- 	<view><button type="primary" @tap="open">打开抽屉</button></view> -->
		<view class="title">{{currentItem.wsName}}</view>
		<!-- 抽屉菜单 -->
		<view class="product-box">
			<view class="product-list" v-for="(item,index) in productList" :key="index">
				<view class="product-hd" @tap="accordion(index)">
					<text :class="['iconfont',item.isDisplay?'icon-zhankai':'icon-shouqi']"></text>
					<view class="product-item">
						<text class="product-item-name">线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</text>
						<text>{{item.lineName}}</text>
					</view>
					<view class="product-item">
						<text class="product-item-name">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单</text>
						<text>{{item.orderNo}}</text>
					</view>
					<view class="product-item">
						<text class="product-item-name">完&nbsp;成&nbsp;率</text>
						<text>{{item.reach}}</text>
					</view>
				</view>
				<!-- 头部 -->
				<view class="product-bd" v-show="item.isDisplay">
					<view class="product-line"></view>
					<view class="product-item">
						<text class="product-item-name">客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户</text>
						<text>{{item.customer?item.customer:''}}</text>
					</view>
					<view class="product-item">
						<text class="product-item-name">产品型号</text>
						<text>{{item.productCode}}</text>
					</view>
					<view class="product-item">
						<text class="product-item-name">计划数量</text>
						<text>{{item.qty}}</text>
					</view>
					<view class="product-item">
						<text class="product-item-name">完成数量</text>
						<text>{{item.cplt_qty}}</text>
					</view>
					<view class="product-item">
						<text class="product-item-name">不&nbsp;良&nbsp;&nbsp;品</text>
						<text>{{item.failQty}}</text>
					</view>
					<view class="product-item">
						<text class="product-item-name">达&nbsp;成&nbsp;&nbsp;率</text>
						<text>{{item.reach}}</text>
					</view>
				</view>
				<!-- bd内容 -->
			</view>
		</view>
		<view class="none" v-if="!productList.length">
			暂时无数据
		</view>
	</view>
</template>

<script>
	import drawer from '@/components/drawer.vue'
	export default {
		components: {
			drawer
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
			init(){
				uni.showLoading({
					title: '加载中'
				});
				
				this.getMeauData().then(res => {
					uni.hideLoading();
					this.meauList = res;
					if (res.length) {
						this.currentItem = res[0];
					}
					this.getProduct();				
				}).catch((error) => {
					uni.hideLoading();
				});
			},
			//获取数据
			getMeauData() {
				return this.$http.request({
					url: '/api/BWorkShop',
					method: 'GET'
				}).then(res => {
					return Promise.resolve(res)
				})
			},
			getProduct() {
				this.$http.request({
					url: '/api/ProductReport/wsCodeProduct',
					method: 'GET',
					data: {
						wsCode: this.currentItem.wsCode
					}
				}).then(({productList}) => {
					uni.hideLoading();
					this.productList = productList;
				}).catch(() => {
					uni.hideLoading();
				});
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
			getItem(val) {
				this.currentItem = val;
				this.visible = false;
				this.resetData();
				uni.showLoading({
					title: '加载中'
				});
				this.getProduct();
			},
			// 手风琴展开收齐
			accordion(index){
				this.productList.forEach((item,i)=>{
                   if(i!==index){
						 this.$set(item,'isDisplay', false);
					    
				   }else{
						this.$set(item,'isDisplay', !item.isDisplay);
				   }
				 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-box {
		padding: 0 10px;
	}

	.product-list {		
		margin-bottom: 10px;
		padding: 8px;
		line-height: 1.5 !important;
		border-radius: 5px;
		background: $white-color;
		border: 1px solid $line-color;
		box-shadow: 0px 2px 4px #dad8d8;
        .product-hd{
			position: relative;
		}
		.iconfont {
			position: absolute;
			top: 50upx;
			right:10px;
			font-size: 14px;
			color: #999;
		}

		.product-item {
			padding: 0 10px;
			font-size:$font30;
			.product-item-name {
				padding-right: 20px;
				color:$name-color;
			}
		}
		.product-line{
			margin:5px 0 ;
			height: 0;
			border-top: 1px dashed #ecebeb;
		}
	}
</style>

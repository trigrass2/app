<template>
	<uni-drawer :visible="show" :mode="mode" @close="close">
		<scroll-view :scroll-y="true" :style="{height:appWrapperHeight}">
			<view class="list">
				<view class="item" v-for="(item,index) in navData" :key="index" @tap="getVal(item)">
					<view class="item-content">
						<text class="name">{{item.wsName}}</text>
					</view>
					<view class="item-icon">
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</view>
			</view>
			<view class="none" v-if="!navData.length">
				暂无数据
			</view>
		</scroll-view>
	</uni-drawer>
</template>

<script>

	import uniDrawer from '@/components/uni/uni-drawer/uni-drawer.vue'
	
	export default {
		components: {
			uniDrawer,
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			mode: {
				type: String,
				default: "right"
			},
			navData: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				appWrapperHeight: "400px",
				isVisible: true,
				meauList: []

			};
		},
		created() {
			// 获取子流程弹框的最大高度
			uni.getSystemInfo({
				success: res => {
					// #ifdef H5
					this.appWrapperHeight = res.screenHeight + "px";
					// #endif
					// #ifndef H5
					this.appWrapperHeight = res.windowHeight + "px";
					// #endif
				}
			});
		},
		methods: {

			getVal(item) {
				this.$emit('getItem', item);
			},
			close() {
				this.$emit('close', false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		.item {
			padding: 24rpx 30rpx;
			width: 100%;
			box-sizing: border-box;
			flex: 1;
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			&:hover {
				background-color: #f8f8f8;
			}

			@include line()
		}

		.item-content {
			flex: 1;
			overflow: hidden;
			display: flex;
			color: #3b4144;
			.name {
				font-size: 32rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: inherit;
				line-height: 1.5;
			}
		}

		.item-icon {
			width: 25%;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;

			.iconfont {
				color: #bbb;
			}
		}
	}
</style>

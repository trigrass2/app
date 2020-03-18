<template>
	<uni-drawer :visible="show" :mode="mode" @close="close">
		<scroll-view :scroll-y="true" :style="{height:appWrapperHeight}">
			<view class="list">
				<view class="item" v-for="(item,i) in meauList" :key="i" @tap="getVal(item,i)">
					<view class="item-content">
						<text :class="['name',{'current':item.isClass}]">{{item.wsName}}</text>
					</view>
					<view class="item-icon">
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</view>
			</view>
			<view class="none" v-if="!meauList.length">
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
			meau: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				appWrapperHeight: '',
				isVisible: true,
				meauList: JSON.parse(JSON.stringify(this.meau))
			};
		},
		created() {
			// 获取子流程弹框的最大高度
			uni.getSystemInfo({
				success: res => {
					// #ifdef H5
					this.appWrapperHeight = res.screenHeight + 'px';
					// #endif
					// #ifndef H5
					this.appWrapperHeight = res.windowHeight + 'px';
					// #endif
				}
			});
		},
		mounted() {
			this.$nextTick(() => {
				this.handleClass(0);
			})
		},
		methods: {
			getVal(item, i) {
				this.handleClass(i);
				this.$emit('getItem', item);
			},
			close() {
				this.$emit('close', false);
			},
			handleClass(current) {
				this.meauList.forEach((item, i) => {
					if (current === i) {
						item.isClass = true;
					} else {
						item.isClass = false;
					}


				})
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

			&:active {
				background-color: $hover-color;
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
				line-height: 1.5;
				@extend .ellipsis;
			}

			.current {
				color: $blue-color;
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

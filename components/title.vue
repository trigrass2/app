<template>
	<view class="farm-title">
		<view class="title">
			<slot></slot>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="icon-box" v-for="(iconItem,i) of icon" :key="i">
			<text :class="['iconfont',iconItem]" @tap="iconTap(iconItem)"></text>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	export default {
		props: {
			icon: {
				type: Array,
				default:()=> {
					return [];
				}
			},
			iconTap: {
				type: Function,
				default: ()=> {}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.farm-title {
		display: flex;
		flex-direction: row;
		padding: 20upx 30upx;
		height: 50upx;
		line-height: 50upx;
		font-size:$font-36;
		.title {
			flex: 1;
			text-align: left;
		}

		.icon-box {
			.iconfont {
				color: $font-light-gray;
				font-size: 35upx;
				margin-left: 30upx;
			}
		}
	}
</style>

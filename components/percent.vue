<template>
	<view class="percent">
		<view class="percent-bar"  :style="{width:width,height:height}">
			<view class="percent-progress"  :style="{background:progressColour,width:percentWidth,height:height}"></view>
		</view>
		<view class="percent-text">{{percent*100}}%</view>
	</view>
</template>

<script>
	export default {
		props:{
			// 百分比数
			percent:{
				type:Number,
				default:1
			},
			// 进度条的颜色
			progressColour:{
				type:String,
				default:'#3890d8'
			},
			// 进度条宽度
			barWidth:{
				type:Number,
				default:220
			},
			barHeight:{
				type:Number,
				default:8
			}
		},
		computed:{
			width(){
				return uni.upx2px(this.barWidth) + 'px';
			},
			height(){
				return uni.upx2px(this.barHeight) + 'px';
			},
			percentWidth(){
				return uni.upx2px(this.barWidth*this.percent) + 'px';
			}
		},
		data(){
			return{};
		}
	}
</script>

<style lang="scss" scoped>
	.percent {
		display: flex;
		flex-direction: row;
		align-items: center;
		.percent-bar {
			// width: 220upx;
			// height: 8upx;
			border-radius: 3px;
			background: #ccc;
		}
	
		.percent-progress {
			// width: 110upx;
			// height: 8upx;
			border-radius: 3px;
			background:#ccc;
		}
	
		.percent-text {
			margin-left: 5px;
			line-height: 1;
			font-size: 20upx;
			color: $font-light-gray;
		}
	}
</style>

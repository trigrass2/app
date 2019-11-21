<template>
	<view class="percent">
		<view class="percent-bar">
			<view class="percent-progress" v-bind:style="{width: percentWidth}"></view>
		</view>
		<view class="percent-text">{{stateType}}{{percent*100}}%</view>
	</view>
</template>

<script>
	export default {
		props:{
			percent:{
				type:Number,
				default:0
			},
			state:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
			}
		},
		computed:{
			percentWidth(){
				 return uni.upx2px(300*this.percent) + 'px';
			},
			stateType(){
				switch (this.state) {
				    case 0:
				        return "未开始";
				       
				    case 1:
				        return "生产中";
				        
				    case 2:
				        return "已完成";
				} 
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.percent {
		display: flex;
		flex-direction: row;
		align-items: center;        
		// 进度条
		.percent-bar {
			overflow: hidden;
			width: 300upx;
			height: 10upx;
			border-radius: 5px;
			background: #ebeef5;

			.percent-progress {
				// width: 0upx;
				height: 10upx;
				border-radius: 5px;
				background: $blue-color;
			}
		}

		.percent-text {
			margin-left: 5px;
			color: $font-light-gray;
		}
	}
</style>

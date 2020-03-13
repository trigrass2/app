<template>
	<view>
		<scroll-view  
		class="scroll-view"
		scroll-x="true">	
		<view 
		class="mix"
		:style="{'width':mixWidth+'px'}"
		v-if="typeList.length">
			<view 
			class="min-item"
			v-for="(chart,i) of chartList"
			:key="i"
			:style="{'background-color':getColor(chart.state),'width':chart.value}">
			</view>
		</view>
		</scroll-view >
		<!-- 说明 -->
		<view class="type" 
		v-if="typeList.length">
			<view 
			class="type-item"
			v-for="type of typeList"
			:key="type.state">
				<text 
				class="type-icon" 
				:style="{'background-color':type.color}"></text>
				<text class="type-text">{{type.name}}</text>
			</view>
		</view>
		<!-- 分页 -->
		<view>
			<text>{{total}}--{{mixWidth}}</text>
		</view>
		<view class="icon">	
			<text class="iconfont icon-plus" @tap="handlePlus"></text>
			<text class="iconfont icon-reduce" @tap="handleReduce"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			typeList:{
				type:Array
			},
			chartList:{
				type:Array
			}
		},
		data() {
			return {
				total:1
			}
		},
		computed:{
			mixWidth:function(){
				return uni.upx2px(690)*this.total
			}
		},
		methods:{
			getColor(state){
			  const typeArr=this.typeList.filter(type=>{
				return type.state===state
			  })
			  const [{color}]=typeArr;
			  return color;
			},
			handlePlus(){
				// this.total=this.total++
				console.log('this.total++',this.total++)
				console.log('this.total',this.total)
			},
			handleReduce(){
				if(this.total===1){
					return false
				}
				// this.total=this.total--
				console.log('this.total--',this.total--)
				console.log('this.total',this.total)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-view{
		width: 690upx;
	}
	.mix {
		display: flex;
		flex-direction: row;
		// width: 690upx;
		height: 60upx;
		background-color: #ccc;

		.min-item {
			background-color: #007AFF;
			width: 20%;
		}
	}

	.type {
		display: flex;
		flex-direction: row;
		margin-top: 10upx;

		.type-item {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-right: 25upx;
			font-size: $font-24;
			color: $font-gray;

			.type-icon {
				margin-right: 10upx;
				width: 20upx;
				height: 10upx;
				background-color: #007AFF;
			}
		}
	}
	// 测试需要用样式
	.icon{
		.iconfont{
			margin-right: 30upx;
		}
	}
</style>

<template>
	<view>
		<view class="search">
			<input class="uni-input"  placeholder="开始时间" />
			<input class="uni-input"  placeholder="结束时间" />
			<button type="primary">页面主操作 Normal</button>
		</view>
		
		<timeSelector 
		showType="dateToTime" 
		@btnConfirm="btnConfirm" 
		@btnCancel="btnCancel">
		<view class="box-title">{{ title }}</view>
		<view class="box-time">{{ time }}</view>
		</timeSelector>
	</view>
</template>

<script>
import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
export default {
	components: {
		timeSelector
	},
	data() {
		return {
			title: '当前选择器',
			time: new Date()
		};
	},
	onLoad() {},
	methods: {
		btnConfirm(e) {
			console.log('确定时间为：', e);
			this.time = e.key;
			this.title = '当前选择时间';
		},
		btnCancel() {
			console.log('取消时间：');
		}
	}
};
</script>

<style>
.box-title {
	margin: 24rpx;
	font-size: 40rpx;
	font-weight: bold;
	color: #333333;
}
.box-time {
	margin: 24rpx;
	font-size: 30rpx;
	color: #3496fb;
}
</style>

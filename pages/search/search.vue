<template>
	<view class="search">
	 追溯查询页面
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onNavigationBarButtonTap(e) {
			console.log('e',e);
			if (e.index === 0) {
				this.scan();
				console.log('点击启动扫描');
			}
		},
		methods: {
			scan() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
</style>

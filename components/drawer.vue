<template>
	<uni-drawer :visible="show" :mode="mode" @close="close">
		<scroll-view :scroll-y="true" :style="{height:appWrapperHeight}">
			<uni-list>
				<uni-list-item v-for="(item,index) in navData" :key="index" :title="item.wsName" @tap="getVal(item)" />
			</uni-list>
			<view class="none" v-if="!navData.length">
				暂无数据
			</view>
		</scroll-view>
	</uni-drawer>
</template>

<script>
	import uniIcons from '@/components/uni/uni-icons/uni-icons.vue'
	import uniDrawer from '@/components/uni/uni-drawer/uni-drawer.vue'
	import uniList from '@/components/uni/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniIcons,
			uniDrawer,
			uniList,
			uniListItem
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
					this.appWrapperHeight = res.screenHeight - uni.upx2px(100) + "px";
					// #endif
					// #ifndef H5
					this.appWrapperHeight = res.windowHeight - uni.upx2px(100) + "px";
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

<style scoped>
	.aa {
		height: 300upx;
		background: #007AFF;
	}
</style>

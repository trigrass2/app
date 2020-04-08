<template>
	<view class="tabs">
		<view v-for="tabsItem of tabs" :key="tabsItem.value" :class="['tabs-items',{'active':ative===tabsItem.value}]" @tap="tabsTap(tabsItem.value)">
			{{tabsItem.label}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Tabs',
		props: {
			tabs: {
				type: Array,
				default: () => []
			},
			ative: {
				type: String,
				default: ''
			}
		},
		methods: {
			tabsTap(val) {
				this.$emit('getAtive', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
		overflow: hidden;
		display: flex;
		margin: 0;
		border: 1px solid $blue-color;
		border-radius: 5px;

		.tabs-items {
			flex: 1;
			text-align: center;
			height: 75upx;
			line-height: 75upx;
			font-size: 26upx;
			color: $font-gray;
			border-right: 1px solid $blue-color;

			&:last-child {
				border-right: 0;
			}
		}

		.active {
			color: $white-color;
			background: $blue-color;
		}
	}
</style>

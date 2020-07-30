<template>
	<view class="tabs">
		<view 
		v-for="tabsItem of tabs" 
		:key="tabsItem.value" 
		:class="['tabs-items',{'active':ative===tabsItem.value}]" 
		@tap="tabsTap(tabsItem.value)">
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
				type:[String,Number],
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
</style>

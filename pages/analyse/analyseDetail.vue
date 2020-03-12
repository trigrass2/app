<template>
	<view>
		<!-- 搜索 -->
		<view class="search">
			<view class="time">
				<view class="time-item">
					<text class="iconfont icon-time"></text>
					<view class="time-input">
						<timeSelector @btnConfirm="startConfirm">
							<input class="uni-input" placeholder="开始时间" v-model="startTime" />
						</timeSelector>
					</view>
				</view>
				<view class="time-item">
					<text class="iconfont icon-time"></text>
					<view class="time-input">
						<timeSelector @btnConfirm="endConfirm">
							<input class="uni-input" placeholder="结束时间" v-model="endTime" />
						</timeSelector>
					</view>
				</view>

			</view>


			<button type="primary">搜索</button>
		</view>

	</view>
</template>

<script>
	import timeSelector from "@/components/wing-time-selector/wing-time-selector.vue";
	export default {
		components: {
			timeSelector
		},
		data() {
			return {
				startTime: "",
				endTime: ""
			};
		},
		onLoad() {},
		methods: {
			startConfirm(e) {
				this.startTime = e.key;
			},
			endConfirm(e) {
				this.endTime = e.key;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.search {
		padding: 30upx 60upx;
		.time {
			overflow:hidden;
			border-radius:10upx;
			border: 1px solid $line-dark-color;
		}
		.time-item {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding: 0 20upx;
			background: $white-color;
			&:first-child{border-bottom: 1px solid $line-dark-color;}
			.time-input {
				flex: 1;
			}
			.iconfont{
				color:$font-light-gray;
				}
			.uni-input{				
				padding: 10upx 20upx;
				line-height:normal;
				
			}

		}

		button {
			margin-top: 20upx;
			font-size: 30upx;
			background: $blue-color;
			color: #fff;
		}

	}
</style>

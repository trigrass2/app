<template>
	<view>
		<scroll-view class="scroll-view" scroll-x="true">
			<canvas :style="{'width': cWidth,'height': cHeight}" canvas-id="myCanvas" class="myCanvas"></canvas>
		</scroll-view>
		<view class="type" v-if="color.length">
			<view class="type-item" v-for="item of color" :key="item.state">
				<text class="type-icon" :style="{'background-color':item.color}"></text>
				<text class="type-text">{{item.name}}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: Number,
				default: 0
			},
			height: {
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			color: {
				type: Array,
				default: () => {
					return []
				}
			}

		},
		onReady: function() {
			this.cWidth = uni.upx2px(750) + 'px';
			this.cHeight = uni.upx2px(50) + 'px';
			this.inti()
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
			}
		},
		methods: {
			inti() {
				const ctx = uni.createCanvasContext('myCanvas', this)
				let x = 0;

				this.list.forEach((item, i) => {
					const [{
						color
					}] = this.color.filter(item2 => {
						return item2.state === item.state
					});

					ctx.setFillStyle(color)
					ctx.fillRect(x, 0, item.value, 50)
					x = x + item.value
				})
				ctx.fill()
				// 清空画板
				if (!this.list.length) {
					ctx.clearRect(0, 0, cWidth, cWidth);
				}
				ctx.draw()


			},
		}
	}
</script>

<style lang="scss">
	.scroll-view {
		margin-top: 20upx;
		width: 690upx;
	}

	.myCanvas {
		background-color: #f8f8f8;
	}

	.echart {
		width: 690upx;
		height: 50upx;
		border: 1px solid #4CD964;
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
			font-size: 24upx;
			color: #999;

			.type-icon {
				margin-right: 8upx;
				width: 20upx;
				height: 15upx;
				border-radius: 5upx;
				background-color: #007AFF;
			}
		}
	}
</style>

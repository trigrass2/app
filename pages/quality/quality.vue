<template>
	<!-- quality -->
	<view class="quality">
		<view class="quality-box">
		<view class="quality-charts">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view>			
		</view>		
		<view class="info">
			<view class="info-item">
				<view class="info-item-name">FJTBLB</view>
				<view class="info-item-body">22</view>
			</view>
			<view class="info-item">
				<view class="info-item-name">接带(正极涂布单面首检报废)</view>
				<view class="info-item-body">187</view>
			</view>
			<view class="info-item">
				<view class="info-item-name">正极涂布单面首检报废</view>
				<view class="info-item-body">33</view>
			</view>
			<view class="info-item">
				<view class="info-item-name">正极涂布双面首检报废</view>
				<view class="info-item-body">22</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/uni/u-charts/u-charts.js';
	var _self;
	var canvaColumn = null;

	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(600);
			this.getServerData();
		},
		methods: {
			getServerData() {
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
						_self.serverData = res.data.data;
						let Column = {
							categories: [],
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories = res.data.data.Column.categories;
						Column.series = res.data.data.Column.series;
						_self.showColumn("canvasColumn", Column);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true
					},
					padding: [20, 20, 10, 20],
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						dashLength: 8,
						gridColor: '#CCCCCC',
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});

			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.quality {
		display: flex;
		flex-direction: column;
		
	}
   .quality-box{
	   padding: 30px 0;
	   background: $white-color; 
   }
	.quality-charts {	
		width: 750upx;
		height: 600upx;
    
		.charts {
			width: 750upx;
			height: 600upx;
		}
	}

	.info {    
		.info-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			/*垂直方向*/
			height: 75upx;
			line-height: 75upx;
			&:nth-child(even) {
				background: #e6e6e6;
			}
			&>view{font-size:$font-30;}
			.info-item-name {
				padding-left: 20px;
				width: 450upx;
			}
		}
	}
</style>

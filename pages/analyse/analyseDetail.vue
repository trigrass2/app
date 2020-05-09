<template>
	<view>
		<!-- 搜索 -->
		<view class="search">
			<view class="analyse-title">
				<view class="sub-title"><view class="icon"/>搜索</view>
				<text :class="['iconfont',searchVisible?'icon-delta-up':'icon-delta-drown']" @tap="searchDisplay"/>
			</view>
			<view class="box" v-show="searchVisible">
				<view class="time">
					<view class="time-item">
						<text class="iconfont icon-time"/>
						<view class="time-input">
							<timeSelector @btnConfirm="startConfirm">
								<view class="time-text">{{startTime}}</view>
							</timeSelector>
						</view>
					</view>
					<view class="time-item">
						<text class="iconfont icon-time"/>
						<view class="time-input">
							<timeSelector @btnConfirm="endConfirm">
								<view class="time-text">{{endTime}}</view>
							</timeSelector>
						</view>
					</view>
				</view>
				<button type="primary">搜&emsp;索</button>
			</view>
		</view>
		<!-- 占比 -->
		<view class="mix">
			<view class="sub-title"><view class="icon"/>占比图</view>
			<view class="box">
				<mix 
				:width="690" 
				:height="70" 
				:list="list" 
				:color="color">
				</mix>
			</view>
		</view>
		<!-- 饼图 -->
		<view class="echart-box">
			<view class="sub-title"><view class="icon"/>设备效率饼图</view>
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"/>
		</view>
		<!-- 列表 -->
		<view class="box">
			<view class="table">
				<view class="row table-head">
					<view class="col">干扰类型</view>
					<view class="col">严重性</view>
					<view class="col">状态</view>
					<view class="col">延误时间</view>
				</view>
				<view class="row">
					<view class="col">不良</view>
					<view class="col">良</view>
					<view class="col">打开</view>
					<view class="col">203</view>
				</view>
				<view class="row">
					<view class="col">不良</view>
					<view class="col">不良</view>
					<view class="col">关闭</view>
					<view class="col">403</view>
				</view>
				<view class="row">
					<view class="col">优秀</view>
					<view class="col">不良</view>
					<view class="col">打开</view>
					<view class="col">203</view>
				</view>
			</view>
		</view>
		<!-- 公式 -->
		<view class="formula">
			<view class="sub-title"><view class="icon"/>计算公式</view>
			<view class="formula-list">
				<view class="formula-item">
					<view class="formula-name">
						时间稼动率（辉动时间/负荷时间）：
					</view>
					<view class="formula-text">
						360分/420分x100%=94%
					</view>
				</view>
				<view class="formula-item">
					<view class="formula-name">
						性能稼动率（理论节拍x生产数量/稼动时间）：
					</view>
					<view class="formula-text">
						2分x 170个/360分x100%=94%
					</view>
				</view>
				<view class="formula-item">
					<view class="formula-name">
						良品率（良品量/生产量）：
					</view>
					<view class="formula-text">
						165个/170个x100%=97%
					</view>
				</view>
				<view class="formula-item">
					<view class="formula-name">
						设备综合效率=时间稼动率x性能稼动率x良品率：
					</view>
					<view class="formula-text">
						0.86x0.94x0.97x100%=78%
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uCharts from "@/components/uni/u-charts/u-charts";
	import timeSelector from "@/components/wing-time-selector/wing-time-selector.vue";
	import mix from "@/components/mix.vue";
	var _self;
	var canvaPie = null;

	export default {
		components: {
			timeSelector,
			mix
		},
		data() {
			return {
				// 时间
				searchVisible: true,
				startTime: '开始时间',
				endTime: '结束时间',
				// 饼图
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				piearr: [],
				// 占比
				list: [{
					state: 1,
					value: 200
				}, {
					state: 0,
					value: 20
				}, {
					state: -1,
					value: 100
				}],
				color: [{
					state: 1,
					color: '#2fc25b',
					name: '启动'
				}, {
					state: 0,
					color: '#facc14',
					name: '停机'
				}, {
					state: -1,
					color: '#f04864',
					name: '故障'
				}]

			};
		},
		onLoad(option) {
			// 设置标题
			this.setText(option.name)
				// 初始化图标
				_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			setText(title) {
				uni.setNavigationBarTitle({title:title?title:'设备效率分析详情'})
			},
			// 时间
			startConfirm(e) {
				this.startTime = e.key;
			},
			endConfirm(e) {
				this.endTime = e.key;
			},
			// 饼图
			getServerData() {
				let Pie = {
					series: []
				};
				Pie.series = [{
						name: "一班",
						data: 50
					},
					{
						name: "二班",
						data: 30
					},
					{
						name: "三班",
						data: 20
					},
					{
						name: "四班",
						data: 18
					},
					{
						name: "五班",
						data: 8
					}
				];
				_self.showPie("canvasPie", Pie);
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: "pie",
					fontSize: 11,
					legend: {
						show: true,
						position: "right",
						float: "center",
						itemGap: 10,
						padding: 5,
						lineHeight: 26,
						margin: 5,
						borderWidth: 1
					},
					background: "#FFFFFF",
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							labelWidth: 15
						}
					}
				});
				this.piearr = canvaPie.opts.series;
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ":" + item.data;
					}
				});
			},
			searchDisplay() {
				this.searchVisible = !this.searchVisible;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.search {
		box-sizing: border-box;
		background-color: $white-color;

		.time {
			overflow: hidden;
			border-radius: 10upx;
			border: 1px solid $line-dark-color;
		}

		.time-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 20upx;
            height: 75upx;
			background: $white-color;

			&:first-child {
				border-bottom: 1px solid $line-dark-color;
			}

			.time-text {
				padding: 0 15upx;
				width: 600upx;
				line-height: 75upx;				
				color: $font-light-gray;
			}

			.iconfont {
				font-size:$font-26;
				color: $font-light-gray;
			}

		}

		button {margin-top: 20upx;}
	}

	.mix {
		margin: 20upx 0;
		background-color: $white-color;
		.box{padding-top: 0;}
	}

	// 饼图
	.sub-title {
		display: flex;
		flex-direction: row;
		padding: 20upx;
		line-height: 1;
		font-size: $font-36;
		color:$font-text-color;
		.icon{
		margin-right: 10upx; 
		width: 10upx; 
		height:36upx;
		 border-radius: 5upx;
		background-color: $blue-color;
		}
	}

	.analyse-title {
		display: flex;
		flex-direction: row;
		margin-right: 30upx;

		.sub-title {
			flex: 1;
		}

		.iconfont {
			padding-left: 15upx;
			color: $font-light-gray;
		}
	}

	.echart-box {
		overflow: hidden;
		background: $white-color;

		.charts-pie {
			width: 750upx;
			height: 500upx;
		}
	}

	.box {
		padding: 30upx;
		background: $white-color;
	}

	.table {
		border: 1px solid #b7d0ad;

		.row {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid $line-dark-color;

			&:last-child {
				border: 0;
			}

			.col {
				flex: 1;
				border-right: 1px solid $line-dark-color;
				padding-left: 20upx;
				line-height: 2.5;

				&:last-child {
					border: 0;
				}
			}
		}

		.table-head {
			border-bottom: 1px solid #b7d0ad;

			.col {
				line-height: 1.8;
				background-color: #e6f1c7;
			}
		}
	}

	.formula {
		margin-top: 20upx;
		background: $white-color;
	}

	.formula-list {
		padding: 10upx 30upx 30upx 30upx;

		.formula-item {
			position: relative;
			padding: 20upx 0;
			border-bottom: 1px solid $line-dark-color;

			&:nth-child(even) {
				background: $bj-gray;
			}

			.formula-name {
				color: $font-gray;
			}
		}
	}
</style>

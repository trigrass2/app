<template>
	<view class="device">
		<drawer :show="visible" :meau="meauList" @close="close" @getItem="getItem"></drawer>
		<headTitle :icon="iconList" :iconTap="iconTap">{{currentItem.wsName}}</headTitle>
		<!-- 抽屉菜单-->
		<view class="tab-box">
			<tabs :tabs="tabs" :ative="current" @getAtive="tabChage"/>
		</view>
		<!-- /tabs -->
		<view class="tips">
			<view class="tips-item">
				<text class="tips-icon green-icon"></text>
				<text>工单进度</text>
			</view>
			<view class="tips-item">
				<text class="tips-icon"></text>
				<text>模具维修进度</text>
			</view>
		</view>
		<!-- /提示 -->
		<view>
			<view class="device-list" v-for="(item,i) in allList" :key="i">
				<view :class="['device-hd',{deviceActive:item.deviceVisible}]" @tap="accordion(item)">
					<text class="device-name">{{item.processName}}</text>
					<text :class="['iconfont',item.deviceVisible?'icon-delta-drown':'icon-delta-up']"></text>
				</view>
				<view v-show="item.deviceVisible">
					<view class="device-bd">
						<block v-for="(device,j) in item.children" :key="j">
							<!--启动 -->
							<view class="device-item" v-if="device.state===1">
								<view class="device-item-box startUp">
									<view class="device-item-no">{{device.machineCode}}</view>
									<view class="device-item-center">
										<view class="device-item-left">
											<text class="iconfont icon-machine"></text>
										</view>
										<view class="device-item-right">
											<!--  <text class="device-item-name"</text> -->
											<text class="ellipsis">工单：{{device.orderNo||'无'}}</text>
											<text>状态：{{device.stopreasonName||'无'}}</text>
										</view>
									</view>
									<view class="device-item-trouble ellipsis">
										{{device.troubleDesc}}
									</view>
									<view class="device-item-progress">
										<view class="progress-bar" >
											<progress
											percent="100" 
											activeColor="#3890d8"
											 backgroundColor="#ccc" 
											 stroke-width="4"
											 border-radius="3"/>
										</view>
                                        <view class="progress-text">100%</view>
									</view>	 
									<view class="device-item-progress">
										<view class="progress-bar" >
											<progress
											percent="100" 
											activeColor="#22b14c"
											 backgroundColor="#ccc" 
											 stroke-width="4"
											 border-radius="3"/>
										</view>
                                        <view class="progress-text">100%</view>
									</view>	
								</view>
							</view>
							<!--停机 -->
							<view class="device-item" v-if="device.state===0">
								<view :class="['device-item-box',!device.stopState?'stop':'fault']">
									<!-- fault -->
									<view class="device-item-no">{{device.machineCode}}</view>
									<view class="device-item-center">
										<view class="device-item-left">
											<text class="iconfont icon-machine"></text>
										</view>
										<view class="device-item-right">
											<text>{{device.stepTimeHours}}天{{device.stepTimeMinutes}}小时{{device.stepTimeSeconds}}分</text>
											<text>状态：{{device.stopreasonName||'无'}}</text>
										</view>
									</view>
									<view class="device-item-trouble ellipsis">
										{{device.troubleDesc}}
									</view>
									<view class="device-item-progress">
										<view class="progress-bar" >
											<progress
											percent="100" 
											activeColor="#3890d8"
											 backgroundColor="#ccc" 
											 stroke-width="4"
											 border-radius="3"/>
										</view>
                                        <view class="progress-text">100%</view>
									</view>	 
									<view class="device-item-progress">
										<view class="progress-bar" >
											<progress
											percent="100" 
											activeColor="#22b14c"
											 backgroundColor="#ccc" 
											 stroke-width="4"
											 border-radius="3"/>
										</view>
                                        <view class="progress-text">100%</view>
									</view>
								</view>
							</view>
							<!-- 关机 -->
							<view class="device-item" v-if="device.state===-1">
								<view :class="['device-item-box',!device.stopState?'normal':'fault']">
									<!-- fault -->
									<view class="device-item-no">{{device.machineCode}}</view>
									<view class="device-item-center">
										<view class="device-item-left">
											<text class="iconfont icon-machine"></text>
										</view>
										<view class="device-item-right">
											<text>{{device.stepTimeHours}}天{{device.stepTimeMinutes}}小时{{device.stepTimeSeconds}}分</text>
											<text>状态：{{device.stopreasonName||'无'}}</text>
										</view>
									</view>
									<view class="device-item-trouble ellipsis">
										{{device.troubleDesc}}
									</view>
									<view class="device-item-progress">
										<view class="progress-bar" >
											<progress
											percent="100" 
											activeColor="#3890d8"
											 backgroundColor="#ccc" 
											 stroke-width="4"
											 border-radius="3"/>
										</view>
                                        <view class="progress-text">100%</view>
									</view>	 
									<view class="device-item-progress">
										<view class="progress-bar" >
											<progress
											percent="100" 
											activeColor="#22b14c"
											 backgroundColor="#ccc" 
											 stroke-width="4"
											 border-radius="3"/>
										</view>
                                        <view class="progress-text">100%</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			<view class="none" v-if="!allList.length">暂无数据</view>
		</view>
		<!-- /全部 -->
	</view>
</template>
<script>

	export default {
		data() {
			return {
				visible: false,
				meauList: [],
				currentItem: {},
				allList: [],
				// 设备
				machineList: [],
				// 工序
				procedureList: [],
				//选项卡
				tabs: [{
						value: 2,
						label: "全部"
					},
					{
						value: 1,
						label: "启动"
					},
					{
						value: 0,
						label: "停机"
					},
					{
						value: -1,
						label: "关机"
					}
				],
				current: 2,
				// styleType: 'text'
				greenColour: "#22b14c",
				iconList: ['icon-refresh', 'icon-menu']
			};
		},
		computed: {
			procedureSet() {
				return new Set(this.procedureList.map(p => p.processCode));
			},
			// 设备
			filteredMachines() {
				const machines = this.machineList.filter(machine =>
					this.procedureSet.has(machine.processCode)
				);
				if (this.current === 2) {
					return machines;
				}
				return machines.filter(machine => machine.state === this.current);
			},
			fileredProcedure() {
				const processCodeSet = new Set(
					this.filteredMachines.map(machine => machine.processCode)
				);
				return this.procedureList.filter(procedure =>
					processCodeSet.has(procedure.processCode)
				);
			}
		},
		onLoad() {
			this.init();
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.visible = !this.visible;
			}
			if (e.index === 1) {
				this.getDevice();
			}
		},
		onPullDownRefresh() {
			this.getDevice().then(() => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			async init() {
				this.meauList = await this.$http.request({
					url: "/api/BWorkShop",
					method: "GET"
				});
				this.procedureList = await this.$http.request({
					url: "/api/BProcessList",
					method: "GET"
				});

				if (this.meauList.length) {
					this.currentItem = this.meauList[0];
					this.getDevice();
				}

			},
			// //获取数据
			getDevice() {
				uni.showLoading({
					title: "加载中",
					mask: true
				});
				let timestamp1 = new Date().getTime();
				return this.$http
					.request({
						url: "/api/MachineReport/allMachineState",
						method: "GET",
						data: {
							wsCode: this.currentItem.wsCode || ""
						}
					})
					.then(({
						machineState: machines
					}) => {
						this.$loadTime(timestamp1);
						this.machineList = machines;
						// 筛选数据
						this.setDeviceData();
					})
					.catch(() => {
						uni.hideLoading();
					});
			},
			setDeviceData() {
				const machineMap = {};

				this.filteredMachines.map(m => {
					if (!machineMap[m.processCode]) {
						machineMap[m.processCode] = [];
					}
					machineMap[m.processCode].push(m);
				});

				this.allList = this.fileredProcedure.map(p => {
					p.deviceVisible = true;
					p.children = machineMap[p.processCode] || [];
					return p;
				});
			},
			//抽屉菜单操作
			open() {
				this.visible = !this.visible;
			},
			//回调函数抽屉关闭
			close(val) {
				this.visible = val;
			},
			getItem(val) {
				this.currentItem = val;
				this.visible = false;
				// this.allList=[];
				this.getDevice();
			},
			// 选项卡的操作
			tabChage(val) {
				this.current = val;
				this.setDeviceData();
			},
			// 手风琴展开收齐
			accordion(item) {
				this.$set(item, "deviceVisible", !item.deviceVisible);
				this.$forceUpdate();
			},
			iconTap(type) {
				const _this = this.$parent;
				switch (type) {
					case 'icon-refresh':
						_this.getDevice();
						break;

					case 'icon-menu':
						_this.open();
						break;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tips {
		display: flex;
		margin: 30upx 0 10upx 0;
		padding: 0 40upx;
		color: $font-gray;

		.tips-item {
			display: flex;
			align-items: center;
			margin-right: 40upx;
			font-size: $font-24;
		}

		.tips-icon {
			margin-right: 10upx;
			width: 20upx;
			height: 10upx;
			background: $blue-color;
		}

		.green-icon {
			background: $green-color;
		}
	}
    .tab-box{margin: 0 20upx;}
	.device-list {
		margin-bottom: 20upx;
		padding: 0 20upx;

		.device-hd {
			display: flex;
			align-items: center;
			padding: 0 20upx;
			height: 80upx;
			font-size: $font-30;
			color: $font-text-color;
			background: $white-color;

			.device-name {
				flex: 1;
			}

			.iconfont {
				width: 30upx;
				font-size:$font-26;
				color: $font-light-gray;
			}
		}

		.deviceActive {
			background: #e2dede;
		}

		.device-bd {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			font-size: 26upx;

			.device-item {
				box-sizing: border-box;
				width: 50%;

				.device-item-box {
					margin: 20upx;
					height: 240upx;
					border: 1px solid #ccc;
					background: $white-color;

					.device-item-no {
						height: 50upx;
						line-height: 50upx;
						background: #ccc;
						text-align: center;
					}

					.device-item-center {
						display: flex;
						flex-direction: row;
						align-items: center;
						padding: 10upx 10upx 0 10upx;
						height: 90upx;
					}

					.device-item-left {
						overflow: hidden;
						margin-right: 10upx;

						.iconfont {
							font-size: 60upx;
							color: $font-light-gray;
						}
					}

					.device-item-right {
						overflow: hidden;
						flex: 1;
						display: flex;
						flex-direction: column;
						color: $font-text-color;
						line-height: 1.5;
						font-size: 26upx;
					}

					.device-item-progress {
						margin: 0 20upx;
						display: flex;
						flex-direction: row;
						align-items: center;
						height: 24upx;
						.progress-bar{flex: 1;}
						.progress-text{
							margin-left: 10upx; 
							font-size: $font-24;
							color:$font-light-gray;
							}
					}
				}

				.startUp {
					border: 1px solid $green-color;

					.device-item-no {
						color: $white-color;
						background: $green-color;
					}
				}

				.device-item-trouble {
					margin: 0 20upx 10upx 20upx;
					padding: 0 5upx;
					font-size: 24upx;
					line-height: 1.2;
					color: $white-color;
					background-color: $red-color;
				}

				.stop {
					border: 1px solid $yellow-color;

					.device-item-no {
						color: $white-color;
						background: $yellow-color;
					}
				}

				.fault {
					border: 1px solid $red-color;
					.device-item-no {
						color: $white-color;
						background: $red-color;
					}
				}

				// 正常
				.normal {
					border: 1px solid #696969;
					.device-item-no {
						color: $white-color;
						background: #696969;
					}
				}
			}
		}
	}

</style>

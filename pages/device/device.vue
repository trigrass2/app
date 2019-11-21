<template>
	<view class="device">
		<drawer :show="visible" :navData="meauList" @close="close" @getItem="getItem"></drawer>
<!-- 		<view>
			<button type="primary" @tap="open">打开抽屉</button>
		</view> -->
		<view class="title">{{currentItem.wsName}}</view>
		<!-- 抽屉菜单-->
		<view class="tabs">
			<view v-for="tab in tabs" :key="tab.value" @tap="tabChage(tab.value)" :class="[{ active:current===tab.value},'tabs-items']">{{tab.label}}</view>
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
			<view class="device-list" v-for="item in allList" :key="item.processCode">
				<view :class="['device-hd',{deviceActive:item.isDisplay}]" @tap="accordion(item)">
					<text class="device-name">{{item.processName}}</text>
					<text :class="['iconfont',item.isDisplay?'icon-zhankai':'icon-shouqi']"></text>
				</view>
				<view v-show="item.isDisplay?item.isDisplay:false">
					<view class="device-bd">
						<block v-for="device in item.children" :key="device.machineCode">
							<view class="device-item" v-if="device.state===1">
								<view class="device-item-box startUp">
									<view class="device-item-no">{{device.machineCode}}</view>
									<view class="device-item-center">
										<view class="device-item-left">
											<text class="iconfont icon-zhusuji01"></text>
										</view>
										<view class="device-item-right">
											<text class="device-item-name">工单：</text>
											<text class="ellipsis">{{device.orderNo}}</text>
										</view>
									</view>
									<view class="device-item-footer">
										<view class="device-item-percent">
											<percent></percent>
										</view>
										<view class="device-item-percent">
											<percent :progressColour="greenColour"></percent>
										</view>
									</view>
								</view>
							</view>
							<!-- /启动 -->
							<view class="device-item" v-if="device.state===0||device.state===-1">
								<view :class="['device-item-box',{stop:device.state===0,fault:device.state===-1}]">
									<!-- fault -->
									<view class="device-item-no">{{device.machineCode}}</view>
									<view class="device-item-center">
										<view class="device-item-left">
											<text class="iconfont icon-zhusuji01"></text>
										</view>
										<view class="device-item-right">
											<text class="ellipsis">{{device.troubleDesc}}</text>
											<text>{{device.stepTimeHours}}天{{device.stepTimeMinutes}}小时{{device.stepTimeSeconds}}分</text>
										</view>
									</view>
									<view class="device-item-footer">
										<view class="device-item-percent">
											<percent></percent>
										</view>
										<view class="device-item-percent">
											<percent :progressColour="greenColour"></percent>
										</view>
									</view>
								</view>
							</view>
							<!--/停机 -->
						</block>
					</view>
				</view>
			</view>
			<view class="none" v-if="allList.length===0">暂无数据</view>
		</view>
		<!-- /全部 -->
	</view>
</template>
<script>
	import drawer from "@/components/drawer.vue";
	import percent from "@/components/percent.vue";
	
	export default {
		components: {
			drawer,
			percent
		},
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
				tabs: [{ value: 2, label: "全部" }, {value: 1, label: "启动" }, { value: 0, label: "停机" }, { value: -1, label: "故障" }],
				current: 2,
				// styleType: 'text'
				greenColour: "#22b14c"
			};
		},
		computed: {
			procedureSet () {
				return new Set(this.procedureList.map(p => p.processCode));
			},
			// 设备
			filteredMachines () {
				const machines = this.machineList.filter(machine => this.procedureSet.has(machine.processCode))
				if (this.current === 2) {
					return machines
				}
				return machines.filter(machine => machine.state === this.current)
			},
			fileredProcedure () {
				const processCodeSet = new Set(this.filteredMachines.map(machine => machine.processCode))
				return this.procedureList.filter(procedure => processCodeSet.has(procedure.processCode))
			}
		},
		onLoad() {
			this.init();
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.visible = !this.visible;
			}
		},
		methods: {
			init() {
				uni.showLoading({
					title: "加载中",
					mask: true
				});
				Promise.all([this.getProcedure(), this.getMeauData()])
					.then(([procedure, meau]) => {
						this.meauList = meau;
						if (meau.length) {
							this.currentItem = meau[0];
						}
						this.procedureList = procedure;
					})
					.then(() => {
						uni.hideLoading();
						this.getDevice();
					})
					.catch(error => {
						uni.hideLoading();
					});
			},
			//获取数据
			getProcedure() {
				return this.$http
					.request({
						url: "/api/BProcessList",
						method: "GET"
					})
					.then(res => {
						return Promise.resolve(res);
					});
			},
			getMeauData() {
				return this.$http
					.request({
						url: "/api/BWorkShop",
						method: "GET"
					})
					.then(res => {
						return Promise.resolve(res);
					});
			},
			getDevice() {
				uni.showLoading({
					title: "加载中",
					mask: true
				});
				this.$http
					.request({
						url: "/api/MachineReport/allMachineState",
						method: "GET",
						data: {
							wsCode: this.currentItem.wsCode
						}
					})
					.then(({
						machineState: machines
					}) => {
						uni.hideLoading();
						this.machineList = machines
						// 筛选数据
						this.setDeviceData()
					})
					.catch(() => {
						uni.hideLoading();
					});
			},
			setDeviceData () {
				const machineMap = {}
				this.filteredMachines.map(m => {
					if (!machineMap[m.processCode]) {
						machineMap[m.processCode] = []
					}
					machineMap[m.processCode].push(m)
				})
				this.allList = this.fileredProcedure.map(p => {
					p.children = machineMap[p.processCode] || []
					return p
				})
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
				this.getDevice();
			},
			// 选项卡的操作
			tabChage(index) {
				this.current = index;
				this.setDeviceData()
			},
			// 手风琴展开收齐
			accordion(item) {
				this.$set(item, "isDisplay", !item.isDisplay);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tabs {
		overflow: hidden;
		display: flex;
		margin: 0 auto;
		width: 450upx;
		border: 1px solid $blue-color;
		border-radius: 10px;

		.tabs-items {
			flex: 1;
			text-align: center;
			height: 50upx;
			line-height: 50upx;
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

	.tips {
		display: flex;
		margin: 10px 0 5px 0;
		padding: 0 20px;
		font-size: 25upx;
		color: $font-gray;

		.tips-item {
			display: flex;
			align-items: center;
			margin-right: 20px;
		}

		// text{display: inline-block;}
		.tips-icon {
			margin-right: 5px;
			width: 20upx;
			height: 10upx;
			background: $blue-color;
		}

		.green-icon {
			background: $green-color;
		}
	}

	.device-list {
		margin-bottom: 10px;
		padding: 0 10px;

		.device-hd {
			display: flex;
			align-items: center;
			padding: 0 10px;
			height: 83upx;
			font-size: 30upx;
			color: $font-title-color;
			background: $white-color;

			.device-name {
				flex: 1;
			}

			.iconfont {
				width: 30upx;
				font-size: 30upx;
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

				// border: 1px solid #ddd;
				.device-item-box {
					margin: 10px;
					height: 200upx;
					border: 1px solid #ccc;

					.device-item-no {
						height: 50upx;
						line-height: 50upx;
						background: #ccc;
						text-align: center;
					}

					.device-item-center {
						display: flex;
						overflow: hidden;
						padding: 5px;
						height: 70upx;
					}

					.device-item-left {
						overflow: hidden;
						margin-right: 5px;
						width: 65upx;

						.iconfont {
							font-size: 60upx;
							color: $font-light-gray;
							line-height: 70upx;
						}
					}

					.device-item-right {
						overflow: hidden;
						flex: 1;
						display: flex;
						flex-direction: column;
						line-height: 1.5;
						color: $font-title-color;
					}

					.device-item-footer {
						padding: 0 10px;

						.device-item-percent {
							margin-top: 3px;
						}
					}
				}

				.startUp {
					border: 1px solid $green-color;

					.device-item-no {
						color: $white-color;
						background: $green-color;
					}

					.device-item-name {
						color: $font-light-gray;
					}
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
			}
		}
	}
</style>

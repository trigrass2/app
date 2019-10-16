<template>
	<view class="device">
		<drawer :show="visible" :navData="meauList" @close="close" @getItem="getItem"></drawer>
		<!-- <view><button type="primary" @tap="open">打开抽屉</button></view> -->
		<view class="title">{{currentItem.wsName}}</view>
		<!-- 抽屉菜单-->
		<view class="tabs">
			<view v-for="(item,index) in tabs" :key="index" @tap="tabChage(index)" :class="[{ active:current===index},'tabs-items']">
				{{item}}
			</view>
		</view>
		<!-- tabs -->
		<view class="content">
			<view class="start" v-show="current === 0">
				<view class="device-box" v-if="startList.length">
					<view class="device-list" v-for="(item,i) in startList" :key="i">
						<view :class="[{'device-active': item.isDisplay},'device-hd']" @tap="accordion(startList,i)">
							{{item.processName}}
							<text :class="['iconfont',item.isDisplay?'icon-zhankai':'icon-shouqi']"></text>
						</view>
						<view v-show="item.isDisplay?item.isDisplay:false">
							<view class="device-bd">
								<view class="device-state" v-for="(device,i) in item.children" :key="i">
									<view class="device-state-line ellipsis"><text class="device-state-name">设备</text>{{device.machineCode}}</view>
									<view class="ellipsis"><text class="device-state-name">工单</text>{{device.orderNo}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					暂无数据
				</view>
			</view>
			<!-- 启动 -->
			<view class="stop" v-show="current === 1">
				<view class="device-box" v-if="stopList.length">
					<view class="device-list" v-for="(item,i) in stopList" :key="i">
						<view :class="[{'device-active': item.isDisplay},'device-hd']" @tap="accordion(stopList,i)">
							{{item.processName}}
							<text :class="['iconfont',item.isDisplay?'icon-zhankai':'icon-shouqi']"></text>
						</view>
						<view v-show="item.isDisplay?item.isDisplay:false">
							<view class="device-bd">
								<view class="device-state" v-for="(device,i) in item.children" :key="i">
									<view class="device-state-line ellipsis"><text class="device-state-name">设备</text>{{device.machineCode}}</view>
									<view><text class="device-state-name">故障</text>{{device.troubleDesc?device.troubleDesc:''}}</view>
									<view><text class="device-state-name">经历</text>{{device.stepTimeHours}}天{{device.stepTimeMinutes}}小时{{device.stepTimeSeconds}}分</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					暂无数据
				</view>
			</view>
			<!-- 停止 -->
			<view class="fault" v-show="current === 2">
				<view class="device-box" v-if="faultList.length">
					<view class="device-list" v-for="(item,i) in faultList" :key="i">
						<view :class="[{'device-active': item.isDisplay},'device-hd']" @tap="accordion(faultList,i)">
							{{item.processName}}
							<text :class="['iconfont',item.isDisplay?'icon-zhankai':'icon-shouqi']"></text>
						</view>
						<view v-show="item.isDisplay?item.isDisplay:false">
							<view class="device-bd">
								<view class="device-state" v-for="(device,i) in item.children" :key="i">
									<view class="device-state-line ellipsis"><text class="device-state-name">设备</text>{{device.machineCode}}</view>
									<view><text class="device-state-name">故障</text>{{device.troubleDesc?device.troubleDesc:''}}</view>
									<view><text class="device-state-name">经历</text>{{device.stepTimeHours}}天{{device.stepTimeMinutes}}小时{{device.stepTimeSeconds}}分</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					暂无数据
				</view>
			</view>
			<!-- 故障 -->
		</view>
	</view>
</template>
<script>
	import drawer from '@/components/drawer.vue'
	let _this;
	export default {
		components: {
			drawer
		},
		data() {
			return {
				visible: false,
				meauList: [],
				currentItem: {},
				// 故障设备
				stopList: [],
				startList: [],
				faultList: [],
				procedureList: [],

				//选项卡
				tabs: ['启动', '停机', '故障'],
				current: 0,
				// styleType: 'text'
			};
		},
		onLoad() {
			_this = this;
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
					title: '加载中'
				});
				Promise.all([this.getProcedure(), this.getMeauData()]).then((result) => {
					let [procedure, meau] = result;
					this.meauList = meau;
					if (meau.length) {
						this.currentItem = meau[0];
					}
					this.procedureList = procedure;

				}).then(() => {
					uni.hideLoading();
					this.getDevice();
				}).catch((error) => {
					uni.hideLoading();
				})

			},
			//获取数据
			getProcedure() {
				return this.$http.request({
					url: '/api/BProcessList',
					method: 'GET'
				}).then(res => {
					return Promise.resolve(res)
				})
			},
			getMeauData() {
				return this.$http.request({
					url: '/api/BWorkShop',
					method: 'GET'
				}).then(res => {
					return Promise.resolve(res)
				});
			},
			getDevice() {
				uni.showLoading({
					title: '加载中'
				});
				this.$http.request({
					url: '/api/MachineReport/allMachineState',
					method: 'GET',
					data: {
						wsCode: this.currentItem.wsCode
					}
				}).then(({
					machineState
				}) => {
					uni.hideLoading();
					this.procedureList.map((item, i) => {
						machineState.map((item2, j) => {
							if (item.processCode === item2.processCode) {
								if (item2.state === 0) {
									this.dataFn(_this.stopList, item, item2);
								}
								if (item2.state === -1) {
									this.dataFn(_this.faultList, item, item2);
								}
								if (item2.state === 1) {
									this.dataFn(_this.startList, item, item2);
								}
							}

						})
					});
					// console.log('_this.stopList', _this.stopList);
					// console.log('_this.faultList', _this.faultList);
					// console.log('_this.startList', _this.startList);
					// 筛选数据
				}).catch(() => {
					uni.hideLoading();
				});

			},
			resetData() {
				this.stopList = [];
				this.startList = [];
				this.faultList = [];
			},
			//抽屉菜单操作
			open() {
				this.visible = !this.visible;
			},
			close(val) { //回调函数抽屉关闭
				this.visible = val;
			},
			getItem(val) {
				this.currentItem = val;
				this.visible = false;
				this.resetData();
				this.getDevice();
			},
			// 选项卡的操作
			tabChage(index) {
				this.current = index;
			},
			// 处理获取最后的数据
			dataFn(list, item, item2) {
				!(list.includes(item)) && list.push(item);

				let num = list.indexOf(item);

				if (!list[num].children) {
					list[num].children = []
				};

				list[num].children.push(item2);
			},

			// 手风琴展开收齐
			accordion(list, index) {
				// console.log(this.faultList[index].isDisplay=!this.faultList[index].isDisplay);

				list.forEach((item, i) => {
					if (index !== i) {
						this.$set(item, 'isDisplay', false);
					} else {
						this.$set(item, 'isDisplay', !item.isDisplay);
					}

				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	// .device {
	// 	min-height: 100%;
	// 	background: $gray-bj-color;
	// }

	.tabs {
		overflow: hidden;
		margin: 0 auto 20px auto;
		width: 80%;
		display: flex;
		border: 1px solid $blue-color;
		border-radius: 20px;

		.tabs-items {
			flex: 1;
			text-align: center;
			height: 60upx;
			line-height: 60upx;
			font-size: 28upx;
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

	//列表样式
	.device-list {
		// padding: 0 10px;

		background: $white-color;
		border-top: 1px solid #e3e1e1;

		&:last-child {
			border-bottom: 1px solid #e3e1e1;
		}

		.device-hd {
			position: relative;
			padding: 0 20px;
			height: 100upx;
			line-height: 100upx;
            font-size:34upx;
			.iconfont {
				position: absolute;
				right: 20px;
				font-size: 14px;
				color: #999;
			}
		}

		.device-active {
			background: #f0f0f0;
		}

		.device-bd {
			margin: 0 auto;
			padding: 10px 0 20px 0;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			width: 700upx;

			.device-state {
				box-sizing: border-box;
				margin: 10px 10px 0 0;
				// margin-right: 10px;
				padding: 5px;
				width: 340upx;
				// height: 190upx;
				font-size: 28upx;
				border: 1px solid $line-color;
				border-radius: 5px;

				// box-shadow: 0px 2px 4px #dad8d8;
				&:nth-child(even) {
					margin-right: 0;
				}

				.device-state-name {
					padding-right: 5px;
					color: $name-color;
				}

				.device-state-line {
					margin: 5px 0;
					border-bottom: 1px dashed $line-color;
				}

			}
		}
	}

	.start {
		.device-state-line {
			color: #1AAD19;
		}
	}

	.stop {
		.device-state-line {
			color: #cc6600;
		}
	}

	.fault {
		.device-state-line {
			color: #ff0000;
		}
	}
</style>

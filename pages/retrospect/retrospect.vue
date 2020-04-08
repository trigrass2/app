<template>
	<view class="retrospect">
		<!-- tabs -->
		<view class="search">
			<tabs :tabs="tabsList" :ative="ative" @getAtive="getAtive">
			</tabs>
			<!-- 产品 -->
			<view class="from-list" v-show="ative==='Product'">
				<view class="item">
					<input class="uni-input" placeholder="工单" v-model="fabric.workOrder" />
				</view>
				<view class="item">
					<input class="uni-input" placeholder="产品批次" v-model="fabric.batch" />
				</view>
				<view class="item">
					<picker mode="date" :value="fabric.startDate" @change="changeStartDate">
						<view :class="['uni-input',{'input-color':!fabric.startDate}]">
							{{fabric.startDate||'开始时间'}}
						</view>
					</picker>
				</view>
				<view class="item">
					<picker mode="date" :value="fabric.endDate" @change="changeEndDate">
						<view :class="['uni-input',{'input-color':!fabric.endDate}]">
							{{fabric.endDate||'结束时间'}}
						</view>
					</picker>
				</view>
			</view>
			<!-- 物料 -->
			<view class="from-list" v-show="ative==='Material'">
				<view class="item">
					<input class="uni-input" placeholder="工单" v-model="matters.matter" />
				</view>
				<view class="item">
					<input class="uni-input" placeholder="产品批次" v-model="matters.batch" />
				</view>
			</view>
			<view class="search-btn">
				<view class="btn-item">
					<button type="primary" plain="true">清空</button>
				</view>
				<view class="btn-item">
					<button type="primary">查询</button>
				</view>
			</view>
		</view>
		<!-- reviewTree -->
		<view class="reviewTree">
			<reviewTree ref="reviewTree" />
		</view>
	</view>
</template>

<script>
	import tabs from '@/components/tabs.vue';
	import reviewTree from './component/reviewTree.vue';
	export default {
		name: 'Retrospect',
		components: {
			tabs,
			reviewTree
		},
		data() {
			return {
				//数据字典、
				productDict: {},
				materialDict: {},
				processDict: {},
				stepDict: {},
				empDict: {},
				// tabs
				tabsList: [{
						label: '以产品追溯',
						value: 'Product'
					},
					{
						label: '以物料追溯',
						value: 'Material'
					}
				],
				ative: 'Product',
				fabric: {
					workOrder: '',
					batch: '',
					startDate: '',
					endDate: ''
				},
				matters: {
					matter: '',
					batch: ''
				}

			}
		},
		onLoad() {
			this.getFetchDicts();
		},
		methods: {
			// tabs
			tabsTap(val) {},
			// 日期
			changeStartDate(val) {
				const {
					detail: {
						value
					}
				} = val
				this.fabric.startDate = value;
			},
			changeEndDate(val) {
				const {
					detail: {
						value
					}
				} = val
				this.fabric.endDate = value;
			},
			// tabs
			getAtive(val) {
				this.ative = val;
			},
			// 获取数字字典
			getFetchDicts() {
				this.$http
					.request({
						url: "/api/Dictionary",
						method: "GET",
						data: {
							keys: 'BProduct|BMaterial|BProcessList|BProcessStep|SEmployee'
						}
					})
					.then(res => {
						this.productDict = res.BProduct
						this.materialDict = res.BMaterial
						this.processDict = res.BProcessList
						this.stepDict = res.BProcessStep
						this.empDict = res.SEmployee
					})
			}

		}
	}
</script>

<style lang="scss" scoped>
	// 搜索
	.search {
		padding: 40upx 20px;
		background-color: $white-color;

		.tabs {
			margin: 0;
		}

		.input-color {
			color: $font-light-gray;
		}

		.search-btn {
			display: flex;
			flex-direction: row;
			margin-top: 30upx;

			.btn-item {
				flex: 1;

				&:first-child {
					padding-right: 10upx;
				}

				&:last-child {
					padding-left: 10upx;
				}
			}
		}

	}

	.from-list {
		.item {
			border-bottom: 1px solid $line-color;
		}
	}

	// reviewTree
	.reviewTree {
		margin-top: 20upx;
		background-color: $white-color;
	}
</style>

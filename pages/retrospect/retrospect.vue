<template>
	<view class="retrospect">
		<!-- tabs -->
		<view class="search">
			<tabs :tabs="tabsList" :ative="ative" @getAtive="getAtive">
			</tabs>
			<!-- 产品 -->
			<view class="from-list" v-show="ative==='Product'">
				<view class="item">
					<input class="uni-input" placeholder="工单" v-model="fabric.orderNo" />
				</view>
				<view class="item">
					<input class="uni-input" placeholder="产品批次" v-model="fabric.sfc" />
				</view>
				<view class="item">
					<picker mode="date" :value="fabric.startDay" @change="changestartDay">
						<view :class="['uni-input',{'input-color':!fabric.startDay}]">
							{{fabric.startDay||'开始时间'}}
						</view>
					</picker>
				</view>
				<view class="item">
					<picker mode="date" :value="fabric.endDay" @change="changeendDay">
						<view :class="['uni-input',{'input-color':!fabric.endDay}]">
							{{fabric.endDay||'结束时间'}}
						</view>
					</picker>
				</view>
			</view>
			<!-- 物料 -->
			<view class="from-list" v-show="ative==='Material'">
				<view class="item">
					<input class="uni-input" placeholder="工单" v-model="matCodes.matCode" />
				</view>
				<view class="item">
					<input class="uni-input" placeholder="产品批次" v-model="matCodes.matSfc" />
				</view>
			</view>
			<view class="search-btn">
				<view class="btn-item">
					<button type="primary" plain="true" @tap="clear">清空</button>
				</view>
				<view class="btn-item">
					<button type="primary" @tap="search">查询</button>
				</view>
			</view>
		</view>
		<!-- reviewTree -->			
		<view class="reviewTree">
			<reviewTree 
			ref="tree" 
			:product-map="productDict" 
			:material-map="materialDict" 
			:process-map="processDict" 
			:step-map="stepDict"
			:emp-map="empDict" 
			@materialData="getMaterial" />
		</view>
		
	</view>
</template>

<script>
	// import tabs from '@/components/tabs.vue';
	import reviewTree from './component/reviewTree.vue';
	export default {
		name: 'Retrospect',
		components: {
			// tabs,
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
				tabsList: [
					{
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
					orderNo: '',
					sfc: '',
					startDay: '',
					endDay: ''
				},
				matCodes: {
					matCode: '',
					matSfc: ''
				}

			}
		},
		onLoad() {
			this.getFetchDicts();
		},
		computed: {
			form() {
				const isMaterial = this.ative !== 'Product'
				if (isMaterial) {
					return {
						isMaterial,
						...this.matCodes
					}
				}
				return {
					isMaterial,
					...this.fabric
				}
			}
		},
		methods: {
			// 日期
			changestartDay(val) {
				const {
					detail: {
						value
					}
				} = val
				this.fabric.startDay = value;
			},
			changeendDay(val) {
				const {
					detail: {
						value
					}
				} = val
				this.fabric.endDay = value;
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
			},
			search() {
				this.$refs.tree.fetchData(this.form)
			},
			// 获取物料的数据
			getMaterial(val) {
				this.ative = val.isMaterial ? 'Material' : 'Product';
				for (let key in this.matCodes) {
					this.matCodes[key] = val[key]
				}
			},
			clear(){
				let form=this.ative==='Product'?this.fabric:this.matCodes;
				Object.keys(form).forEach(function(key){	
				     form[key]=''				
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 搜索
	.search {
		padding: 40upx 20px;
		background-color: $white-color;

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
			padding: 5upx 0;
			border-bottom: 1px solid $line-color;
			.uni-input{font-size:$font-32;}
		}
	}
	// reviewTree
	.reviewTree {
		margin: 20upx 0;
		background-color: $white-color;
	}
</style>

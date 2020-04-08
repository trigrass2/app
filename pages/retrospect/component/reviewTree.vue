<template>
<view>
	<ly-tree v-if="isReady" :props="props" node-key="name" :load="loadNode" lazy>
	</ly-tree>
</view>
</template>

<script>
	import LyTree from '@/components/ly-tree/ly-tree.vue'
	
	var _self;
	export default {
		name:'ReviewTree',
		  props: {
		    productMap: {
		      type: Object,
		      required: true
		    },
		    materialMap: {
		      type: Object,
		      required: true
		    },
		    processMap: {
		      type: Object,
		      required: true
		    },
		    stepMap: {
		      type: Object,
		      required: true
		    },
		    empMap: {
		      type: Object,
		      required: true
		    }
		  },
		components: {
			LyTree
		},
		data() {
			return {
				//为了确保页面加载完成后才去调用load方法，this指向正确
				isReady: false,
				props: {
					label: 'name',
					children: 'zones',
					isLeaf: 'leaf'
				}
			};
		},	
		mounted() {
			_self = this;
			this.isReady = true;
		},
		
		methods: {
			// 因为这个函数是在Vue实例以外的地方调用，如果函数内部需要用到this，需要改成_self
			loadNode(node, resolve) {
				// _self.xxx; 这里用_self而不是this
				
				if (node.level === 0) {
					setTimeout(() => {
						resolve([{
							name: 'region'
						}]);
					}, 1000);
				} else {
					if (node.level > 1) return resolve([]);
					
					setTimeout(() => {
						const data = [{
							name: 'leaf',
							leaf: true
						}, {
							name: 'zone'
						}];
					
						resolve(data);
					}, 500);
				}
			}
		}
	};
</script>

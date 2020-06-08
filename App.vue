<script>
	import {
		mapState
	} from 'vuex';
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			if (this.hasLogin) {
				uni.reLaunch({
					url: 'pages/index/index'
				})
			}
			// #endif
			// //#ifdef H5
			// this.skipH5()
			// if ('onhashchange' in window) {
			// 	window.onhashchange = () => {
			// 		this.skipH5()
			// 	}
			// }
			// //#endif
		},
		onShow: function() {
		},
		onHide: function() {
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
			// //#ifdef H5
			// skipH5() {
			// 	if (!this.hasLogin) {
			// 		uni.reLaunch({
			// 			url: '/'
			// 		})
			// 	} else {
			// 		if (window.location.hash === '#/') {
			// 			uni.reLaunch({
			// 				url: '/pages/index/index'
			// 			})
			// 		}
			// 	}
			// }
			// //#endif			
		}
	}
</script>

<style lang="scss">
	@import 'static/style/common/uni.css';
	@import 'static/style/iconfont.css';
	@import 'static/style/style.scss';
	@import url("components/ly-tree/ly-tree.css");
</style>

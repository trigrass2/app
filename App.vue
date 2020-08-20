<script>
import { mapState, mapActions } from "vuex";
export default {
  onLaunch: function () {
    this.init();
  },
  onShow: function () {},
  onHide: function () {},
  computed: {
    ...mapState(["hasLogin", "userInfo"]),
  },
  methods: {
    ...mapActions(["getWorkShop"]),
    init() {
      if (this.hasLogin) {
        this.getWorkShop();
        uni.reLaunch({
          url: "pages/index/index",
        });
      }
    },
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
  },
};
</script>

<style lang="scss">
// @import 'static/style/common/uni.css';
@import "static/style/iconfont.css";

@import "static/style/style.scss";
@import "uview-ui/index.scss";
@import url("components/ly-tree/ly-tree.css");
</style>

<template>
  <view class="my">
    <u-navbar
      title="我的"
      title-color="#ffffff"
      :is-back="navbar.isBack"
      :border-bottom="false"
      :background="navbar.background"
    />
    <view class="u-page">
      <view class="user">
        <view class="user-icon">
          <u-icon name="account-fill" color="#ddd" size="120" top="30"></u-icon>
        </view>
        <text class="user-info">你好，{{userInfo.userName}}</text>
      </view>
      <!-- 用户信息 -->
      <view class="my-info">
        <u-cell-group>
          <u-cell-item title="你的未读消息">
            <!-- <i slot="icon" class="iconfont icon-circleDot" /> -->
            <u-icon
              slot="icon"
              name="circleDot"
              custom-prefix="custom-icon"
              size="25"
              color="#999"
            />
            <text class="info-time">一分钟前</text>
            <u-badge count="99+" :absolute="false" />
          </u-cell-item>
          <u-cell-item title="你的未读任务">
            <u-icon
              slot="icon"
              name="circleDot"
              custom-prefix="custom-icon"
              size="25"
              color="#999"
            />
            <text class="info-time">一分钟前</text>
            <u-badge count="3" :absolute="false" />
          </u-cell-item>
        </u-cell-group>
      </view>
      <!--我的消息-->
      <view class="loginOut">
        <u-button type="default" @click="signOut">退出登录</u-button>
      </view>
    </view>
    <u-tabbar :list="nav.list" :mid-button="nav.isMid" :active-color="nav.activeColor" />
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      navbar: {
        background: {
          backgroundColor: "#1890ff",
        },
        isBack: false,
      },
      spotVisible: false,
    };
  },
  onLoad() {},
  computed: {
    ...mapState(["userInfo", "nav"]),
  },
  methods: {
    ...mapMutations(["logout"]),
    signOut() {
      this.logout();
      uni.reLaunch({
        url: "/pages/login/login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  padding: 50px 0;
  text-align: center;
  background: $blue-color;

  .user-icon {
    margin: 0 auto 15upx auto;
    text-align: center;
    width: 180upx;
    height: 180upx;
    text-align: center;
    color: $blue-color;
    border-radius: 50%;
    background: $white-color;
  }
  .user-info {
    font-size: 30upx;
    color: $white-color;
  }
}

.loginOut {
  padding: 40upx 30upx;
}
</style>

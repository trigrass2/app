<template>
  <view>
    <u-navbar title="添加常用" :is-back="navbar.isBack" :background="navbar.background" />
    <!-- nav -->
    <view class="menu">
      <view class="menu-title">
        <u-section title="常用" :right="false" />
      </view>
      <u-grid :col="4">
        <u-grid-item>
          <view class="menu-icon">
            <u-icon
              slot="icon"
              name="close"
              custom-prefix="custom-icon"
              size="28"
              color="#999"
            />
          </view>
          <u-icon name="photo" color="#3ba7f6" size="50" />
          <view class="grid-text">图片</view>
        </u-grid-item>
      </u-grid>
    </view>
    <!-- 常用菜单 -->
    <u-gap height="20" />
    <view class="menu">
      <view class="menu-title">
        <u-section title="全部" :right="false" />
      </view>
      <u-grid :col="4">
        <u-grid-item v-for="(menuItem,i) in menuList" :key="i">
          <view class="menu-icon">
            <u-icon
              slot="icon"
              name="add"
              custom-prefix="custom-icon"
              size="28"
              color="#1699f8"
            />
          </view>
          <u-icon :name="menuItem.icon" color="#3ba7f6" size="50" />
          <view class="grid-text">{{menuItem.text}}</view>
        </u-grid-item>
      </u-grid>
    </view>
    <!-- 新增菜单 -->
  </view>
</template>
<script>
export default {
  name: "addMenu",
  data() {
    return {
      navbar: {
        background: {
          backgroundColor: "#fff",
        },
        isBack: true,
      },
      //   菜单
      menuList: [
        {
          icon: "file-text-fill",
          text: "生产详情",
          url: "/pages/product/product",
        },
        {
          icon: "calendar-fill",
          text: "设备管理",
          url: "/pages/device/device",
        },
        {
          icon: "coupon-fill",
          text: "效力分析",
          url: "/pages/analyse/analyse",
        },
        {
          icon: "play-right-fill",
          text: "工艺追溯",
          url: "/pages/retrospect/retrospect",
        },
        {
          icon: "hourglass-half-fill",
          text: "效力管理",
          url: "/pages/effect/effect",
        },
        {
          icon: "integral-fill",
          text: "质量管理",
          url: "/pages/quality/quality",
        },
        {
          icon: "scan",
          text: "相关查询",
          url: "/pages/search/search",
        },
        {
          icon: "chat-fill",
          text: "我的消息",
          url: "/pages/info/info",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.menu {
  padding: 25rpx 0;
  background-color: $white-color;
  .menu-title {
    padding: 0 25rpx 20rpx 25rpx;
  }
  .menu-icon {
    position: absolute;
    top: 10rpx;
    right: 15rpx;
  }
  /deep/ .u-grid-item-box {
    padding: 50rpx 0;
  }
}
.grid-text {
  margin-top: 10rpx;
  color: #444;
}
</style>
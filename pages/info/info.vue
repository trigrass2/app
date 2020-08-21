<template>
  <view>
    <u-navbar :is-back="true" :background="navbar.background">
      <view class="navbar-title">我的消息</view>
      <view class="navbar-right" slot="right">
        <view class="navbar-icon">
          <u-badge
            class="icon-item"
            size="mini"
            count="20"
            :offset="[-18,-13]"
            type="error"
          />
          <u-icon name="chat" color="#333" size="45" />
        </view>
      </view>
    </u-navbar>
    <!-- nav -->
    <view class="info">
      <view class="info-row">
        <view class="icon-col">
          <u-badge size="small" type="error" :offset="[8,-10]" :is-dot="true" />
          <u-icon class="info-icon" name="volume-up" color="#fff" size="50" />
        </view>
        <view class="text-col">
          <view class="text-col-title">
            <text class="info-name">系统自动取消订单提醒</text>
            <text class="info-time">2018-01-23</text>
          </view>
          <view class="info-text ellipsis">这里说的图片图标，指的是小图标，起作用定位为"icon"图标作用，而非大尺寸的图片展示场景</view>
        </view>
      </view>
    </view>
    <view class="info">
      <view class="info-row">
        <view class="icon-col">
          <u-icon class="info-icon" name="volume-up" color="#fff" size="50" />
        </view>
        <view class="text-col">
          <view class="text-col-title">
            <text class="info-name">系统自动取消订单提醒</text>
            <text class="info-time">2018-01-23</text>
          </view>
          <view class="info-text ellipsis">这里说的图片图标，指的是小图标，起作用定位为"icon"图标作用，而非大尺寸的图片展示场景</view>
        </view>
      </view>
    </view>
    <view class="info">
      <view class="info-row">
        <view class="icon-col">
          <u-icon class="info-icon" name="volume-up" color="#fff" size="50" />
        </view>
        <view class="text-col">
          <view class="text-col-title">
            <text class="info-name">系统自动取消订单提醒</text>
            <text class="info-time">2018-01-23</text>
          </view>
          <view class="info-text ellipsis">这里说的图片图标，指的是小图标，起作用定位为"icon"图标作用，而非大尺寸的图片展示场景</view>
        </view>
      </view>
    </view>
    <!-- one -->
    <view class="info">
      <view class="info-row">
        <view class="icon-col">
          <u-icon class="info-icon" name="volume-up" color="#fff" size="50" />
        </view>
        <view class="text-col">
          <view class="text-col-title">
            <text class="info-name">系统自动取消订单提醒</text>
            <text class="info-time">2018-01-23</text>
          </view>
          <view class="info-text ellipsis">这里说的图片图标，指的是小图标，起作用定位为"icon"图标作用，而非大尺寸的图片展示场景</view>
        </view>
      </view>
    </view>
    <view class="info">
      <view class="info-row">
        <view class="icon-col">
          <u-icon class="info-icon" name="volume-up" color="#fff" size="50" margin-top="5" />
        </view>
        <view class="text-col">
          <view class="text-col-title">
            <text class="info-name">系统自动取消订单提醒</text>
            <text class="info-time">2018-01-23</text>
          </view>
          <view class="info-text ellipsis">这里说的图片图标，指的是小图标，起作用定位为"icon"图标作用，而非大尺寸的图片展示场景</view>
        </view>
      </view>
    </view>
    <!-- info -->
  </view>
</template>
<script>
export default {
  name: "Info",
  data() {
    return {
      navbar: {
        background: {
          backgroundColor: "#ffffff",
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.navbar-icon {
  position: relative;
}
// nag
.info {
  background-color: $white-color;
  .info-row {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 25rpx;
    @include line(100rpx);

    .icon-col {
      position: relative;
      margin-right: 20rpx;
      width: 70rpx;
      // background-color: lightcoral;
    }
    .text-col {
      flex: auto;
      line-height: initial;
    }
    .text-col-title {
      display: flex;
      flex-direction: row;
    }
  }
  .info-icon {
    margin-top: 10rpx;
    padding: 10rpx;
    border-radius: 50%;
    background-color: #5782f5;
  }
  .info-name {
    flex: auto;
  }
  .info-time {
    width: 120rpx;
    font-size: $font-20;
    color: $font-light-gray;
  }
  .info-text {
    margin-top: 10rpx;
    width: 610rpx;
    font-size: $font-24;
    color: $font-light-gray;
  }
}
</style>
	

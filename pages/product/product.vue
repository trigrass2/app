<template>
  <view class="pro">
    <drawer :show="visible" :navData="meauList" @close="close" @getItem="getItem"></drawer>
    <view class="farm-title">
      <text class="title">{{currentItem.wsName}}</text>
      <!-- #ifdef MP-WEIXIN -->
      <text class="iconfont icon-caidan1" @tap="open"></text>
      <!-- #endif -->
    </view>
    <!-- 抽屉菜单 -->
    <view>
      <view class="pro-item" v-for="item in productList" :key="item.orderNo">
        <view class="pro-hd">
          <view class="hd-name">{{item.lineName}}</view>
          <view class="hd-percent">
            <progress
              active
              duration="5"
              font-size="12"
              activeColor="#3890d8"
              backgroundColor="#ddd"
              stroke-width="3"
              border-radius="5"
              :percent="item.percent"
            />
          </view>
          <view class="hd-state">{{getState(item.percent)}}{{item.percent}}%</view>
        </view>
        <!-- /hd -->
        <view @tap="accordion(item)" :class="[{actvie:item.isDisplay},'pro-name',]">
          <!-- pro-actvie -->
          <text class="name">{{item.orderNo}}</text>
          <text :class="['iconfont',item.isDisplay?'icon-arrow-drown':'icon-arrow-up']"></text>
        </view>
        <view class="pro-info-box">
          <!-- /产品编号 -->
          <view class="pro-info">
            <view class="info ellipsis md-10">
              <!-- <text class="info-name">产&ensp;&ensp;&ensp;&ensp;品：</text> -->
              <text class="info-name-text">{{item.productName}}</text>
            </view>
            <view class="info-row">
              <view class="info-col">
                <text class="info-name">完&ensp;成&ensp;数：</text>
                <text class="info-text">{{item.cpltQty}}</text>
              </view>
              <view class="info-col">
                <text class="info-name">计&ensp;划&ensp;数：</text>
                <text class="info-text">{{item.qty}}</text>
              </view>
            </view>
            <view class="info-row">
              <view class="info-col">
                <text class="info-name">良&ensp;&ensp;&ensp;&ensp;率：</text>
                <text class="info-text">{{item.yield}}%</text>
              </view>
              <view class="info-col">
                <text class="info-name">备&ensp;&ensp;&ensp;&ensp;料：</text>
                <text class="info-text">0%</text>
              </view>
            </view>
          </view>
          <!-- /产品信息 -->
          <view class="pro-info" v-show="item.isDisplay">
            <view class="info-row">
              <view class="info-col">
                <text class="info-name">客&ensp;&ensp;&ensp;&ensp;户：</text>
                <text>{{item.customer}}</text>
              </view>
              <view class="info-col">
                <text class="info-name">版&ensp;&ensp;&ensp;&ensp;本：</text>
                <text>{{item.bomVersion}}</text>
              </view>
            </view>
			<view class="pro-line">	
			</view>
            <view class="info">
              <text class="info-name">工&ensp;&ensp;&ensp;&ensp;艺：</text>
              <text>{{item.flowName}}</text>
            </view>
            <view class="info">
              <text class="info-name">备&ensp;&ensp;&ensp;&ensp;注：</text>
              <text>{{item.remarks}}</text>
            </view>
            <view class="info">
              <text class="info-name">计划时间：</text>
              <text class="info-time">{{$formatdate(item.plannedTime)}}</text>
            </view>
          </view>
          <!-- /产品信息展开收起 -->
        </view>
      </view>
      <!-- 循环 -->
    </view>
    <view class="none" v-if="!productList.length">暂无数据</view>
  </view>
</template>

<script>
import drawer from "@/components/drawer.vue";
export default {
  components: {
    drawer
  },
  data() {
    return {
      visible: false,
      meauList: [],
      currentItem: {},
      productList: []
    };
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

      this.getMeauData()
        .then(res => {
          uni.hideLoading();
          this.meauList = res;
          if (res.length) {
            this.currentItem = res[0];
            this.getProduct();
          }
        })
        .catch(error => {
          uni.hideLoading();
        });
    },
    //获取数据
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
    getProduct() {
      this.$http
        .request({
          url: "/api/ProduceReport/wsCodeProduct",
          method: "GET",
          data: {
            wsCode: this.currentItem.wsCode
          }
        })
        .then(({ productList }) => {
          uni.hideLoading();
          this.setProduct(productList);
        })
        .catch(() => {
          uni.hideLoading();
        });
    },
    // 处理数据
    setProduct(productList) {
      this.productList = productList.map((product, i) => {
        if (product && i === 0) {
          product.isDisplay = true;
        }

        if (product) {
          // 良率
          let total = product.cpltQty + product.failQty;
          let yieldNum = product.cpltQty / total;
          product.yield = total === 0 ? 100 : Math.round(yieldNum * 100);

          // nameline百分比
          let percentNum = product.cpltQty / product.qty;
          product.percent = Math.round(percentNum * 100);

          return product;
        }
      });
    },
    // 重置数据
    getState(val) {
      return val === 0 ? "未生产" : val === 100 ? "已完成" : "生产中";
    },
    //抽屉菜单操作
    open() {
      this.visible = !this.visible;
    },
    //回调函数抽屉关闭
    close(val) {
      this.visible = val;
    },
    // 抽屉点击函数
    getItem(val) {
      this.currentItem = val;
      this.visible = false;
      uni.showLoading({
        title: "加载中",
        mask: true
      });
      this.getProduct();
    },
    // 手风琴展开收齐
    accordion(item) {
      this.$set(item, "isDisplay", !item.isDisplay);
    }
  }
};
</script>

<style lang="scss" scoped>
.md-10 {
  padding-bottom: 10upx;
}
.pro-line{
	margin: 15upx 0;
	height: 0;
	border-top:1px solid $line-color;
}
.pro-item {
  margin-bottom: 20upx;
  padding-bottom: 10upx;
  background: $white-color;

  .pro-hd {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 30upx;
    height: 75upx;
    // border-bottom: 1px solid $line-color;
    .hd-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 40upx;
      max-width: 200upx;
      color: $font-bule;
    }
    .hd-percent {
      flex: 1;
    }
    .hd-state {
      margin-left: 10upx;
      font-size: 24upx;
      color: $font-light-gray;
    }
  }

  /*生产编号*/
  .pro-name {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    // margin-bottom: 10upx;
    padding: 0 30upx;
    height: 65upx;
    font-size:$font-30;
    border-top: 1px solid $line-color;
    //   background: #eaf2f8;

    .name {
      flex: 1;
      color: $font-dark-green;
	  font-weight: bold;  
      @extend .ellipsis;
    }

    .iconfont {
      font-size: $font-26;
      color: $font-light-gray;
    }
  }

  .actvie {
    margin-bottom: 20upx;
	
    background: #a0ccf0;
    .name,
    .iconfont {
      color: $white-color;
    }
  }
}
.pro-info-box {
  padding-bottom: 20upx;
}
/*生产信息*/
.pro-info {
  margin: 0 30upx;
  line-height: 1.5;
  color: $font-bule;

  .info-name {
    padding-right: 10upx;
    color: $font-gray;
  }

  .info-name-text {
    color: $font-title-color;
  }

  .info-text {
    color: $font-bule;
    text-decoration: underline;
  }

  .info-time {
    color: $font-orange;
  }

  .info-row {
    display: flex;
    flex-direction: row;

    .info-col {
      flex: 1;
    }
  }
}
</style>

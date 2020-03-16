<template>
  <view>
    <ly-tree-drawer 
	class="tree"
	:show="showTree" 
	@close="close" 
	@confirm="confirm">
	</ly-tree-drawer>
    <!-- 列表 -->
    <view class="list">
      <view class="farm-title">
        <text class="title">
			<text class="iconfont icon-list"></text>
			类型列表
			</text>
        <text class="iconfont icon-caidan1" @tap="handleShowTree"></text>
      </view>
      <view class="list-item" @tap="skip()">
        <view class="list-left">
          <view class="row">
            <view class="col-name">名称：</view>
            <view class="col-text">化妆品机器设备</view>
          </view>
          <view class="row">
            <view class="col-name">编号：</view>
            <view class="col-text">GBT 15834-2011 8</view>
          </view>
          <view class="row">
            <view class="col-name">效率：</view>
            <view class="col-text">
              <progress
                active
                show-info
                percent="80"
                activeColor="#00cc66"
                font-size="14"
                stroke-width="4"
                border-radius="3"
                duration="10"
                class="progress"
              />
            </view>
          </view>
        </view>
        <view class="list-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      <!-- 1 -->
    </view>
  </view>
</template>

<script>
import LyTreeDrawer from "../component/ly-tree-drawer.vue";
export default {
  components: {
    LyTreeDrawer
  },
  data() {
    return {
      showTree: false,
      selectedData: {}
    };
  },
  methods: {
	  // tree
    handleShowTree() {
      this.showTree = !this.showTree;
    },
    close() {
      this.showTree = false;
    },
    confirm(data) {
      this.selectedData = data;
      this.showTree = false;
    },
	skip(){
		uni.navigateTo({
			url:'/pages/analyse/analyseDetail'
		});
	}
  }
};
</script>
<style lang="scss" scoped>
// 列表
.list {
  font-size: 26upx;
  .list-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 30upx;
    background-color: $white-color;
    border-bottom: 1px solid $line-dark-color;

    &:nth-child(even) {
      background: $bj-gray;
    }

    .list-left {
      flex: 1;
    }

    .list-right {
      padding-left: 100upx;

      .iconfont {
        color: $font-light-gray;
      }
    }

    .row {
      display: flex;

      .col-name {
        color: $font-light-gray;
      }

      .col-text {
        flex: 1;
      }
    }
  }
}

.progress {
  color: $font-light-gray;
}

.tree {
  /deep/.ly-tree--highlight-current
    .ly-tree-node.is-current
    > .ly-tree-node__content {
    .ly-iconfont {
      color: $white-color;
    }
    color: $white-color;
    background-color:$bj-current-blue;
  }
}
.farm-title{
	background:$white-color;
	.title{
		text-align: left;
		color:$blue-color;
		.iconfont { 
			padding-right: 10upx;
			color:$blue-color;
			}
		}
}
</style>

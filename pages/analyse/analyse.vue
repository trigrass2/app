<template>
  <view>
    <ly-tree-drawer
      class="tree"
      :show="showTree"
      :treeData="treeList"
      @close="close"
      @confirm="confirm"
    ></ly-tree-drawer>
    <!-- 列表 -->
    <view class="list">
      <headTitle :icon="iconList" :iconTap="iconTap" class="title">
		  <text class="iconfont icon-list"/>
		  {{selectedData.label||'设备'}}列表
	  </headTitle>
      <view class="list-item" v-for="machine of MachineList" :key="machine.id" @tap="skip()">
        <view class="list-left">
          <view class="row">
            <view class="col-name">名称：</view>
            <view class="col-text">{{machine.machineName}}</view>
          </view>
          <view class="row">
            <view class="col-name">编号：</view>
            <view class="col-text">{{machine.machineCode}}</view>
          </view>
          <!-- 					
		  <view class="row">
				<view class="col-name">效率：</view>
				<view class="col-text">
					<progress show-info percent="80" activeColor="#00cc66" font-size="14" stroke-width="4" border-radius="3" class="progress" />
				</view>
          </view>
		  -->
        </view>
        <view class="list-right">
          <text class="iconfont icon-arrow-right"/>
        </view>
      </view>
      <view class="none" v-if="!MachineList.length">暂无数据</view>
    </view>
  </view>
</template>
<!-- /BMachineModel/Tree -->
<script>
import LyTreeDrawer from "../component/ly-tree-drawer.vue";
export default {
  components: {
    LyTreeDrawer
  },
  data() {
    return {
      showTree: false,
      selectedData: {},
      i: 0,
      treeList: [],
      MachineList: [],
      iconList: ["icon-menu"]
    };
  },
  onNavigationBarButtonTap(e) {
  	if (e.index === 0) {
  		 this.handleShowTree();
  	}
 
  },
  onLoad() {
    this.getTree();
  },
  methods: {
    getTree() {
      this.$http
        .request({
          url: "/api/BMachineModel/Tree",
          method: "GET"
        })
        .then(res => {
          this.treeList = this.formatTree(res);
        });
    },
    getMachine() {
      uni.showLoading({
        title: "加载中",
        mask: true
      });
      this.$http
        .request({
          url: "/api/BMachine",
          method: "GET",
          data: {
            modelCode: this.selectedData.label
          }
        })
        .then(res => {
          uni.hideLoading();
          this.MachineList = res;
        })
        .catch(() => {
          uni.hideLoading();
        });
    },
    // tree
    handleShowTree() {
      this.showTree = !this.showTree;
    },
    close() {
      this.showTree = false;
    },
    confirm(data) {
      const {
        id,
        label,
        data: { children }
      } = data;
      this.showTree = false;

      if (!children) {
        this.selectedData = { id, label };
        this.getMachine();
      }
    },
    skip() {
      uni.navigateTo({
        url: "/pages/analyse/analyseDetail?name=化妆品机器设备"
      });
    },
    formatTree(treeData) {
      return treeData.map(treeItem => {
        let j = this.i++;
        let { typeName, kindName, modelCode, children } = treeItem;
        const label = typeName || kindName || modelCode;

        if (children && children.length) children = this.formatTree(children);

        if (children) {
          return { id: j, label, children };
        } else {
          return { id: j, label };
        }
      });
    },
    iconTap(type) {
      const _this = this.$parent;
      switch (type) {
        case "icon-menu":
          _this.handleShowTree();
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// 列表
.list {
  font-size: $font-28;
  background-color: $white-color;
  .list-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 30upx;	
    border-bottom: 1px solid $line-dark-color;
    &:nth-child(even) {
      background-color: $bj-gray;
    }

    &:active {
      background-color: $hover-color;
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
    background-color:$blue-color;
  }
}
.title{
	 /deep/ .title{
		color: $blue-color; 
	 }
	  .iconfont {
	    padding-right: 10upx;
	    color: $blue-color;
		font-size: 36upx;
	  }
	
}
</style>

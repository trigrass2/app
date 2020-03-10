<template>
  <view>
    <!-- 树菜单 -->
    <view class="tree">
      <view class="title">
        <view class="name">
          <text class="iconfont icon-type"></text>
          <text>类型选择</text>
        </view>
        <switch class="switch" @change="switch1Change" />
      </view>
      <ly-tree
	    ref="tree"
	    node-key="personId"
        highlightCurrent="true"
        :tree-data="treeData"
        :props="props"
		:defaultExpandAll="isExpand"
        @node-expand="handleNodeExpand"
        @node-click="handleNodeClick"
      ></ly-tree>
    </view>
    <!-- 列表 -->
    <view class="list">
      <view class="title">
        <view class="name">
          <text class="iconfont icon-list"></text>
          <text>类型列表</text>
        </view>
      </view>
      <view class="list-item">
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
      <view class="list-item">
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
      <view class="list-item">
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
      <view class="list-item">
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
    </view>
  </view>
</template>

<script>
import LyTree from "@/components/ly-tree/ly-tree.vue";
export default {
  components: {
    LyTree
  },
  data() {
    return {
      ready: false,
      props: {
        label: "personName", // 指把数据中的‘personName’当做label也就是节点名称
        children: "childs" // 指把数据中的‘childs’当做children当做子节点数据
      },
      treeData: [
        {
          personId: 1,
          personName: "一级 1",
          childs: [
            {
              personId: 11,
              personName: "二级 1-1",
              childs: [
                {
                  personId: 111,
                  personName: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          personId: 2,
          personName: "一级 2",
          childs: [
            {
              personId: 21,
              personName: "二级 2-1",
              childs: [
                {
                  personId: 211,
                  personName: "三级 2-1-1"
                }
              ]
            },
            {
              personId: 22,
              personName: "二级 2-2",
              childs: [
                {
                  personId: 221,
                  personName: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          personId: 3,
          personName: "一级 3",
          childs: [
            {
              personId: 31,
              personName: "二级 3-1",
              childs: [
                {
                  personId: 311,
                  personName: "三级 3-1-1"
                }
              ]
            },
            {
              personId: 32,
              personName: "二级 3-2",
              childs: [
                {
                  personId: 321,
                  personName: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
	  isExpand:false
    };
  },
  methods: {
    switch1Change: function() {
	  this.isExpand=!this.isExpand
	
    },
    // uni-app中emit触发的方法只能接受一个参数，所以会回传一个对象，打印对象即可见到其中的内容
    handleNodeClick(obj) {
      console.log("handleNodeClick", JSON.stringify(obj));
    },
    handleNodeExpand(obj) {
      console.log("handleNodeExpand", JSON.stringify(obj));
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: row;
  padding: 10upx 30upx;
  font-size: 32upx;
  background-color: $white-color;

  .name {
    flex: 1;
    color: $blue-color;

    .iconfont {
      padding-right: 10upx;
    }
  }

  .switch {
    transform: scale(0.7);
  }
}

.tree {
  /deep/.ly-tree-node__content {
    margin-bottom: 10upx;

    &:first-child {
      border: 1px solid $line-dark-color;
    }
  }
  /deep/.ly-tree-node__children {
    .ly-tree-node__content {
      border: 0;
    }
  }

  /deep/.ly-tree--highlight-current
    .ly-tree-node.is-current
    > .ly-tree-node__content {
    .ly-iconfont {
      color: $white-color;
    }
    color: $white-color;
    background-color: #7ab5e5;
	border: 0;
  }
}

// 列表
.list {
  margin-top: 20upx;
  font-size: 26upx;
  .list-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 30upx;
    background-color: $white-color;
    border-bottom: 1px solid $line-dark-color;

    &:nth-child(odd) {
      background: #fdfdfd;
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
</style>

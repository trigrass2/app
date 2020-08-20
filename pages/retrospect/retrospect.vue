<template>
  <view>
    <u-navbar :is-back="true" :background="navbar.background">
      <view class="navbar-title">工艺追溯</view>
    </u-navbar>
    <!-- nav -->
    <view class="u-page">
      <u-tabs
        name="label"
        height="65"
        bar-width="180"
        bar-height="5"
        active-color="#2979ff"
        inactive-color="#606266"
        font-size="28"
        :list="tabsList"
        :is-scroll="false"
        :current="tabsCurrent"
        @change="tabsChange"
      />
      <!-- tabs -->
      <view class="tabs-content">
        <u-form label-width="130" v-show="ative==='Product'">
          <u-form-item label="工单">
            <u-input v-model="fabric.orderNo" placeholder="请输入工单" :clearable="false" />
          </u-form-item>
          <u-form-item label="产品批次" placeholder="请输入产品批次">
            <u-input v-model="fabric.sfc" :clearable="false" />
          </u-form-item>
          <u-form-item label="时间">
            <u-row>
              <u-col span="5">
                <u-input
                  v-model="fabric.startDay"
                  placeholder="输入开始时间"
                  :clearable="false"
				  @click="this.timeVisible=!this.timeVisible"
                />
              </u-col>
              <u-col span="2">至</u-col>
              <u-col span="5">
                <u-input
                  v-model="fabric.endDay"
                  placeholder="输入结束时间"
                  :clearable="false"
				   @click="this.timeVisible=!this.timeVisible"
                />
              </u-col>
            </u-row>
          </u-form-item>
        </u-form>
        <!-- 产品追溯 -->
        <u-form label-width="130" v-show="ative==='Material'">
          <u-form-item label="工单">
            <u-input v-model="matCodes.matCode" :clearable="false" placeholder="请输入工单" />
          </u-form-item>
          <u-form-item label="产品批次">
            <u-input v-model="matCodes.matSfc" :clearable="false" placeholder="请输入产品批次"/>
          </u-form-item>
        </u-form>
        <!-- 物料 -->
        <view class="btn">
          <u-row gutter="20">
            <u-col span="6">
              <u-button size="medium" @click="clear">清空</u-button>
            </u-col>
            <u-col span="6">
              <u-button type="primary" size="medium" @click="search">查询</u-button>
            </u-col>
          </u-row>
        </view>
      </view>
      <!-- tabs内容 -->
      <view class="reviewTree">
        <reviewTree
          ref="tree"
          :product-map="productDict"
          :material-map="materialDict"
          :process-map="processDict"
          :step-map="stepDict"
          :emp-map="empDict"
          @materialData="getMaterial"
        />
      </view>
    </view>
    <u-calendar v-model="timeVisible" mode="medium" max-date="2050-12-31" @change="timeChange" />
    <!--page-->
    <u-tabbar
      v-model="nav.current"
      :list="nav.list"
      :mid-button="nav.isMid"
      :active-color="nav.activeColor"
    />
  </view>
</template>
<script>
import { mapState } from "vuex";
import reviewTree from "./component/reviewTree.vue";
export default {
  name: "Retrospect",
  components: {
    reviewTree,
  },
  data() {
    return {
      navbar: {
        background: {
          backgroundColor: "#ffffff",
        },
      },
      //数据字典
      productDict: {},
      materialDict: {},
      processDict: {},
      stepDict: {},
      empDict: {},
      tabsList: [
        {
          label: "以产品追溯",
          value: "Product",
        },
        {
          label: "以物料追溯",
          value: "Material",
        },
      ],
      tabsCurrent: 0,
      ative: "Product",
      //tabs的input
      fabric: {
        orderNo: "HP-20200305-70KW",
        sfc: "",
        startDay: "",
        endDay: "",
      },
      matCodes: {
        matCode: "",
        matSfc: "",
      },
      //日期
      timeVisible: false,
    };
  },
  computed: {
    ...mapState(["nav"]),
    form() {
      const isMaterial = this.ative !== "Product";
      if (isMaterial) {
        return {
          isMaterial,
          ...this.matCodes,
        };
      }
      return {
        isMaterial,
        ...this.fabric,
      };
    },
  },
  onLoad() {
    this.getFetchDicts();
  },
  methods: {
    tabsChange(index) {
      this.tabsCurrent = index;
      this.ative = this.tabsList[index].value;
    },
    timeChange(e) {
      const { startDate, endDate } = e;
      this.fabric.startDay = startDate;
      this.fabric.endDay = endDate;
    },
    //搜索
    clear() {
      let form = this.ative === "Product" ? this.fabric : this.matCodes;
      Object.keys(form).forEach(function (key) {
        form[key] = "";
      });
    },
    search() {
      this.$refs.tree.fetchData(this.form);
    },
    // 获取数字字典
    getFetchDicts() {
      this.$http
        .request({
          url: "/api/Dictionary",
          method: "GET",
          data: {
            keys: "BProduct|BMaterial|BProcessList|BProcessStep|SEmployee",
          },
        })
        .then((res) => {
          this.productDict = res.BProduct;
          this.materialDict = res.BMaterial;
          this.processDict = res.BProcessList;
          this.stepDict = res.BProcessStep;
          this.empDict = res.SEmployee;
        });
    },
    // 获取物料的数据
    getMaterial(val) {
      this.ative = val.isMaterial ? "Material" : "Product";
      for (let key in this.matCodes) {
        this.matCodes[key] = val[key];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tabs-content {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: $white-color;
  .btn {
    margin-top: 20rpx;
    /deep/.u-btn {
      width: 100%;
      padding: 0;
    }
  }
}
.reviewTree {
  overflow: hidden;
  margin: 20upx 0;
  background-color: $white-color;
}
</style>
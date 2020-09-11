<template>
  <view>
    <u-navbar :is-back="navbar.isBack" :background="navbar.background">
      <view class="navbar-title">{{title}}</view>
    </u-navbar>
    <!-- nav -->
    <view class="search">
      <u-section title="搜索">
        <view slot="right" @click="searchVisible = !searchVisible">
          <u-icon :name="searchVisible?'arrow-down-fill':'arrow-up-fill'" size="22" color="#ccc" />
        </view>
      </u-section>
      <view v-show="searchVisible">
        <u-form label-width="130" :model="form" ref="uForm">
          <u-form-item label="开始时间" prop="startTime">
            <u-input v-model="form.startTime" @click="handlePickerType('start')" />
          </u-form-item>
          <u-form-item label="结束时间" prop="endTime">
            <u-input v-model="form.endTime" @click="handlePickerType('end')" />
          </u-form-item>
        </u-form>
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
    </view>
    <!-- 搜索 -->
    <view class="mix">
      <view class="mix-title">
        <u-section title="占比图" :right="false" />
      </view>
      <view class="mix-content">
        <!-- #ifdef APP-PLUS || H5 -->
        <view
          id="echarts"
          class="echarts"
          @tap="echarts.onClick"
          :prop="option"
          :change:prop="echarts.updateEcharts"
        />
        <!-- #endif -->
        <!-- #ifndef APP-PLUS || H5 -->
        <view>非 APP、H5 环境不支持</view>
        <!-- #endif -->
      </view>
    </view>
    <!-- 占比 -->
    <view class="device">
      <view class="device-title">
        <u-section title="设备效率饼图" :right="false" />
      </view>
      <canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie" />
      <view class="device-info">
        <u-table>
          <u-tr>
            <u-th>干扰类型</u-th>
            <u-th>严重性</u-th>
            <u-th>状态</u-th>
            <u-th>延误时间</u-th>
          </u-tr>
          <u-tr>
            <u-td>不良</u-td>
            <u-td>良</u-td>
            <u-td>打开</u-td>
            <u-td>203</u-td>
          </u-tr>
          <u-tr>
            <u-td>不良</u-td>
            <u-td>不良</u-td>
            <u-td>关闭</u-td>
            <u-td>403</u-td>
          </u-tr>
          <u-tr>
            <u-td>优秀</u-td>
            <u-td>不良</u-td>
            <u-td>打开</u-td>
            <u-td>203</u-td>
          </u-tr>
        </u-table>
      </view>
    </view>
    <!-- 饼图，列表 -->
    <view class="formula">
      <view class="formula-title">
        <u-section title="计算公式" :right="false" />
      </view>
      <view class="formula-list">
        <view class="formula-item">
          <view class="formula-name">时间稼动率（辉动时间/负荷时间）：</view>
          <view class="formula-text">360分/420分x100%=94%</view>
        </view>
        <view class="formula-item">
          <view class="formula-name">性能稼动率（理论节拍x生产数量/稼动时间）：</view>
          <view class="formula-text">2分x 170个/360分x100%=94%</view>
        </view>
        <view class="formula-item">
          <view class="formula-name">良品率（良品量/生产量）：</view>
          <view class="formula-text">165个/170个x100%=97%</view>
        </view>
        <view class="formula-item">
          <view class="formula-name">设备综合效率=时间稼动率x性能稼动率x良品率：</view>
          <view class="formula-text">0.86x0.94x0.97x100%=78%</view>
        </view>
      </view>
    </view>
    <!-- 公式 -->
    <u-picker
      v-model="picker.visible"
      mode="time"
      :params="picker.params"
      @confirm="pickerConfirm"
    />
    <!-- time -->
  </view>
</template>

<script>
import uCharts from "@/components/uni/u-charts/u-charts";

var _self;
var canvaPie = null;

export default {
  data() {
    return {
      // nav
      navbar: {
        background: {
          backgroundColor: "#ffffff",
        },
        isBack: true,
      },
      title: "",
      picker: {
        visible: false,
        params: {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          second: true,
        },
      },
      pickerType: "start",
      form: {
        startTime: "",
        endTime: "",
      },
      rules: {
        startTime: {
          required: true,
          message: "不能为空",
        },
        endTime: {
          required: true,
          message: "不能为空",
        },
      },
      searchVisible: true,
      // ---------------------------------------------
      // 饼图
      cWidth: "",
      cHeight: "",
      pixelRatio: 1,
      serverData: "",
      piearr: [],
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["运行", "停机", "故障"],
        },
        grid: {
          top: "45%",
          left: "0",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          max: 660,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: ["周一"],
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            name: "运行",
            type: "bar",
            stack: "总量",
            barWidth: "100%",
            color: "#00cc66",
            data: [320],
          },
          {
            name: "停机",
            type: "bar",
            stack: "总量",
            data: [120],
          },
          {
            name: "故障",
            type: "bar",
            stack: "总量",

            data: [220],
          },
        ],
      },
    };
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  onLoad(option) {
    // 设置标题
    this.title = option.name ? option.name : "设备效率分析详情";

    // 初始化图标
    _self = this;
    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(500);
    this.getServerData();
  },
  methods: {
    pickerConfirm(params) {
      const { year, month, day, hour, minute, second } = params;
      const time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      if (this.pickerType === "start") {
        this.form.startTime = time;
      } else {
        this.form.endTime = time;
      }
    },
    handlePickerType(type) {
      this.pickerType = type;
      this.picker.visible = true;
    },
    clear() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
      });
      this.$refs.uForm.resetFields();
    },
    search() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          console.log("验证通过");
        } else {
          console.log("验证失败");
        }
      });
    },
    //---------------------------------------

    // 饼图
    getServerData() {
      let Pie = {
        series: [],
      };
      Pie.series = [
        {
          name: "一班",
          data: 50,
        },
        {
          name: "二班",
          data: 30,
        },
        {
          name: "三班",
          data: 20,
        },
        {
          name: "四班",
          data: 18,
        },
        {
          name: "五班",
          data: 8,
        },
      ];
      _self.showPie("canvasPie", Pie);
    },
    showPie(canvasId, chartData) {
      canvaPie = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: "pie",
        fontSize: 11,
        legend: {
          show: true,
          position: "right",
          float: "center",
          itemGap: 10,
          padding: 5,
          lineHeight: 26,
          margin: 5,
          borderWidth: 1,
        },
        background: "#FFFFFF",
        pixelRatio: _self.pixelRatio,
        series: chartData.series,
        animation: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        dataLabel: true,
        extra: {
          pie: {
            labelWidth: 15,
          },
        },
      });
      this.piearr = canvaPie.opts.series;
    },
    touchPie(e) {
      canvaPie.showToolTip(e, {
        format: function (item) {
          return item.name + ":" + item.data;
        },
      });
    },
    // echarts
    onViewClick(options) {
      console.log(options);
    },
  },
};
</script>
<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
.search {
  padding: 30rpx;
  background-color: $white-color;
  .btn {
    margin-top: 20rpx;
    /deep/.u-btn {
      width: 100%;
      padding: 0;
    }
  }
}
.mix {
  overflow: hidden;
  margin: 20upx 0;
  padding: 30rpx;
  background-color: $white-color;
  .mix-title {
    padding-bottom: 20rpx;
  }
  .mix-content {
    // overflow: hidden;
    font-size: $font-24;
    color: $font-light-gray;
  }
  .echarts {
    width: 690rpx;
    height: 130rpx;
  }
}
// 饼图
.sub-title {
  display: flex;
  flex-direction: row;
  padding: 20upx;
  line-height: 1;
  font-size: $font-36;
  color: $font-text-color;

  .icon {
    margin-right: 10upx;
    width: 10upx;
    height: 36upx;
    border-radius: 5upx;
    background-color: $blue-color;
  }
}

.analyse-title {
  display: flex;
  flex-direction: row;
  margin-right: 30upx;

  .sub-title {
    flex: 1;
  }

  .iconfont {
    padding-left: 15upx;
    color: $font-light-gray;
  }
}

.device {
  overflow: hidden;
  background: $white-color;
  .device-title {
    padding: 30rpx 30rpx 20rpx 30rpx;
  }
  .charts-pie {
    width: 750rpx;
    height: 500rpx;
  }
  .device-info {
    padding: 0 30rpx 30rpx 30rpx;
  }
}

// .box {
//   padding: 30upx;
//   background: $white-color;
// }

// .table {
//   border: 1px solid #b7d0ad;

//   .row {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     border-bottom: 1px solid $line-dark-color;

//     &:last-child {
//       border: 0;
//     }

//     .col {
//       flex: 1;
//       border-right: 1px solid $line-dark-color;
//       padding-left: 20upx;
//       line-height: 2.5;

//       &:last-child {
//         border: 0;
//       }
//     }
//   }

//   .table-head {
//     border-bottom: 1px solid #b7d0ad;

//     .col {
//       line-height: 1.8;
//       background-color: #e6f1c7;
//     }
//   }
// }

.formula {
  margin-top: 20upx;
  padding: 30upx;
  background: $white-color;
  .formula-title {
    padding-bottom: 20rpx;
  }
  .formula-list {
    .formula-item {
      position: relative;
      padding: 20upx;
      border-bottom: 1px solid $line-dark-color;

      &:nth-child(even) {
        background: $bj-gray;
      }

      .formula-name {
        margin-bottom: 15rpx;
        font-size: $font-24;
        color: $font-gray;
      }
    }
  }
}
</style>

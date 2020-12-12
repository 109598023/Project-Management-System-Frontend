<template>
  <v-chart ref="chart" autoresize :options="line"/>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      line: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'line',
          smooth: true,
          areaStyle: {}
        }]
      }
    }
  },
  methods: {
    resizeHandler () {
    },
    async getContributorsData () {
      await this.$api.view.contributors().then((r) => {
        this.line.xAxis.data = r.data.weeks
        this.line.series[0].data = r.data.total.commits
        this.$refs.chart.hideLoading()
      })
    }
  },
  mounted: function () {
    this.$refs.chart.showLoading()
    this.getContributorsData()
  }
}
</script>
<style scoped>
.echarts {
  width: 100%;
  height: 400px;
}
</style>

<template>
  <div class="d-flex flex-column flex-grow-1 w-100 h-100">
    <div class="" align="center">
      <b-img v-bind="mainProps" ref="img" rounded="0" ></b-img>
    </div>
    <v-chart class="flex-grow-1 w-100 h-100" :autoresize="true" :options="echartsOptions"/>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'

export default {
  name: 'ContributorArea',
  components: {
    'v-chart': ECharts
  },
  props: ['imgUrl', 'dataZoomStartValue', 'dataZoomEndValue', 'xAxisData', 'seriesData'],
  data () {
    return {
      mainProps: { blank: true, blankColor: '#777', width: 38, height: 38, class: 'm1' },
      personalData: {
        imgUrl: ''
      },
      echartsOptions: {
        dataZoom: [
          { type: 'slider', show: true, startValue: 0, endValue: 0 },
          { type: 'inside', startValue: 0, endValue: 0 }
        ],
        xAxis: { type: 'category', boundaryGap: false, data: [] },
        yAxis: { type: 'value' },
        series: [{ data: [], type: 'line', smooth: true, areaStyle: {} }]
      }
    }
  },
  mounted () {
    this.$refs['img'].src = this.imgUrl
    this.echartsOptions.xAxis.data = this.xAxisData
    this.echartsOptions.series[0].data = this.seriesData
    this.echartsOptions.dataZoom[0].endValue = this.dataZoomEndValue
    this.echartsOptions.dataZoom[1].endValue = this.dataZoomEndValue
  },
  watch: {
    seriesData: function () {
      console.log(this.seriesData)
      this.echartsOptions.series[0].data = this.seriesData
    },
    imgUrl: function () {
      this.$refs['img'].src = this.imgUrl
    }
  }
}
</script>
<style scoped>
</style>

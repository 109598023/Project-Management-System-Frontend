<template>
  <v-chart class="w-100" :autoresize="true" :options="echartsOptions"/>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/gauge'

export default {
  name: 'MeasuresGauge',
  components: {
    'v-chart': ECharts
  },
  props: ['seriesData'],
  data () {
    return {
      echartsOptions: {
        series: [{
          type: 'gauge',
          min: 1,
          max: 5,
          startAngle: 180,
          endAngle: 0,
          splitNumber: 4,
          radius: '90%',
          center: ['50%', '60%'],
          axisTick: {
            splitNumber: 1
          },
          axisLabel: {
            formatter: function (v) {
              switch (v + '') {
                case '1': return 'E'
                case '2': return 'D'
                case '3': return 'C'
                case '4': return 'B'
                case '5': return 'A'
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: [
                [0.125, '#d4333f'],
                [0.375, '#ed7d20'],
                [0.625, '#eabe06'],
                [0.875, '#b0d513'],
                [1, '#0a0']
              ]
            }
          },
          title: {
            offsetCenter: [0, '20%'],
            fontWeight: 'bold'
          },
          detail: {
            show: false,
            formatter: function (v) {
              switch (v + '') {
                case '1': return 'E'
                case '2': return 'D'
                case '3': return 'C'
                case '4': return 'B'
                case '5': return 'A'
              }
            },
            offsetCenter: [0, '40%']
          },
          data: []
        }]
      }
    }
  },
  created () {
    console.log(this.seriesData)
    this.echartsOptions.series[0].data = this.seriesData
  },
  watch: {
    seriesData: function () {
      console.log(this.seriesData)
      this.echartsOptions.series[0].data = this.seriesData
    }
  }
}
</script>

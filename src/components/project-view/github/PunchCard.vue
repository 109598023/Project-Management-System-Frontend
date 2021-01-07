<template>
  <b-container fluid class="h-100">
    <v-chart ref="chart" :autoresize="true" :options="echartsOptions" class="h-100 w-100"/>
  </b-container>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/singleAxis'
import 'echarts/lib/component/title'

export default {
  name: 'PunchCard',
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      echartsOptions: {
        tooltip: {
          position: 'top'
        },
        title: [],
        singleAxis: [],
        series: []
      }
    }
  },
  mounted () {
    var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
      '7a', '8a', '9a', '10a', '11a',
      '12p', '1p', '2p', '3p', '4p', '5p',
      '6p', '7p', '8p', '9p', '10p', '11p']
    var days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']
    days.forEach((day, idx) => {
      this.echartsOptions.title.push({
        textBaseline: 'middle',
        top: (idx + 0.5) * 100 / 7 + '%',
        text: day
      })
      this.echartsOptions.singleAxis.push({
        left: 150,
        type: 'category',
        boundaryGap: false,
        data: hours,
        top: (idx * 100 / 7 + 5) + '%',
        height: (100 / 7 - 10) + '%',
        axisLabel: {
          interval: 0
        }
      })
      this.echartsOptions.series.push({
        singleAxisIndex: idx,
        coordinateSystem: 'singleAxis',
        type: 'scatter',
        data: [],
        symbolSize: function (dataItem) {
          return dataItem[1] * 10
        }
      })
    })
    this.queryPunchCard()
  },
  methods: {
    async queryPunchCard () {
      this.echartsOptions.series.forEach((element) => {
        element.data.length = 0
      })
      this.$api.view.queryPunchCard({
        id: this.$route.params.id,
        repositoryId: this.$route.params.rid,
        username: this.$store.state.auth.username
      }).then((response) => {
        const data = response.data
        data.forEach((dataItem) => {
          this.echartsOptions.series[dataItem[0]].data.push([dataItem[1], dataItem[2]])
        })
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.queryPunchCard()
    }
  }
}
</script>
<style scoped>
</style>

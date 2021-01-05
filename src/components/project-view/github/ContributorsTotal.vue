<template>
  <div class="d-flex flex-column" style="height: 100%; width:100%">
    <div class="d-flex">
      <b-form-datepicker
        id="datepicker-start"
        :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="datepickerStartValue"
        locale="en"
      ></b-form-datepicker>
      <b-form-datepicker
        id="datepicker-end"
        :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="datepickerEndValue"
        locale="en"
      ></b-form-datepicker>
    </div>
    <div class="flex-grow-1" style="height: 100%; width:100%">
      <v-chart ref="chart" :autoresize="true" :options="line" style="height: 100%; width:100%"/>
    </div>
  </div>
</template>
<script>

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

export default {
  name: 'ContributorsTotal',
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      datepickerMin: '',
      datepickerMax: '',
      datepickerStartValue: '',
      datepickerEndValue: '',
      data: {},
      line: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['code base', 'additions', 'deletions', 'commits']
        },
        dataZoom: [{
          type: 'slider',
          show: true,
          startValue: 0,
          endValue: 0
        }, {
          type: 'inside',
        }],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
    }
  },
  methods: {
    async getContributorsData (id) {
      this.$api.view.contributorsTotal({
        id: this.$route.params.id,
        repositoryId: this.$route.params.rid,
        username: this.$store.state.auth.username
      }).then((r) => {
        this.data = r.data
        const weeks = this.data.weeks
        const additions = this.data.additions
        const deletions = this.data.deletions
        const commits = this.data.commits
        const codeBase = []
        this.line.series.length = 0
        codeBase.push(additions[0] - deletions[0])
        for (let i = 1, length = additions.length; i < length; i++) {
          codeBase.push(codeBase[i - 1] + additions[i] - deletions[i])
        }
        this.line.xAxis.data = weeks
        this.line.series.push({
          name: 'commits',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: commits
        })
        this.line.series.push({
          name: 'additions',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: additions
        })
        this.line.series.push({
          name: 'deletions',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: deletions
        })
        this.line.series.push({
          name: 'code base',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: codeBase
        })

        this.line.dataZoom[0].endValue = weeks.length - 1
        this.$refs.chart.hideLoading()
        this.setMaxAndMinDate(weeks)
      })
    },
    setMaxAndMinDate (weeks) {
      this.datepickerMin = new Date(weeks[0])
      this.datepickerStartValue = new Date(weeks[0])
      this.datepickerMax = new Date(weeks[weeks.length - 1])
      this.datepickerEndValue = new Date(weeks[weeks.length - 1])
    },
    dateFormat (dateValue) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      const dateFormat = new Intl.DateTimeFormat('en-US', options).format
      const date = new Date(dateValue)

      if (date.getDay() !== 0) {
        date.setDate(date.getDate() + (7 - date.getDay()))
      }
      return dateFormat(date)
    }
  },
  mounted: function () {
    this.$refs.chart.showLoading()
    this.getContributorsData()
  },
  watch: {
    datepickerStartValue: function () {
      const weeks = this.data.weeks
      const index = weeks.indexOf(this.dateFormat(this.datepickerStartValue))
      this.line.dataZoom[0].startValue = index
    },
    datepickerEndValue: function () {
      const weeks = this.data.weeks
      const index = weeks.indexOf(this.dateFormat(this.datepickerEndValue))
      this.line.dataZoom[0].endValue = index
    },
    '$route' (to, from) {
      this.getContributorsData()
    }
  }
}
</script>

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
      <b-form-select v-model="selected" :options="options"></b-form-select>
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
      selected: 'commits',
      options: [
        { value: 'additions', text: 'additions' },
        { value: 'deletions', text: 'deletions' },
        { value: 'commits', text: 'commits' }
      ],
      data: {},
      line: {
        dataZoom: [{
          type: 'slider',
          show: true,
          startValue: 0,
          endValue: 0
        }, {
          type: 'inside',
          startValue: 0,
          endValue: 0
        }],
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
    async getContributorsData (id) {
      this.$api.view.contributorsTotal({'a': ''}).then((r) => {
        const data = r.data
        this.data = data
        this.line.xAxis.data = data.weeks
        this.changeEChartsData('commits')
        this.line.dataZoom[0].endValue = data.weeks.length - 1
        this.line.dataZoom[1].endValue = data.weeks.length - 1
        this.$refs.chart.hideLoading()
        this.setMaxAndMinDate(data.weeks)
      })
    },
    changeEChartsData (name) {
      if (name === 'additions') {
        this.line.series[0].data = this.data.additions
      } else if (name === 'deletions') {
        this.line.series[0].data = this.data.deletions
      } else if (name === 'commits') {
        this.line.series[0].data = this.data.commits
      }
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
    console.log(this.$route.params)
    this.$refs.chart.showLoading()
    this.getContributorsData()
  },
  watch: {
    selected: function () {
      this.changeEChartsData(this.selected)
    },
    datepickerStartValue: function () {
      const weeks = this.data.weeks
      const index = weeks.indexOf(this.dateFormat(this.datepickerStartValue))
      this.line.dataZoom[0].startValue = index
      this.line.dataZoom[1].startValue = index
    },
    datepickerEndValue: function () {
      const weeks = this.data.weeks
      const index = weeks.indexOf(this.dateFormat(this.datepickerEndValue))
      this.line.dataZoom[0].endValue = index
      this.line.dataZoom[1].endValue = index
    }
  }
}
</script>

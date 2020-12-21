<template>
  <div class="d-flex flex-column h-100">
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
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex flex-grow-1 w-100 h-100">
        <div class="d-flex flex-column flex-grow-1 w-100 h-100">
          <div class="">
            <b-img v-bind="mainProps" ref="img1" rounded="0" ></b-img>
            <span ref="name1"></span>
            <span ref="commit-size-1"></span>
            <span ref="additions-size-1"></span>
            <span ref="deletions-size-1"></span>
          </div>
          <v-chart class="flex-grow-1 w-100 h-100" ref="chart1" :autoresize="true" :options="line1"/>
        </div>
        <div class="d-flex flex-column flex-grow-1 w-100 h-100">
          <div class="">
            <b-img v-bind="mainProps" ref="img2" rounded="0"></b-img>
            <span ref="name2"></span>
            <span ref="commit-size-2"></span>
            <span ref="additions-size-2"></span>
            <span ref="deletions-size-2"></span>
          </div>
          <v-chart class="flex-grow-1 w-100 h-100" ref="chart2" :autoresize="true" :options="line2"/>
        </div>
      </div>
      <div class="d-flex flex-grow-1 h-100">
        <div class="d-flex flex-column flex-grow-1 w-100 h-100">
          <div class="">
            <b-img v-bind="mainProps" ref="img3" rounded="0"></b-img>
            <span ref="name3"></span>
            <span ref="commit-size-3"></span>
            <span ref="additions-size-3"></span>
            <span ref="deletions-size-3"></span>
          </div>
          <v-chart class="flex-grow-1 w-100 h-100" ref="chart3" :autoresize="true" :options="line3"/>
        </div>
        <div class="d-flex flex-column flex-grow-1 w-100 h-100">
          <div class="">
            <b-img v-bind="mainProps" ref="img4" rounded="0"></b-img>
            <span ref="name4"></span>
            <span ref="commit-size-4"></span>
            <span ref="additions-size-4"></span>
            <span ref="deletions-size-4"></span>
          </div>
          <v-chart class="flex-grow-1 w-100 h-100" ref="chart4" :autoresize="true" :options="line4"/>
        </div>
      </div>
    </div>
    <div class="center">
      <b-pagination-nav
        v-model="currentPage"
        :number-of-pages="pages"
        base-url="#"
        first-number
        last-number
        align="center"
      ></b-pagination-nav>
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
      pages: 1,
      currentPage: 1,
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
      mainProps: { blank: true, blankColor: '#777', width: 38, height: 38, class: 'm1' },
      contributorsDatas: {},
      contributorsEmptyData: [],
      line1: {
        dataZoom: [
          { type: 'slider', show: true, startValue: 0, endValue: 0 },
          { type: 'inside', startValue: 0, endValue: 0 }
        ],
        xAxis: { type: 'category', boundaryGap: false, data: [] },
        yAxis: { type: 'value' },
        series: [{ data: [], type: 'line', smooth: true, areaStyle: {} }]
      },
      line2: {
        dataZoom: [
          { type: 'slider', show: true, startValue: 0, endValue: 0 },
          { type: 'inside', startValue: 0, endValue: 0 }
        ],
        xAxis: { type: 'category', boundaryGap: false, data: [] },
        yAxis: { type: 'value' },
        series: [{ data: [], type: 'line', smooth: true, areaStyle: {} }]
      },
      line3: {
        dataZoom: [
          { type: 'slider', show: true, startValue: 0, endValue: 0 },
          { type: 'inside', startValue: 0, endValue: 0 }
        ],
        xAxis: { type: 'category', boundaryGap: false, data: [] },
        yAxis: { type: 'value' },
        series: [{ data: [], type: 'line', smooth: true, areaStyle: {} }]
      },
      line4: {
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
  methods: {
    async getContributorsData () {
      this.$api.view.contributors().then((r) => {
        const contributorsDatas = r.data.all
        const length = contributorsDatas[0].weeks.length
        this.contributorsDatas = contributorsDatas
        this.$data[`pages`] = ((contributorsDatas.length - 1) / 4) + 1
        this.changeImage()
        this.changeEChartsData('commits')
        for (let i = 1; i <= 4; i++) {
          this.$data[`line${i}`].xAxis.data = contributorsDatas[0].weeks
          this.$data[`line${i}`].dataZoom[0].endValue = length - 1
          this.$data[`line${i}`].dataZoom[0].endValue = length - 1
          this.$refs[`chart${i}`].hideLoading()
        }
        this.setMaxAndMinDate(contributorsDatas[0].weeks)
        const contributorsEmptyData = new Array(length)
        contributorsEmptyData.fill(0, 0, length - 1)
        this.contributorsEmptyData = contributorsEmptyData
      })
    },
    changeEChartsData (name) {
      let index = 0
      let length = this.contributorsDatas.length
      for (let i = 1; i <= 4; i++) {
        index = (i - 1) + (this.currentPage - 1) * 4
        if (index < length) {
          this.$data[`line${i}`].series[0].data = this.contributorsDatas[index][name]
        } else {
          this.$data[`line${i}`].series[0].data = this.contributorsEmptyData
        }
      }
    },
    changeImage () {
      let index = 0
      let length = this.contributorsDatas.length
      for (let i = 1; i <= 4; i++) {
        index = (i - 1) + (this.currentPage - 1) * 4
        if (index < length) {
          this.$refs[`name${i}`].innerHTML = this.contributorsDatas[index].author['login']
          this.$refs[`img${i}`].src = this.contributorsDatas[index].author['avatar_url']
        } else {
          this.$refs[`name${i}`].innerHTML = ''
          this.$refs[`img${i}`].src = ''
        }
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
    for (let i = 1; i <= 4; i++) {
      this.$refs[`chart${i}`].showLoading()
    }
    this.getContributorsData()
  },
  watch: {
    selected: function () {
      this.changeEChartsData(this.selected)
    },
    datepickerStartValue: function () {
      const weeks = this.contributorsDatas[0].weeks
      const index = weeks.indexOf(this.dateFormat(this.datepickerStartValue))
      for (let i = 1; i <= 4; i++) {
        this.$data[`line${i}`].dataZoom[0].startValue = index
        this.$data[`line${i}`].dataZoom[0].startValue = index
      }
    },
    datepickerEndValue: function () {
      const weeks = this.contributorsDatas[0].weeks
      const index = weeks.indexOf(this.dateFormat(this.datepickerEndValue))
      for (let i = 1; i <= 4; i++) {
        this.$data[`line${i}`].dataZoom[0].endValue = index
        this.$data[`line${i}`].dataZoom[0].endValue = index
      }
    },
    currentPage: function () {
      this.changeImage()
      this.changeEChartsData(this.selected)
    }
  }
}
</script>

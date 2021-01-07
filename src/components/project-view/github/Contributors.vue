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
import 'echarts/lib/chart/custom'
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
      pages: 1,
      currentPage: 1,
      datepickerMin: '',
      datepickerMax: '',
      datepickerStartValue: '',
      datepickerEndValue: '',
      mainProps: { blank: true, blankColor: '#777', width: 38, height: 38, class: 'm1' },
      contributorsDatas: {},
      contributorsEmptyData: [],
      line: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['code base', 'additions', 'deletions', 'commits']
        },
        grid: [
          { x: '7%', y: '12%', width: '38%', height: '33%' },
          { x2: '7%', y: '12%', width: '38%', height: '33%' },
          { x: '7%', y2: '9%', width: '38%', height: '33%' },
          { x2: '7%', y2: '9%', width: '38%', height: '33%' },
          { x: '7%', y: '7%', width: '38%', height: '0%' },
          { x2: '7%', y: '7%', width: '38%', height: '0%' },
          { x: '7%', y2: '37%', width: '38%', height: '0%' },
          { x2: '7%', y2: '37%', width: '38%', height: '0%' },
        ],
        xAxis: [
          { gridIndex: 0, type: 'category', data: [], boundaryGap: false, },
          { gridIndex: 1, type: 'category', data: [], boundaryGap: false, },
          { gridIndex: 2, type: 'category', data: [], boundaryGap: false, },
          { gridIndex: 3, type: 'category', data: [], boundaryGap: false, },
          { gridIndex: 4, show: false },
          { gridIndex: 5, show: false },
          { gridIndex: 6, show: false },
          { gridIndex: 7, show: false }
        ],
        yAxis: [
          { gridIndex: 0, type: 'value' },
          { gridIndex: 1, type: 'value' },
          { gridIndex: 2, type: 'value' },
          { gridIndex: 3, type: 'value' },
          { gridIndex: 4, show: false },
          { gridIndex: 5, show: false },
          { gridIndex: 6, show: false },
          { gridIndex: 7, show: false }
        ],
        dataZoom: [
          { type: 'slider', xAxisIndex: [0, 1, 2, 3], left: "7%", right: "7%", startValue: 0, endValue: 0 },
          { type: 'inside', xAxisIndex: [0, 1, 2, 3] }
        ],
        series: []
      }
    }
  },
  methods: {
    async getContributorsData () {
      this.$api.view.contributors({
        id: this.$route.params.id,
        repositoryId: this.$route.params.rid,
        username: this.$store.state.auth.username
      }).then((r) => {
        const contributorsDatas = r.data
        this.contributorsDatas = contributorsDatas
        this.pages = ((contributorsDatas.length - 1) / 4) + 1
        this.line.dataZoom[0].endValue = contributorsDatas[0].weeks.length - 1
        this.changeEChartsData ()
        this.$refs.chart.hideLoading()
        this.setMaxAndMinDate(contributorsDatas[0].weeks)
        const contributorsEmptyData = new Array(length)
        contributorsEmptyData.fill(0, 0, length - 1)
        this.contributorsEmptyData = contributorsEmptyData
        for (let j = 0; j < this.contributorsDatas.length; j++) {
          let commits = this.contributorsDatas[j].commits
          let additions = this.contributorsDatas[j].additions
          let deletions = this.contributorsDatas[j].deletions
          console.log(additions)
          let commitsTotal = 0
          let additionsTotal = 0
          let deletionsTotal = 0
          for (let i = 0, length = commits.length; i < length; i++) {
            commitsTotal += commits[i]
            additionsTotal += additions[i]
            deletionsTotal += deletions[i]
          }
          this.contributorsDatas[j].commitsTotal = commitsTotal
          this.contributorsDatas[j].additionsTotal = additionsTotal
          this.contributorsDatas[j].deletionsTotal = deletionsTotal
        }
      })
    },
    setMaxAndMinDate (weeks) {
      this.datepickerMin = new Date(weeks[0])
      this.datepickerStartValue = new Date(weeks[0])
      this.datepickerMax = new Date(weeks[weeks.length - 1])
      this.datepickerEndValue = new Date(weeks[weeks.length - 1])
    },
    changeEChartsData () {
      this.line.series.splice(0, this.line.series.length)
      for (let i = 0; i < 4; i++) {
        let index = i + (this.currentPage - 1) * 4
        let commits = []
        let additions = []
        let deletions = []
        let codeBase = []
        let customData = []
        if (index < this.contributorsDatas.length) {
          commits = this.contributorsDatas[index].commits
          additions = this.contributorsDatas[index].additions
          deletions = this.contributorsDatas[index].deletions
          codeBase.push(additions[0] - deletions[0])
          for (let j = 1, length = additions.length; j < length; j++) {
            codeBase.push(codeBase[j - 1] + additions[j] - deletions[j])
          }
        }
        this.line.xAxis[i].data = this.contributorsDatas[0].weeks
        this.line.series.push({
          xAxisIndex: i,
          yAxisIndex: i,
          name: 'commits',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: commits
        })
        this.line.series.push({
          xAxisIndex: i,
          yAxisIndex: i,
          name: 'additions',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: additions
        })
        this.line.series.push({
          xAxisIndex: i,
          yAxisIndex: i,
          name: 'deletions',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: deletions
        })
        this.line.series.push({
          xAxisIndex: i,
          yAxisIndex: i,
          name: 'code base',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: codeBase
        })
        this.line.series.push({
          xAxisIndex: i + 4,
          yAxisIndex: i + 4,
          data: [[0, index]],
          type: 'custom',
          renderItem: this.renderItem,
          tooltip: {
            show: false
          }
        })
      }
    },
    dateFormat (dateValue) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      const dateFormat = new Intl.DateTimeFormat('en-US', options).format
      const date = new Date(dateValue)

      if (date.getDay() !== 0) {
        date.setDate(date.getDate() + (7 - date.getDay()))
      }
      return dateFormat(date)
    },
    renderItem (param, api) {
      let coordSys = param.coordSys
      let x = coordSys.x + coordSys.width / 4
      let y = param.coordSys.y
      let text = ''
      let image = ''
      let commitsText = ''
      let additionsText = ''
      let deletionsText = ''
      let iconSize = 38
      let index = api.value(1)
      if (index < this.contributorsDatas.length) {
        text = this.contributorsDatas[index].author.login
        image = this.contributorsDatas[index].author.avatar_url
        commitsText = `${this.contributorsDatas[index].commitsTotal} commits`
        additionsText = `${this.contributorsDatas[index].additionsTotal} ++`
        deletionsText = `${this.contributorsDatas[index].deletionsTotal} --`
      }
      return {
        type: 'group',
        children: [{
          type: 'image',
          style: {
            image: image,
            x: -iconSize / 2,
            y: -iconSize / 2,
            width: iconSize,
            height: iconSize
          },
          position: [x, y]
        },
        {
          type: 'text',
          style: {
            text: text,
            textFont: api.font({ fontSize: 14 }),
            textAlign: 'left',
            textVerticalAlign: 'bottom'
          },
          position: [x + iconSize, y]
        },
        {
          type: 'text',
          style: {
            text: commitsText,
            textFont: api.font({ fontSize: 12 }),
            textAlign: 'left',
            textVerticalAlign: 'bottom',
            fill: '#586069'
          },
          position: [x + iconSize, y + 20]
        },
        {
          type: 'text',
          style: {
            text: additionsText,
            textFont: api.font({ fontSize: 12 }),
            textAlign: 'left',
            textVerticalAlign: 'bottom',
            fill: '#22863a'
          },
          position: [x + iconSize + 100, y + 20]
        },
        {
          type: 'text',
          style: {
            text: deletionsText,
            textFont: api.font({ fontSize: 12 }),
            textAlign: 'left',
            textVerticalAlign: 'bottom',
            fill: '#cb2431'
          },
          position: [x + iconSize + 180, y + 20]
        }]
      }
    }
  },
  mounted: function () {
    this.$refs.chart.showLoading()
    this.getContributorsData()
  },
  watch: {
    datepickerStartValue: function () {
      const weeks = this.contributorsDatas[0].weeks
      const index = weeks.indexOf(this.dateFormat(this.datepickerStartValue))
      this.line.dataZoom[0].startValue = index
    },
    datepickerEndValue: function () {
      const weeks = this.contributorsDatas[0].weeks
      const index = weeks.indexOf(this.dateFormat(this.datepickerEndValue))
      this.line.dataZoom[0].endValue = index
    },
    currentPage: function () {
      this.changeEChartsData()
    },
    '$route' (to, from) {
      this.getContributorsData()
    }
  }
}
</script>

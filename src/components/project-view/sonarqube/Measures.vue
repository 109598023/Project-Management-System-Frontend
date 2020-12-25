<template>
  <b-container fluid class="h-100 d-flex flex-column pt-2">
    <b-row class="m-0 flex-grow-1">
      <b-col class="m-0 p-0 d-flex flex-column">
        <div class="m-0 h4">
          {{ bugs }} <font-awesome-icon icon="bug" /> Bugs
        </div>
        <div class="flex-grow-1">
          <measures-gauge class="flex-grow-1" :seriesData="[{value: reliability_rating, name: 'Reliability'}]"/>
        </div>
      </b-col>
      <b-col class="m-0 p-0 d-flex flex-column">
        <div class="m-0 h4">
          {{ vulnerabilities }} <font-awesome-icon icon="unlock-alt" /> Vulnerabilities
        </div>
        <div class="flex-grow-1">
          <measures-gauge :seriesData="[{value: security_rating, name: 'Security'}]"/>
        </div>
      </b-col>
    </b-row>
    <b-row class="m-0 flex-grow-1">
      <b-col class="m-0 p-0 d-flex flex-column">
        <div class="m-0 h4">
          {{ security_hotspots }} <font-awesome-icon icon="shield-alt" /> Security Hotspots
        </div>
        <div class="flex-grow-1">
          <measures-gauge :seriesData="[{value: security_review_rating, name: 'Security Review'}]"/>
        </div>
      </b-col>
      <b-col class="m-0 p-0 d-flex flex-column">
        <div class="m-0 h4">
          {{ code_smells }} <font-awesome-icon icon="radiation-alt" /> Code Smells
        </div>
        <div class="flex-grow-1">
          <measures-gauge :seriesData="[{value: sqale_rating, name: 'Maintainability '}]"/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import MeasuresGaugeVue from './MeasuresGauge.vue'
export default {
  name: 'Measures',
  components: {
    'measures-gauge': MeasuresGaugeVue
  },
  data () {
    return {
      bugs: 0,
      vulnerabilities: 0,
      security_hotspots: 0,
      code_smells: 0,
      reliability_rating: 1,
      security_rating: 1,
      security_review_rating: 1,
      sqale_rating: 1
    }
  },
  methods: {
    async queryMeasures () {
      this.$api.view.queryMeasures({
      }).then((response) => {
        for (const [key, value] of Object.entries(response.data)) {
          console.log(`${key} ${value.value}`)
          this.$data[key] = value.value
        }
        this.reliability_rating = 6 - this.reliability_rating
        this.security_rating = 6 - this.security_rating
        this.security_review_rating = 6 - this.security_review_rating
        this.sqale_rating = 6 - this.sqale_rating
      })
    }
  },
  created () {
    this.queryMeasures()
  }
}
</script>
<style scoped>
</style>

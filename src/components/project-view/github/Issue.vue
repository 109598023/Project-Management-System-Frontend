<template>
  <b-container fluid>
    <b-row class="p-4 flex-column">
      <b-col class="p-0 pt-4" v-for="repo in repos" :key="repo.id">
        <!-- <b-card header={{repo.title}} header-class="text-left"> -->
        <b-card>
          {{repo.title}}<br>
          {{repo.body}}<br>
        </b-card>
        <!-- </b-card> -->
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "issues",
  data () {
    return {
      repos: null
    }
  },
  mounted(){
    this.queryIssue()
  },
  methods: {
    async queryIssue () {
      this.$api.view.queryIssue({
        id: this.$route.params.id,
        repositoryId: this.$route.params.rid,
        username: this.$store.state.auth.username
      }).then((response) => {
        this.repos = response.data
        data.forEach((dataItem) => {
          console.log(dataItem)
        })
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.queryIssue()
    }
  }
}
</script>
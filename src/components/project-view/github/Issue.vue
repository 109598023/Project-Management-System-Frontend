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
        this.$api.view.queryIssue({}).then((response) => {
        this.repos = response.data
        data.forEach((dataItem) => {
        console.log(dataItem)
        
      })
    })
    },
};


</script>
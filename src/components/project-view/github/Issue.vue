<template>
  <b-container fluid>
    <b-row class="p-4 flex-column">
      <b-col class="p-0 pt-4" v-for="repo in repos" :key="repo.id">
        
        
            <b-card>
                <h4>#{{repo.number}}</h4><br>
                <h4>Name : {{repo.title}}</h4>

                <b-card>
                State : {{repo.state}}<br>
                Subbmit by : {{repo.user.login}} ({{repo.user.id}}) <br>
                Created at : {{repo.created_at}}<br>
                Last update: {{repo.updated_at}}<br>
                </b-card>

                <b-card>
                {{repo.body}}<br>
                </b-card>
            </b-card>
       

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
    methods(){
        
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
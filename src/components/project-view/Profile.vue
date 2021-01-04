<template>
  <b-container fluid class="h-100">
    <b-row class="m-0 flex-column h-100">
      <b-col class="p-0 flex-grow-0">
        <b-table-simple class="" stacked="md" fixed>
          <b-tbody>
            <b-tr>
              <b-th class="text-right" colspan="1">Name: </b-th>
              <b-td class="text-left" colspan="5">
                {{ this.profileData.name }}
              </b-td>
            </b-tr>
            <b-tr>
              <b-th class="text-right" colspan="1">Image URL: </b-th>
              <b-td class="text-left" colspan="5">
                {{ this.profileData.imgUrl }}
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col class="flex-grow-0 font-weight-bold">
        Repositories
      </b-col>
      <b-col class="mb-4 p-0 overflow-auto mh-100">
        <b-table-simple class="m-0 p-0" fixed stacked="md">
          <b-tbody>
            <b-tr v-for="(repository, index) in this.profileData.repositories" v-bind:key="index">
              <b-th class="text-right" colspan="1">URL:</b-th>
              <b-td class="text-left" colspan="5">
                <b-link :href="repository.url">{{ repository.url }}</b-link>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'Profile',
  data () {
    return {
      profileData: {}
    }
  },
  created () {
    this.$api.view.queryProject({
      'id': this.$route.params.id,
      'username': this.$store.state.auth.username
    }).then((response) => {
      this.profileData = response.data
      console.log(this.profileData)
    })
  }
}
</script>

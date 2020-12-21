<template>
  <b-container fluid class="h-100">
    <b-row class="m-0 flex-column h-100">
      <b-col class="p-0 flex-grow-0">
        <b-table-simple class="" stacked="md" fixed>
          <b-tbody>
            <b-tr>
              <b-th class="text-right" colspan="1">Name: </b-th>
              <b-td class="text-left" colspan="5">
                <b-input type="text" v-model="profileData.name" />
              </b-td>
            </b-tr>
            <b-tr>
              <b-th class="text-right" colspan="1">Image URL: </b-th>
              <b-td class="text-left" colspan="5">
                <b-input type="url" v-model="profileData.imgUrl" />
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col class="p-2 flex-grow-0 font-weight-bold">
        Repositorys
        <b-avatar button variant="primary" size="sm" @click="addRepository()">+</b-avatar>
      </b-col>
      <b-col class="p-0 overflow-auto mh-100">
        <b-table-simple class="m-0 p-0" fixed stacked="md">
          <b-tbody>
            <b-tr v-for="(repository, index) in profileData.repositorys" v-bind:key="index">
              <b-th class="text-right" colspan="1">URL:</b-th>
              <b-td class="text-left" colspan="5">
                <b-row class="m-0">
                  <b-col class="m-0 p-0">
                    <b-input type="url" v-model="repository.url"/>
                  </b-col>
                  <b-col class="flex-grow-0">
                    <b-avatar v-if="profileData.repositorys.length == 1" disabled variant="danger" size="sm"><font-awesome-icon icon="minus" /></b-avatar>
                    <b-avatar v-else  button variant="danger" size="sm" @click="removeRepository(index)"><font-awesome-icon icon="minus" /></b-avatar>
                  </b-col>
                </b-row>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
      <b-col class="flex-grow-0 m-2">
          <b-button @click="updateProject">Update</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'EditProfile',
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
    })
  },
  methods: {
    addRepository () {
      this.profileData.repositorys.push({
        type: 'github',
        url: ''
      })
    },
    removeRepository (index) {
      this.profileData.repositorys.splice(index, 1)
    },
    updateProject () {
      this.$api.view.updateProject({
        'id': this.profileData.id,
        'name': this.profileData.name,
        'imgUrl': this.profileData.url ? this.profileData.url : '',
        'repositories': this.profileData.repositorys,
        'username': this.$store.state.auth.username
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

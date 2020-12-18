<template>
  <b-container fluid>
    <b-row class="p-4 flex-column">
      <b-col class="text-left"><h4>Project members</h4></b-col>
      <b-col class="p-0">
        <b-tabs
          class="tabs-border"
          v-model="tabIndex"
          active-nav-item-class="font-weight-bold"
          active-tab-class="tabs-border p-2"
          content-class="text-left"
          justified
        >
          <b-tab title="Invite member" active :title-link-class="linkClass(0)">
            <b-form-group
              id="fieldset-1"
              label="Enter username"
              label-class="font-weight-bold"
              label-for="invite-input"
            >
              <b-form-input id="invite-input" v-model="member" trim placeholder="Search for members to update or invite"></b-form-input>
            </b-form-group>
            <b-form-group
              id="fieldset-2"
              label="Choose a role permission"
              label-class="font-weight-bold"
              label-for="role-permission"
            >
              <b-form-select id="role-permission" v-model="role" :options="roleOptions"></b-form-select>
            </b-form-group>
          </b-tab>
          <b-tab title="Invite group" :title-link-class="linkClass(1)">
            <p>I'm the second tab</p>
          </b-tab>
        </b-tabs>
      </b-col>
      <b-col class="p-0 pt-4">
        <b-card header="Members" header-class="text-left">
          <b-card-body>

          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'Members',
  data () {
    return {
      member: '',
      role: 'GUEST',
      roleOptions: [
        { value: 'GUEST', text: 'Guest' },
        { value: 'MAINTAINER', text: 'Maintainer' },
        { value: 'OWNER', text: 'Owner' }
      ],
      tabIndex: 0
    }
  },
  methods: {
    linkClass (idx) {
      console.log(idx)
      if (this.tabIndex === idx) {
        return ['bg-white', 'text-black']
      } else {
        return ['bg-light', 'text-dark']
      }
    }
  }
}
</script>
<style scoped>
.tabs-border {
  border: 1px solid #e5e5e5
}
</style>

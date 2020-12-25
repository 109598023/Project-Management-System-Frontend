<template>
  <b-container fluid>
    <b-row class="p-4 flex-column">
      <b-col class="text-left"><h4>Project members</h4></b-col>
      <b-col class="p-0" v-if="showInviteMembers">
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
              label-for="invite-tabs"
            >
              <b-form-tags
                input-id="invite-tabs"
                v-model="inviteValue"
                separator=" "
                :placeholder="inviteTbasPlaceholder"
              ></b-form-tags>
            </b-form-group>
            <b-form-group
              id="fieldset-2"
              label="Choose a role permission"
              label-class="font-weight-bold"
              label-for="role-permission"
            >
              <b-form-select id="role-permission" v-model="role" :options="roleOptions"></b-form-select>
            </b-form-group>
            <b-button @click="inviteMembers">
              Add to project
            </b-button>
          </b-tab>
          <!-- <b-tab title="Invite group" :title-link-class="linkClass(1)">
            <p>I'm the second tab</p>
          </b-tab> -->
        </b-tabs>
      </b-col>
      <b-col class="p-0 pt-4">
        <b-card header="Members" header-class="text-left">
          <b-list-group v-for="(item, index) in projectRoles" :key="index">
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div>
                <b-avatar></b-avatar>
                {{ item.username }}
              </div>
              <b-badge variant="primary" pill>{{ item.roleName }}</b-badge>
            </b-list-group-item>
          </b-list-group>
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
      role: 'Guest',
      roleOptions: [],
      tabIndex: 0,
      projectRoles: [],
      showInviteMembers: true,
      inviteValue: [],
      inviteTbasPlaceholder: 'Search for members to update or invite'
    }
  },
  methods: {
    linkClass (idx) {
      if (this.tabIndex === idx) {
        return ['bg-white', 'text-black']
      } else {
        return ['bg-light', 'text-dark']
      }
    },
    inviteMembers () {
      this.$api.view.inviteMembers({
        'projectId': this.$route.params.id,
        'inviterUsername': this.$store.state.auth.username,
        'inviteesUsername': this.inviteValue,
        'roleName': this.role
      }).then((response) => {
        this.projectRoles = response.data
      })
    }
  },
  created () {
    this.$api.view.queryProjectRoles({
      'id': this.$route.params.id,
      'username': this.$store.state.auth.username
    }).then((response) => {
      this.projectRoles = response.data
      const role = this.projectRoles.find(r => r.username === this.$store.state.auth.username)
      if (role.roleName === 'Owner') {
        this.roleOptions = [
          { value: 'Guest', text: 'Guest' },
          { value: 'Maintainer', text: 'Maintainer' },
          { value: 'Owner', text: 'Owner' }
        ]
      } else if (role.roleName === 'Maintainer') {
        this.roleOptions = [
          { value: 'Guest', text: 'Guest' },
          { value: 'Maintainer', text: 'Maintainer' }
        ]
      } else {
        this.showInviteMembers = false
      }
    })
  },
  watch: {
    inviteValue () {
      if (this.inviteValue.length === 0) {
        this.inviteTbasPlaceholder = 'Search for members to update or invite'
      } else {
        this.inviteTbasPlaceholder = ''
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

<template>
  <b-navbar class="navbar" toggleable="lg" type="dark" variant="dark" fixed="top">
    <b-navbar-brand class="mb-0 ">PMS</b-navbar-brand>
    <b-navbar-toggle target="nav-collpase"></b-navbar-toggle>
    <b-collapse id="nav-collpase" is-nav>
      <b-navbar-nav class="ml-auto" right v-if="isLogin">
        <b-nav-item href="/project">Project</b-nav-item>
        <b-nav-item href="/profile">Profile</b-nav-item>
        <b-nav-item href="/logout" @click.prevent="logout">
          <font-awesome-icon icon="sign-out-alt" /> Sing out
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" right v-else>
        <b-nav-item href="/login">
          <font-awesome-icon icon="sign-in-alt" /> Sign in
        </b-nav-item>
        <b-nav-item href="/signup">
          <font-awesome-icon icon="user-plus" /> Sign up
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('setAuth', {
        'accessToken': '',
        'isLogin': false,
        'username': ''
      })
      this.$router.push('/login')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.auth.accessToken
    }
  }
}
</script>
<style scoped>
</style>

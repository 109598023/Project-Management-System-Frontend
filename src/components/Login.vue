<template>
  <b-container>
    <b-row>
      <b-col md=6  class="mx-auto">
        <b-form @submit.prevent="handleSubmit">
          <h1>Login</h1>
          <b-form-group id="fieldset-username" label-cols="4" label-cols-lg="2" label="Username:" label-for="username">
            <b-form-input id="username" v-model="username" placeholder="username"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldset-password" label-cols="4" label-cols-lg="2" label="Password:" label-for="password">
            <b-form-input id="password" type="password" v-model="password" placeholder="password"></b-form-input>
          </b-form-group>
          <b-button variant="primary" block type="submit">Login</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit () {
      this.$api.auth.login({
        username: this.username,
        password: this.password
      }).then((response) => {
        if (response.data !== undefined) {
          const res = response.data
          const accessToken = res.accessToken
          const refreshToken = res.refreshToken
          this.$store.dispatch('setAuth', {
            'accessToken': accessToken,
            'refreshToken': refreshToken,
            'isLogin': true,
            'username': this.username
          })
          this.$router.push('/')
        }
      }).catch((e) => {
      })
    }
  }
}
</script>
<style scoped></style>

<template>
  <b-container>
    <b-row>
      <b-col md=6 class="mx-auto">
        <b-form @submit.prevent="handleSubmit" class="mt-4">
          <h1 class="mb-3">Sign in to PMS</h1>
          <b-alert v-model="showIncorrectAlert" variant="danger" dismissible>
            Incorrect username or password.
          </b-alert>
          <div class="text-left pb-3">
            <label class="font-weight-bold" for="username">Username</label>
            <b-form-input id="username" type="text" v-model="username"></b-form-input>
          </div>
          <div class="text-left pb-3">
            <label class="font-weight-bold" for="password">Password</label>
            <b-form-input id="password" type="password" v-model="password"></b-form-input>
          </div>
          <b-button variant="primary" block type="submit">Sign in</b-button>
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
      password: '',
      showIncorrectAlert: false
    }
  },
  methods: {
    async handleSubmit () {
      this.$api.auth.login({
        username: this.username,
        password: this.password
      }).then((response) => {
        if (response.data !== undefined) {
          this.$store.dispatch('setAuth', {
            'accessToken': response.data.accessToken,
            'refreshToken': response.data.refreshToken,
            'username': this.username,
            'isLogin': true
          })
          this.$router.push('/')
        }
      }).catch((e) => {
        this.showIncorrectAlert = true
      })
    }
  }
}
</script>

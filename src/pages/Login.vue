<template>
  <form @submit.prevent='handleSubmit'>
    <h3>Login</h3>
    <div class='form-group'>
      <label>username</label>
      <input type='text' class='form-control' v-model='username' placeholder='username'/>
    </div>
    <div class='form-group'>
      <label>username</label>
      <input type='password' class='form-control' v-model='password' placeholder='password'/>
    </div>
    <button class='btn btn-primary btn-block'>Login</button>
  </form>
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
        let res = response.data
        let token = res.token
        console.log(this.$store)
        this.$store.dispatch('setAuth', {
          'token': token,
          'isLogin': true
        })
        console.log(response)
      })
    }
  }
}
</script>
<style scoped></style>

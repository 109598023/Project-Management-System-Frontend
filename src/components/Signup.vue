<template>
  <b-container>
    <b-row>
      <b-col md=6  class="mx-auto">
        <b-form @submit.prevent="handleSubmit">
          <h1>Sign up</h1>
          <b-form-group id="fieldset-email" label-cols-sm="4" label-cols-lg="3" label="email:" label-for="email" align="right">
            <b-form-input id="email" v-model="email" placeholder="email"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldset-username" label-cols-sm="4" label-cols-lg="3" label="Username:" label-for="username" align="right">
            <b-form-input id="username" v-model="username" placeholder="username"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldset-password" label-cols-sm="4" label-cols-lg="3" label="password:" label-for="password" align="right">
            <b-form-input id="password" v-model="password" placeholder="password"></b-form-input>
          </b-form-group>
          <b-form-group id="fieldset-repeat_password" label-cols-sm="4" label-cols-lg="3" label="repeat_password:" label-for="repeat_password" align="right">
            <b-form-input id="repeat_password" v-model="repeat_password" placeholder="repeat_password"></b-form-input>
          </b-form-group>
          <b-button variant="primary" block type="submit">Login</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'Singup',
  data () {
    return {
      email: 'test@test.test',
      username: 'test',
      password: 'test',
      repeat_password: 'test'
    }
  },
  methods: {
    async handleSubmit () {
      if (this.repeat_password === this.password) {
        this.$api.auth.signUp({
          email: this.email,
          username: this.username,
          password: this.password
        }).then((response) => {
        })
      }
    }
  }
}
</script>
<style scoped>
</style>

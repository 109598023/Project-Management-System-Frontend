<template>
  <b-container>
    <b-row>
      <b-col md=6  class="mx-auto">
        <b-form @submit.prevent="handleSubmit" class="mt-4">
          <h1 class="mb-3">Create your account</h1>
          <div class="text-left pb-3">
            <b-alert variant="danger" :show="usernameAlertShow">Username {{ username }} is not available</b-alert>
            <label class="font-weight-bold" for="username">Username <code>*</code></label>
            <b-form-input id="username" type="text" v-model="username" autocomplete="off" :state="usernameInputState"></b-form-input>
          </div>
          <div class="text-left pb-3">
            <b-alert variant="danger" :show="emailAlertShow">Email is invalid or already taken</b-alert>
            <label class="font-weight-bold" for="email">Email address <code>*</code></label>
            <b-input-group>
              <b-form-input id="email" type="email" v-model="email" autocomplete="off" :state="emailInputState"></b-form-input>
            </b-input-group>
          </div>
          <div class="text-left pb-3">
            <label class="font-weight-bold" for="password">Password <code>*</code></label>
            <b-form-input id="password" type="password" v-model="password" autocomplete="off" :state="passwordInputState"></b-form-input>
          </div>
          <b-button class="p-2 font-weight-bold" variant="primary" block type="submit" :disabled="disabledCreateButton">Create account</b-button>
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
      email: '',
      username: '',
      password: '',
      usernameInputState: null,
      emailInputState: null,
      passwordInputState: null,
      usernameAlertShow: false,
      emailAlertShow: false
      // disabledCreateButton: true
    }
  },
  methods: {
    async handleSubmit () {
      this.$api.auth.signUp({
        email: this.email,
        username: this.username,
        password: this.password
      }).then((response) => {
        this.$router.push('/login')
      })
    }
  },
  computed: {
    disabledCreateButton () {
      console.log(!this.usernameInputState || !this.emailInputState || !this.passwordInputState)
      return !this.usernameInputState || !this.emailInputState || !this.passwordInputState
    }
  },
  watch: {
    username () {
      if (this.username === '') {
        this.usernameInputState = null
        this.usernameAlertShow = false
      } else {
        this.$api.auth.signupCheckUsername({
          'username': this.username
        }).then((response) => {
          this.usernameInputState = true
          this.usernameAlertShow = false
        }).catch(() => {
          this.usernameInputState = false
          this.usernameAlertShow = true
        })
      }
    },
    email () {
      if (this.email === '') {
        this.emailAlertShow = false
        this.emailInputState = null
        this.searchEmailLoadingShow = false
      } else {
        const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/g
        const matchResult = this.email.match(re)

        if (!matchResult) {
          this.emailAlertShow = true
          this.emailInputState = false
        } else {
          this.$api.auth.signupCheckEmail({
            'email': this.email
          }).then((response) => {
            this.emailInputState = true
            this.emailAlertShow = false
          }).catch(() => {
            this.emailInputState = false
            this.emailAlertShow = true
          })
        }
        // this.disabledCreateButton = !this.usernameInputState || !this.emailInputState || !this.passwordInputState
      }
    },
    password () {
      if (this.password === '') {
        this.passwordInputState = null
      } else {
        this.passwordInputState = true
      }
    }
  }
}
</script>

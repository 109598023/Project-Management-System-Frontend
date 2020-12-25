import req from './https'

const auth = {
  signUp (params) {
    return req('post', '/user/signup', params)
  },
  login (params) {
    return req('post', '/user/login', params)
  },
  refresh (params) {
    return req('post', '/auth/refresh', params)
  },
  signupCheckUsername (params) {
    return req('post', '/user/signup_check_username', params)
  },
  signupCheckEmail (params) {
    return req('post', '/user/signup_check_email', params)
  }
}

export default auth

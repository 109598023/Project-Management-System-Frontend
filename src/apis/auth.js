import req from './https'

const auth = {

  signUp (params) {
    return req('post', '/auth/signup', params)
  },
  login (params) {
    return req('post', '/auth', params)
  },
  async validateToken (params) {
    return req('post', '/auth/parse', params)
  }
}

export default auth

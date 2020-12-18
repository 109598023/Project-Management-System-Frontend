export default {
  namespace: true,
  state: {
    accessToken: '',
    refreshToken: '',
    isLogin: false
  },
  mutations: {
    SET_AUTH (state, options) {
      state.accessToken = options.accessToken
      if (options.refreshToken !== undefined) {
        state.refreshToken = options.refreshToken
      }
      state.isLogin = options.isLogin
      state.username = options.username
    },
    CLEAR_AUTH (state) {
    }
  },
  actions: {
    setAuth (context, options) {
      context.commit('SET_AUTH', {
        accessToken: options.accessToken,
        refreshToken: options.refreshToken,
        isLogin: options.isLogin,
        username: options.username
      })
    },
    clearAuth (context) {
      console.log(context)
      context.commit('CLEAR_AUTH')
    }
  }
}

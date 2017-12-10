const storage = window.localStorage

export default ({
  state: {
    isLogin: false,
    name: null,
    token: null
  },
  getters: {
    isLogin (state) {
      if (!state.isLogin) {
        let token = storage.getItem('token')
        if (typeof (token) !== 'undefined' && token != null && token !== '') {
          state.token = token
          state.isLogin = true
        }
      }
      return state.isLogin
    }
  },
  mutations: {
    loginSuccess (state, user) {
      if (user.token != null && user.token !== '') {
        storage.setItem('token', user.token)
        state.token = user.token
        state.isLogin = true
      }
    },
    logout (state) {
      storage.removeItem('token')
      state.isLogin = false
    },
    loadLocalUser (state) {
      let token = storage.getItem('token')
      if (typeof (token) !== 'undefined' && token != null && token !== '') {
        state.token = token
        state.isLogin = true
      }
    }
  },
  actions: {
    loadUser ({state, commit, dispatch}, param) {
      commit('loginSuccess', {
        token: '12121'
      })
    }
  }
})

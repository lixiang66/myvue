import TYPEINGS from '../typings'

const storage = window.localStorage

export default ({
  state: {
    auth: {
      isLogin: false,
      roles: ['usr'],
      permssion: ['all']
    },
    user: {
      xm: '',
      sfzmhm: '',
      urls: [],
      currentPage: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        jylx: '',
        kjxh: '',
        kjlist: null
      },
      dmXx: {
        dmcx: 0,
        jgsj: 0,
        ydcs: 0,
        xcsj: 0
      }
    },
    menu: [{jylx: '1001', title: '道路交通安全法律法规'},
      {jylx: '1002', title: '安全文明驾驶常识及相关知识'},
      {jylx: '1003', title: '演示应急处置知识'},
      {jylx: '1004', title: '交通安全宣传片'},
      {jylx: '1005', title: '交通安全公益广告'},
      {jylx: '1006', title: '交通安全栏目'},
      {jylx: '1007', title: '学习体会'},
      {jylx: '1008', title: '现身说法'},
      {jylx: '1009', title: '现场宣誓'}],
    audioData: null
  },
  getters: {
    isLogin (state) {
      return state.auth.isLogin
    },
    getURLData (state) {
      return URL.createObjectURL(state.audioData)
    }
  },
  mutations: {
    [TYPEINGS.LOADLOCALUSER] (state) {
      let data = JSON.parse(storage.getItem('state'))
      if (typeof data !== 'undefined' && data !== null && data.auth.isLogin) {
        state = data
      }
    },
    [TYPEINGS.LOGINSUCCESS] (state, auth) {
      if (auth.isLogin) {
        state.auth.isLogin = auth.isLogin
        state.isLogin = true
        storage.setItem('state', JSON.stringify(state))
      }
    },
    [TYPEINGS.LOGOUT] (state) {
      storage.removeItem('token')
      state.isLogin = false
    },
    [TYPEINGS.AUDIODATA] (state, data) {
      state.audioData = data
    },
    [TYPEINGS.DMXX] (state, dmxx) {
      state.user.dmXx = dmxx
    }
  },
  actions: {
    [TYPEINGS.LOGIN] ({state, commit, dispatch}, param) {
      return new Promise((resolve, reject) => {
        commit('loginSuccess', {
          isLogin: true
        })
        resolve({code: 200})
      })
    }
  }
})
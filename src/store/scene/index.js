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
      imgurls: [],
      currentPage: {
        name: '1001',
        pageNo: 1,
        pageSize: 10,
        total: 0,
        kjlist: ['1', '2', '3', '4', '5', '6', '7']
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
      { jylx: '1009', title: '现场宣誓' }],
    audioData: null
  },
  getters: {
    isLogin (state) {
      return state.auth.isLogin
    },
    getURLData (state) {
      return URL.createObjectURL(state.audioData)
    },
    getMenu (state) {
      return state.menu
    },
    getCurrentPage (state) {
      console.log(122)
      return state.user.currentPage.name
    },
    getKjList (state) {
      return state.user.currentPage.kjlist
    }
  },
  mutations: {
    [TYPEINGS.LOADLOCALUSER] (state) {
      let data = JSON.parse(storage.getItem('state'))
      if (typeof data !== 'undefined' && data !== null && data.auth.isLogin) {
        // state.auth.isLogin = data.auth.isLogin
        Object.assign(state, data)
      }
    },
    [TYPEINGS.CHANGECURRENTPAGE] (state, data) {
      Object.assign(state.user.currentPage, data)
      storage.setItem('state', JSON.stringify(state))
    },
    [TYPEINGS.LOGINSUCCESS] (state, auth) {
      if (auth.isLogin) {
        state.auth.isLogin = auth.isLogin
        storage.setItem('state', JSON.stringify(state))
      }
    },
    [TYPEINGS.LOGOUT] (state) {
      storage.removeItem('state')
      state.auth.isLogin = false
    },
    [TYPEINGS.AUDIODATA] (state, data) {
      state.audioData = data
    },
    [TYPEINGS.DMXX] (state, dmxx) {
      state.user.dmXx = dmxx
    },
    [TYPEINGS.PUSHKJLIST] (state, kjlist) {
      for (let i = 0; i < kjlist.length; i++) {
        state.user.currentPage.kjlist.push(kjlist[i])
      }
    }
  },
  actions: {
    [TYPEINGS.LOGIN] ({state, commit, dispatch}, param) {
      return new Promise((resolve, reject) => {
        commit(TYPEINGS.LOGINSUCCESS, {
          isLogin: true
        })
        resolve({code: 200})
      })
    },
    [TYPEINGS.LOADMOREKJ] ({ state, commit, dispatch }, param) {
      return new Promise((resolve, reject) => {
        commit(TYPEINGS.PUSHKJLIST, [11, 12, 13, 14, 15])
        resolve({ code: 200 })
      })
    },
    [TYPEINGS.INITKJLIST] ({ state, commit, dispatch }, param) {
      return new Promise((resolve, reject) => {
        commit(TYPEINGS.PUSHKJLIST, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        resolve({ code: 200 })
      })
    },
    [TYPEINGS.LOADKJDETAIL] ({ state, commit, dispatch }, param) {
      return new Promise((resolve, reject) => {
        resolve({
          code: 200,
          kj: {
            kjmc: '交通法律法规',
            wjm: '1.mp4'
          }
        })
      })
    }
  }
})

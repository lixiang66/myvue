import Vue from 'vue'
import Vuex from 'vuex'
import scene from './scene'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    scene: scene
  }
})

export default store

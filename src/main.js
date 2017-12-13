// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问

/* eslint-disable no-new */
new Vue(
  {
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })

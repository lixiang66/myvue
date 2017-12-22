import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css'
Vue.use(iView, {locale})
Vue.config.productionTip = false

var dd = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

exports = dd

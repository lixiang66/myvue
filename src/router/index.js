import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Login from '../components/Login'
import TYPINGS from '../store/typings'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {requireAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!router.app.$options.store.state.scene.auth.isLogin) {
      router.app.$options.store.commit(TYPINGS.LOADLOCALUSER)
      if (!router.app.$options.store.state.scene.auth.isLogin) {
        next({path: '/?redirct=' + to.path})
        return
      }
    }
  }
  next()
})

router.afterEach((to, from) => {

})

export default router

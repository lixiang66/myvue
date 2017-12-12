<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/">index</router-link>
    <router-link to="/main">main</router-link>
    <button @click="login" v-if="!islogin">login</button>
    <button @click="logout" v-if="islogin">logout</button>
    <router-view/>
    
  </div>
</template>

<script>

import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'isLogin'
    ]),
    ...mapGetters({
      islogin: 'isLogin'
    })
  },
  methods: {
    ...mapMutations([
      'logout1'
    ]),
    ...mapMutations({
      out: 'logout' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    ...mapActions({
      loginx: 'loadUser'
    }),
    login () {
      this.$store.dispatch('loadUser').then(() => {
        this.$router.back()
      })
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login?redirct=/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

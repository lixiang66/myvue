<template>
  <div id="app">
    <div>{{islogin}}</div>
    <img src="./assets/logo.png">
    <router-link to="/">index</router-link>
    <router-link to="/main">main</router-link>
    <button @click="login">login</button>
    <button @click="logout">logout</button>
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    islogin () {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    login () {
      this.$store.dispatch('loadUser')
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
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

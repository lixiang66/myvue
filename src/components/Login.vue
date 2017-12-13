<template>
  <div class="hello">
    <h1>{{rePath}}</h1>
    <h2>Essential Links</h2>
<button @click="login" v-if="!islogin">login</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Login'
    }
  },
  computed: {
    rePath () {
      return this.$route.query.redirct
    },
    ...mapGetters({
      islogin: 'isLogin'
    })
  },
  methods: {
    login () {
      this.$store.dispatch('loadUser').then(() => {
        this.$router.back()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

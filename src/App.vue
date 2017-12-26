<template>
  <div id="app" class="layout">
    <Header></Header>
    <div style="min-height:600px;width: 100%;" ref="mainLayout">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import Header from './components/common/Header'
  import Footer from './components/common/Footer'

  export default {
    name: 'app',
    data () {
      return {
        switch1: false,
        value: '121'
      }
    },
    computed: {
      ...mapGetters({
        islogin: 'isLogin'
      }),
      ...mapGetters([
        'isLogin'
      ])
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
      },
      change (dat) {
        console.log(dat)
      },
      css () {

      }
    },
    components: {Header, Footer},
    mounted () {
      let layout = this.$refs.mainLayout
      let height = window.innerHeight - 94
      layout.style['min-height'] = height + 'px'
    }
  }
</script>

<style scoped>
  a {
    color: #9ba7b5;
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-ceiling-main a {
    font-size: 16px;
    padding: 4px;
    line-height: 20px;
  }

  .layout-ceiling-main a:hover {
    color: #fff;
  }

  .layout-ceiling-main .right {
    float: right;
  }

</style>

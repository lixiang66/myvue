<template>
  <div id="app" class="layout">
        <div class="layout-ceiling">
            <div class="layout-ceiling-main">
                <a href="#"  class="right" @click="logout" v-if="isLogin">登出</a>
                <router-link to="/">主页</router-link>|
                <router-link to="/main">个人</router-link>
                <router-link to="/main">相册</router-link>|
            </div>
        </div>
        <div>
          <router-view/>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
    </div>
</template>

<script>

import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'app',
  data () {
    return {switch1: false,
      value: '121'}
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
  }
}
</script>

<style scoped>
a{
      color: #9ba7b5;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-header{
        height: 60px;
        background: #000;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-ceiling{
        background: #464c5b;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
      text-align: center;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
      font-size: 16px;
      padding: 4px;
      line-height: 20px;
    }
    .layout-ceiling-main a:hover{
        color: #fff;
    }
    .layout-ceiling-main .right{
      float: right;
    }
    .router-link-exact-active{
      color: #fff;
    }
</style>

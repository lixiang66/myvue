<template>
  <Menu mode="horizontal" active-name="1">
    <div class="layout-logo">.....</div>
    <div class="layout-nav">
      <a @click="logout">注销</a>
    </div>
  </Menu>
</template>

<script>
import TYPINGS from '../../store/typings'

export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {},
  methods: {
    logout () {
      this.$store.commit(TYPINGS.LOGOUT)
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss" scoped>
  .layout-logo {
    width: 100px;
    line-height: 30px;
    text-align: center;
    font-size: 24px;
    font-weight: 200;
    color: gray;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    position: absolute;
    right: 40px;

  }

  .layout-nav a {
    font-size: 14px;
    color: gray;
  }

  .layout-nav a:hover {
    box-shadow: 0px 1px gray;
  }
</style>

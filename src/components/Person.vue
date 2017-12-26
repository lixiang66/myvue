<template>
  <div style="padding-right:10px;padding-left:10px;text-align:center;">
    <Card>
        <p slot="title">个人信息</p>
        <Camra width="100%" name="personinfo"></Camra>
        <Button long type="primary">点名</Button>
        <div>

        </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Camra from './common/Camra'

export default {
  name: 'Main',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      menus: 'getMenu',
      currentPage: 'getCurrentPage'
    })
  },
  components: {
    Camra
  },
  methods: {

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
.ivu-menu-horizontal{
  height: auto;
  min-height: 60px;
}
.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu{
  float: none;
}
</style>

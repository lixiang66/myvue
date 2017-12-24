<template>
  <div>
    <Row>
    <Col span="24">
        <Menu mode="horizontal" :active-name="currentPage" @on-select="goPage">
          <MenuItem v-for="m in menus" :key="m.jylx" :name="m.jylx" :id="m.jylx">
          {{m.title}}
          </MenuItem>
        </Menu>
    </Col>
  </Row>
  <div style="margin-top:10px;">
    <Row>
    <Col span="5">
      <Person></Person>
    </Col>
    <Col span="19">
      <router-view/>
    </Col>
  </Row>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TYPINGS from '../store/typings'
import Person from './Person'

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
    Person
  },
  methods: {
    goPage (name) {
      this.$store.commit(TYPINGS.CHANGECURRENTPAGE, {'name': name})
      this.$router.push('/main/list/' + name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu {
    padding: 0 10px;
}
</style>

<template>
  <div>
    <div>
      <Card dis-hover style="width:100%;border-top:none;border-left:none;border-right:none;">
        <div style="text-align:center">
            <h3>{{menuTitle}}
              <div style="float:right;display:inline;padding:0 20px;">
              <a href="#"><Icon type="plus-circled"></Icon>添加</a>
              </div>
            </h3>
            
        </div>
      </Card>
    </div>
    <div style="display:block;">
      <Card v-for=" x in getKjList" :key="x" :kjxh="x" @click.native="toDetailPage" style="width:17%;padding:5px;margin-left:2%;margin-top:2%;height:inherit;line-height: inherit;float:left;">
          <div style="text-align:center">
              <img src="../assets/logo.png" width="100%">
              <h3>交通法律法规</h3>
          </div>
      </Card>
    </div>
    <div style="clear:both;margin-bottom:20px;"></div>
    <div style="margin-bottom:20px;">
      <Button long type="ghost" @click.native="loadMoreInfo" style="border-left:none;border-right:none;">获取更多内容...</Button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TYPINGS from '../store/typings'

  export default {
    name: 'List',
    props: ['jylx'],
    data () {
      return {
        recorder: null
      }
    },
    computed: {
      ...mapGetters({
        getKjList: 'getKjList',
        currentPage: 'getCurrentPage',
        menus: 'getMenu'
      }),
      menuTitle () {
        for (let i = 0; i < this.menus.length; i++) {
          if (this.menus[i].jylx === this.currentPage) {
            return this.menus[i].title
          }
        }
        return ''
      }
    },
    methods: {
      toDetailPage (e) {
        let kjxh = e.currentTarget.getAttribute('kjxh')
        this.$router.push('/main/detail/' + kjxh)
      },
      loadMoreInfo () {
        this.$store.dispatch(TYPINGS.LOADMOREKJ, {jylx: this.jylx}).then((data) => {
          if (data.code === 200) {
  
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit(TYPINGS.CHANGECURRENTPAGE, {'name': to.params.jylx, 'pageNo': 1, 'kjlist': []})
        vm.$store.dispatch(TYPINGS.INITKJLIST, {jylx: to.params.jylx}).then((data) => {
        })
      })
    },
    beforeRouteUpdate (to, from, next) {
      this.$store.commit(TYPINGS.CHANGECURRENTPAGE, {'name': to.params.jylx, 'pageNo': 1, 'kjlist': []})
      this.$store.dispatch(TYPINGS.INITKJLIST, {jylx: to.params.jylx}).then((data) => {
        if (to.params.jylx === '1009') {
          setTimeout(() => {
            next()
          }, 4000)
        } else {
          next()
        }
      })
    },
    created () {
      console.log(2)
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

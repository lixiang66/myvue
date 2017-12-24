<template>
  <div>
    <div>
      <Card dis-hover style="width:100%;border-top:none;border-left:none;border-right:none;">
        <div style="text-align:center">
            <h3>{{kj.kjmc}}</h3>
        </div>
      </Card>
    </div>
    {{kjxh}}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TYPINGS from '../store/typings'

  export default {
    name: 'Detail',
    props: ['kjxh'],
    data () {
      return {
        kj: {
          kjmc: '',
          wjm: ''
        },
        isLoading: true
      }
    },
    computed: {
      ...mapGetters({
        getURLData: 'getURLData'
      })
    },
    methods: {
    },
    created () {
      this.$store.dispatch(TYPINGS.LOADKJDETAIL, {kjxh: this.kjxh}).then((data) => {
        if (data.code === 200) {
          Object.assign(this.kj, data.kj)
          this.isLoading = false
        }
      })
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

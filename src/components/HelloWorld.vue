<template>
  <div class="hello">
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>

    <Button type="primary" @click.native="record">record</Button>
    <Button type="primary" @click.native="stop">stop</Button>
    <Button type="primary" @click.native="init">init</Button>
    <Button type="primary" @click.native="pause">pause</Button>
    <Button type="primary" @click.native="getData">getData</Button>
    <video :src="getURLData" controls="controls"></video>
  </div>
</template>

<script>
  import MP3Recorder from '../lib/recordmp3'
  import { mapGetters } from 'vuex'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        recorder: null,
        msg: 'Welcome to Your Vue.js App',
        data: 'a'
      }
    },
    computed: {
      mydata () {
        return this.data
      },
      ...mapGetters({
        getURLData: 'getURLData'
      })
    },
    methods: {
      record () {
//        console.log(recoder)
        this.recorder.start()
//        recoder.record()
      },
      stop () {
        this.recorder.stop()
      },
      init () {
        this.recorder = new MP3Recorder({
          debug: true,
          funOk: function () {
          },
          funCancel: function (msg) {

          }
        })
      },
      pause () {
//        recoder.pause()
      },
      getData () {
        let _self = this
        this.recorder.getMp3Blob(function (blob) {
          console.log(blob)
          var url = URL.createObjectURL(blob)
          _self.$store.commit('setURL', url)
        })
//        recoder.getData((data) => {
//          let data1 = window.URL.createObjectURL(data)
//          this.$store.commit('setURL', data1)
//          console.log(data)
//        })
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

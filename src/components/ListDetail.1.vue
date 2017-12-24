<template>
  <div>
    <div>
      <Card dis-hover style="width:100%;border-top:none;border-left:none;border-right:none;">
        <div style="text-align:center">
            <h3>{{kjmc}}</h3>
        </div>
      </Card>
    </div>
    {{kjxh}}
  </div>
</template>

<script>
  import MP3Recorder from '../lib/recordmp3'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Detail',
    props: ['kjxh'],
    data () {
      return {
        kjmc: '12212'
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

<template>
  <div>
    <video :width="width?width:320" :height="height?height:240" ref="cam" style="border-radius: 4px;box-shadow: 2px 2px 2px #CCC;"></video>
    <canvas :width="width?width:320" :height="height?height:240" ref="canv" style="display: none"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'Camra',
    props: [
      'width',
      'height'
    ],
    data () {
      return {}
    },
    computed: {},
    methods: {},
    mounted: function () {
      let videoObj = {video: true}
      let video = this.$refs.cam
      if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(videoObj, function (stream) {
          video.src = window.webkitURL.createObjectURL(stream)
          video.play()
        }, function (error) {
          console.log('Video capture error:', error.code)
        })
      } else if (navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(videoObj, function (stream) {
          video.src = window.URL.createObjectURL(stream)
          video.play()
        }, function (error) {
          console.log('Video capture error:', error.code)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

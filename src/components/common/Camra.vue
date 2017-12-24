<template>
  <div>
    <video :width="width?width:320" :height="240" ref="cam" style="border-radius: 4px;box-shadow: 2px 2px 2px #CCC;"></video>
    <canvas :width="width?width:320" :height="240" ref="canv" style="display: none"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'Camra',
    props: [
      'width'
    ],
    data () {
      return {
        stream: null
      }
    },
    computed: {
      height () {
        return this.width ? this.width * 0.75 : 240
      }
    },
    methods: {},
    mounted () {
      let videoObj = {video: true}
      let video = this.$refs.cam
      let canvas = this.$refs.canv
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
      } else if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function (stream) {
          video.src = stream
          video.play()
        }, function (error) {
          console.log('Video capture error:', error.code)
        })
      }
      console.log(video.getClientRects())
      video.height = video.getClientRects()[0].width * 0.75
      canvas.height = video.getClientRects()[0].width * 0.75
      window.onresize = () => {
        video.height = video.getClientRects()[0].width * 0.75
        canvas.height = video.getClientRects()[0].width * 0.75
      }
    },
    beforeDestroy () {
      if (this.stream !== null && typeof this.stream !== 'undefined') {
        this.stream.stop()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

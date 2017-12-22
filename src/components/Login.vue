<template>
  <Row>
    <i-col span="8" offset="8">
      <Card style="margin: 70px 0;min-width: 380px;text-align: center;padding: 15px; ">
        <div slot="title" style="font-size: 20px;color: #ddd;">用户登录</div>
        <div style="padding-bottom: 10px;">
          <Camra ref="camra"></Camra>
        </div>
        <Input v-model="sfzmhm" placeholder="请输入身份证明号码" style="padding-bottom: 10px;width: 320px;"></Input>
        <Button type="primary" style="width: 320px;" @click="takePhoto">登录</Button>
      </Card>
    </i-col>
  </Row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Camra from './common/Camra'
  import TYPINGS from '../store/typings'

  export default {
    name: 'xxx',
    data () {
      return {
        sfzmhm: '',
        zp: '',
        video: null,
        canvas: null
      }
    },
    computed: {
      ...mapGetters({
        islogin: 'isLogin'
      })
    },
    methods: {
      takePhoto () {
        let context = this.canvas.getContext('2d')
        context.drawImage(this.video, 0, 0, 640, 480)
        this.zp = this.canvas.toDataURL()
        this.login()
      },
      login () {
        this.$store.dispatch(TYPINGS.LOGIN, {sfzmhm: this.sfzmhm, zp: this.zp}).then((data) => {
          if (data.code === 200) {
            let path = this.$route.query.redirct
            if (typeof path === 'undefined' || path === null || path === '') {
              path = '/main'
            }
            console.log(path)
            this.$router.push(path)
          }
        })
      }
    },
    components: {
      Camra
    },
    beforeCreate: function () {
      this.$store.commit(TYPINGS.LOADLOCALUSER)
      if (this.$store.state.scene.auth.isLogin) {
        this.$router.push('/main')
      }
    },
    mounted: function () {
      this.video = this.$refs.camra.$refs.cam
      this.canvas = this.$refs.camra.$refs.canv
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

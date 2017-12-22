<template>
  <div class="layout-copy">
    {{copy}}
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data () {
      return {
        copy: '公安部交通管理科学研究所 1989-2017'
      }
    },
    computed: {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
    background-color: #FFF;
    height: 30px;
  }
</style>

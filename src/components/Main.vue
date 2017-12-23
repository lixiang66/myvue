<template>
  <div>
    <Menu mode="horizontal" active-name="1">
        <div class="layout-assistant">
            <MenuItem name="1">Option1</MenuItem>
            <MenuItem name="2">Option1</MenuItem>
            <MenuItem name="3">Option2</MenuItem>
        </div>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data

  () {
    return {
      msg: 'Main'
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

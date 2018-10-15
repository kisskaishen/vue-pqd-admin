<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
@import "less/config.less";
body{
    margin:60px;
    padding:0;
    height:100%;
}
html{
    margin:60px;
    padding:0;
    height:100%;
}
#app {
	height:100%;
	font-size:@font14;
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
}
</style>

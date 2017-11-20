<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/*各个浏览器统一*/
@import url(assets/css/hack.css);
 #app {
 	height: 100%;
 }
 li{
 outline: 0px!important;
 }
    
</style>

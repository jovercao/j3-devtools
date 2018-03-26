<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'j3-devtools'
}
</script>

<style lang="less">
/* LESS */

@import url('../../node_modules/muse-ui/src/styles/colors.less');

html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

html {
}

body {
  // background-color: @grey900;
  // color: @grey100;
}
</style>

<template>
  <div class="dock-container">
   
  </div>
</template>

<script>
export default {
  props: {
    topThick: [Number, String],
    leftThick: [Number, String],
    rightThick: [Number, String],
    bottomThick: [Number, String],
    leftClass: String,
    rightClass: String,
    topClass: String,
    bottomClass: String,
    centerClass: String
  }
}
</script>


<style lang="less" scoped>
.dock-container {
  width: 100%;
  height: 100%;
  border: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .dock-top {
  }
  .dock-middle {
    flex: 1;
    display: flex;
    align-items: stretch;
    flex-direction: row;

    .dock-left {
      overflow: auto;
    }

    .dock-center {
      flex: 1;
      overflow: auto;
    }

    .dock-right {
      overflow: auto;
    }
  }

  .dock-bottom {
    overflow: auto;
  }
}
</style>

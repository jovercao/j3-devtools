<template>
  <div :class="['dock-panel', { fill: fille } ]">
    <div class="top">
      <slot name="top"></slot>
    </div>
    <div class="middle">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="bottom">
      <slot name="bottom"></slot>
    </div>
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
    centerClass: String,
    fill: Boolean
  }
}
</script>


<style lang="less" scoped>
.dock-panel {
  border: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .top {
    overflow: auto;
  }
  .middle {
    flex: 1 1 0px;
    display: flex;
    align-items: stretch;
    flex-direction: row;

    .left {
      overflow: auto;
    }

    .center {
      flex: 1 1 0px;
      overflow: auto;
    }

    .right {
      overflow: auto;
    }
  }

  .bottom {
    overflow: auto;
  }
}

.dock-panel.fill {
  width: 100%;
  height: 100%;
}
</style>

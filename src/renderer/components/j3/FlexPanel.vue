<template>
  <div class="j3-flex-panel" :style="{ 'align-items': align, 'flex-direction': direction === 'vertical' ? 'column' : 'row' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    align: {
      type: String,
      default: 'stretch'
    },
    direction: {
      type: String,
      default: 'horizontal'
    }
  }
}
</script>

<style lang="less">
.j3-flex-panel {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>

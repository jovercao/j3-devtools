<template>
  <div class="j3-flex-panel" :style="{
      'align-items': align,
      'flex-direction': direction === 'vertical' ? 'column' : 'row',
      width: fill ? '100%' : 'auto',
      height: fill ? '100%' : 'auto'
    }">
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
    fill: {
      type: Boolean,
      default: true
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

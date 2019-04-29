<template>
  <div class="flex-layout" :style="{
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
.flex-layout {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>

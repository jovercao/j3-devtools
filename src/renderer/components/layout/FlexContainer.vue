<template>
  <div class="j3-flex-container" :style="{ 'align-items': align, 'flex-direction': direction === 'vertical' ? 'column' : 'row' }">
    <slot :direction="direction"></slot>
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
.j3-flex-container {
  display: flex;
}
</style>

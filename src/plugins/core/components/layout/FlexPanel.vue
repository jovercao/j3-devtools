<template>
  <div class="flex-panel" :style="{ 'flex-basis' :  $helper.metric(thickness), 'flex-grow': grow }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    thickness: {
      type: [Number, String],
      default: 150
    },
    grow: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="less">
.flex-panel {
  flex: 0 0 150px;
}
</style>

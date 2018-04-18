<template>
  <div :style="{ 'flex-basis' :  $helper.metric(thickness), 'flex-grow': grow }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    thickness: {
      type: [Number, String],
      default: 0
    },
    grow: {
      type: Number,
      default: null
    }
  }
}
</script>

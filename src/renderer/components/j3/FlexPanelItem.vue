<template>
  <div :style="{ 'flex-basis' :  $helper.metric(thickness), 'flex-grow': grow }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    thickness: [Number, String],
    grow: {
      type: Number,
      default: null
    }
  }
}
</script>

<template>
  <span>{{value.toString()}}</span>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: ''
    },
    font: {
      fontSize: Number,
      default: 11
    }
  }
}
</script>

<template>
  <i :class="{ 'material-icons': type === 'material', [value]: type !== 'material' }"
  :style="{ 'font-size': size + 'px' }">
    {{ type === 'material' ? value : '' }}
  </i>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'block'
    },
    size: {
      type: Number,
      default: 16
    },
    hoverValue: String
  },
  computed: {
    type() {
      if (this.value.startsWith('el-icon-')) {
        return 'element'
      }
      return 'material'
    }
  }
}
</script>

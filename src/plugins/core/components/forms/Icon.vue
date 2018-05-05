<template>
  <i :class="{ 'material-icons': type === 'material' }" :style="{ 'font-size': size + 'px' }">{{value}}</i>
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
    type: {
      type: String,
      default: 'material',
      selections: [
        'material',
        'other'
      ]
    },
    hoverValue: String
  },
  computed: {
    content() {
      if (this.type === 'material') {
        return this.value
      }
      return ''
    }
  }
}
</script>

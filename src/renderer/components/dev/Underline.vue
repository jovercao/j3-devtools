<template>
  <div>
    <hr class="mu-text-field-line text-field-underline" :class="lineClass" />
    <hr v-if="!disabled" class="mu-text-field-focus-line" :class="focusLineClass"/>
  </div>
</template>

<script>

export default {
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lineClass () {
      const {disabled} = this
      let classNames = []
      if (disabled) classNames.push('disabled')
      return classNames
    },
    focusLineClass () {
      const {focus} = this
      let classNames = []
      if (focus) classNames.push('focus')
      return classNames
    }
  }
}
</script>

<style lang="less">
.text-field-underline {
  background: #999;
}
</style>

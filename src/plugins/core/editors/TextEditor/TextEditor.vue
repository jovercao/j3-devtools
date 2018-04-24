<template>
  <textarea class="text-editor" :value="value" @change="$emit('change', $event.currentTarget.value)">
  </textarea>
</template>

<script>
import ctx from '@'
// mixin 将被注入
export default {
  mixins: [
    ctx.mixin('editor')
  ],
  name: 'text-editor'
}
</script>

<style lang="less">
  .text-editor {
    width: 100%;
    height: 100%;
    padding: 8px;
  }
</style>

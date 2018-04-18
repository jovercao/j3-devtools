<template>
  <textarea class="text-editor" v-model="value" @change="$emit('change', $event.currentTarget.value)">
  </textarea>
</template>

<script>
export default {
  name: 'text-editor',
  props: {
    value: String
  }
}
</script>

<style lang="less">
  .text-editor {
    width: 100%;
    height: 100%;
    padding: 8px;
  }
</style>

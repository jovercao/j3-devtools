<template>
  <textarea class="text-editor" v-model="value" @change="$emit('change', $event.currentTarget.value)">
  </textarea>
</template>

<script>
export default {
  props: {
    value: String
  }
}
</script>

<style>
  .text-editor {
    width: 100%;
    height: 100%;
  }
</style>

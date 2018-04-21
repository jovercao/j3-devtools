<template>
  <div class="code-view" >
    <div v-if="viewData" v-html="htmlCode">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      sourceCode: '',
      htmlCode: ''
    }
  },
  computed: {
    ...mapState('vue-editor', ['viewData'])
  },
  activated() {
    if (!this.viewData) {
      this.sourceCode = ''
      this.htmlCode = '<h1>尚未打开组件</h1>'
    } else {
      this.sourceCode = this.$service.generate.view(this.viewData)
      this.htmlCode = this.$helper.markVue(this.sourceCode)
    }
  }
}
</script>

<style lang="less" scoped>

.code-view {
  padding: 28px;
}
</style>

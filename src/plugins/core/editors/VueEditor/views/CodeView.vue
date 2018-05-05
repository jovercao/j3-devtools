<template>
  <div class="code-view" >
    <div v-if="value" v-html="htmlCode">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { namespace } from '../../../store/vue-editor'

export default {
  props: {
    value: Object
  },
  data() {
    return {
      sourceCode: '',
      htmlCode: ''
    }
  },
  computed: {
    ...mapGetters(namespace, [ 'components' ])
  },
  activated() {
    if (!this.value) {
      this.sourceCode = ''
      this.htmlCode = '<h1>尚未打开组件</h1>'
    } else {
      this.sourceCode = this.$service.generate.view(this.value, this.components)
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

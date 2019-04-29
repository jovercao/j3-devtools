<template>
  <div class="code-view" >
    <div v-if="value" v-html="htmlCode" class="code">
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
      this.htmlCode = this.$helper.markVue(this.sourceCode).replace(/\n/g, '<br/>')
    }
  }
}
</script>

<style lang="less">

.code-view {
  display: flex;
  align-items: stretch;
  .code {
    padding-left: 18px;
    flex: 1;
    flex-basis: 100px;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
    
}

pre {
  white-space: pre;
}

</style>

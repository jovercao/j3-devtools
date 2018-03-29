<template>
  <div class="code-view" >
    <div v-if="viewData" v-html="htmlCode">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'
import modules from '../../../store/store-modules'
import 'highlight.js/styles/default.css'
import hljs from 'highlight.js'

var rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

export default {
  computed: {
    ...mapState(modules.UiDesigner, ['viewData']),
    sourceCode() {
      return this.$service.generate(this.viewData)
    },
    htmlCode() {
      return marked('```html\n' + this.sourceCode + '\n```')
    }
  }
}
</script>

<style lang="less" scoped>

.code-view {
  padding: 28px;
}
</style>

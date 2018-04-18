import TextEditor from './TextEditor.vue'
import Vue from 'vue'

Vue.component(TextEditor.name, TextEditor)

export default {
  icon: 'el-icon-document',
  name: 'text-editor',
  component: TextEditor.name,
  title: '纯文本编辑器',
  description: '用于编辑纯文本文件'
}

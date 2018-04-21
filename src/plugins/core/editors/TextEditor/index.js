import TextEditor from './TextEditor.vue'
import ctx from '@'
import _ from 'lodash'

ctx.Vue.component(TextEditor.name, TextEditor)
// 注入
ctx.mixin.joinTo('editor', TextEditor)

export default {
  icon: 'el-icon-document',
  name: 'text-editor',
  component: TextEditor.name,
  title: '纯文本编辑器',
  description: '用于编辑纯文本文件',
  contentTypes: [
    'text',
    'txt'
  ],
  tools: [
    {
      icon: 'el-icon-search',
      title: '预览',
      command: 'ide-view'
    }
  ],
  // 从源数据进行转换
  convertFrom(value) {
    return _.toString(value)
  },
  convertTo(value) {
    return value
  }
}

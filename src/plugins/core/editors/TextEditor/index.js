import TextEditor from './TextEditor.vue'
import ctx from '@'
import { fromBuffer, toBuffer } from './util'

ctx.Vue.component(TextEditor.name, TextEditor)

export default {
  icon: 'el-icon-document',
  name: 'text-editor',
  component: TextEditor.name,
  title: '纯文本编辑器',
  description: '用于编辑纯文本文件',
  contentTypes: [
    'text',
    'txt',
    'md',
    'js',
    'json',
    'xml',
    'ini',
    'html',
    'css',
    'vue',
    'jade'
  ],
  tools: [
    {
      icon: 'el-icon-search',
      title: '预览',
      command: 'ide-view'
    }
  ],
  // 从源数据进行转换
  convertFrom(buffer) {
    return fromBuffer(buffer)
  },
  convertTo(value) {
    return toBuffer(value)
  }
}

import VueEditor from './VueEditor.vue'
import Vue from 'vue'

Vue.component(VueEditor.name, VueEditor)

export default {
  icon: 'el-icon-document',
  name: VueEditor.name,
  component: VueEditor.name,
  title: 'Vue编辑器',
  description: '用于编辑vue视图文件',
  contentTypes: [
    'jvus'
  ]
}

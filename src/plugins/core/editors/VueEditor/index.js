import VueEditor from './VueEditor.vue'
import Vue from 'vue'
import _ from 'lodash'
import { unproperVue } from '../../helper/viewData'

Vue.component(VueEditor.name, VueEditor)

export default {
  icon: 'el-icon-document',
  name: VueEditor.name,
  component: VueEditor.name,
  title: 'Vue编辑器',
  description: '用于编辑vue视图文件',
  contentTypes: [
    'jvue'
  ],
  convertFrom(src) {
    return JSON.parse(_.toString(src))
  },
  convertTo(value) {
    const newItem = unproperVue(value)
    return JSON.stringify(newItem)
  }
}

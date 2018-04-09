import _ from 'lodash'
import Vue from 'vue'

export default function (VueComponent) {
  if (_.isString(VueComponent)) {
    const tag = VueComponent
    VueComponent = Vue.component(VueComponent)
    if (!VueComponent) {
      throw new Error(`组件${tag}未定义或者尚未注册。`)
    }
  }
  return _.cloneDeep(VueComponent.options.props)
}

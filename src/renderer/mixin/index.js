import editor from './editor'
import service from '../service'
import _ from 'lodash'
import Vue from 'vue'
import base from './base'

const Mixins = {}

export default function mixin(name, mixin) {
  if (mixin) {
    if (Mixins[name] && mixin !== Mixins[name]) {
      throw new Error(`混入器命名冲突！ 名称'${name}'已经存在！`)
    }
    Mixins[name] = mixin
    return
  }
  if (!Mixins[name]) {
    throw new Error(`不存在的混入器'${name}'！`)
  }
  return Mixins[name]
}
/**
 * 将指定的混入器注入指定组件。
 * @param {string} name - 混入器名称
 * @param {VueComponent} component - 要注入到的组件
 */
mixin.joinTo = function(name, ...components) {
  const item = mixin(name)
  for (const component of components) {
    if (_.isFunction(component)) {
      component.mixin(item)
    } else {
      const mixins = component.mixins = component.mixins || []
      mixins.push(item)
    }
  }
}

mixin('editor', editor)
// base
Vue.mixin(base)

service('mixin', mixin)

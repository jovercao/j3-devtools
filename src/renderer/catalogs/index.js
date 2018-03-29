import { components, templates, categroy } from './components'
import attributes from './attributes'
import actions from './actions'
import bindings from './bindings'

export default {
  components,
  templates,
  categroy,
  attributes,
  actions,
  bindings
}

export {
  components,
  categroy,
  attributes,
  actions,
  bindings
}

export const CatalogsPlugin = {
  install(Vue) {
    Object.assign(Vue.prototype, {
      $comps: components,
      $attrs: attributes,
      $actions: actions,
      $bindings: bindings
    })
  }
}

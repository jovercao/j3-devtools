import _ from 'lodash'

export default {
  name: 'contextmenu',

  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode, oldVnode) {
    if (el) {
      const exp = binding.value
      if (!_.isFunction(exp)) {
        throw new Error('值必须为函数')
      }

      el.addEventListener('contextmenu', event => {
        exp.call(vnode.componentInstance, vnode.componentInstance, event.target)
        event.stopPropagation()
      })
    }
  }
}

export default {
  name: 'focus',

  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode, oldVnode) {
    if (el) {
      el.focus()
    }
  }
}

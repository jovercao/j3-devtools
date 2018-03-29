export default {
  name: 'designer-mode',

  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, bindings, vnode, oldVnode) {
    if (el) {
      el.addEventListener('click', event => {
        vnode.componentInstance.$emit('$designer-select', event)
        event.stopPropagation()
      })

      el.addEventListener('mouseover', evert => {
        vnode.componentInstance.$emit('$designer-mouseover', event)
        event.stopPropagation()
      })

      el.addEventListener('mouseleave', evert => {
        vnode.componentInstance.$emit('$designer-mouseleave', event)
        event.stopPropagation()
      })
    }
  }
}

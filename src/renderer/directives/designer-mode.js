export default {
  name: 'designer-mode',

  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, bindings, vnode, oldVnode) {
    if (el) {
      const vm = vnode.componentInstance
      el.draggable = true

      el.addEventListener('click', event => {
        vm.$emit('$designer-select', event)
        event.stopPropagation()
      })

      el.addEventListener('mouseover', evert => {
        vm.$emit('$designer-mouseover', event)
        event.stopPropagation()
      })

      el.addEventListener('contextmenu', event => {
        vm.$emit('$designer-contextmenu', event)
        event.stopPropagation()
      })

      el.addEventListener('mouseleave', event => {
        vm.$emit('$designer-mouseleave', event)
        event.stopPropagation()
      })

      el.addEventListener('dragstart', event => {
        vm.$emit('$designer-dragstart', event)
        //  (value) => {
        //   const json = JSON.stringify(value)
        //   event.dataTransfer.setData('text', json)
        // }, event)
        event.stopPropagation()
      })

      el.addEventListener('dragend', event => {
        vm.$emit('$designer-dragend', event)
        //  (value) => {
        //   const json = JSON.stringify(value)
        //   event.dataTransfer.setData('text', json)
        // }, event)
        event.stopPropagation()
      })

      el.addEventListener('dragleave', event => {
        vm.$emit('$designer-dragleave', event)
        event.stopPropagation()
      })

      el.addEventListener('dragover', event => {
        vm.$emit('$designer-dragover', event)
        //  () => {
        //   const json = event.dataTransfer.getData('text')
        //   const data = JSON.parse(json)
        //   return data
        // })
        event.stopPropagation()
        // event.preventDefault()
      })

      el.addEventListener('drop', event => {
        vm.$emit('$designer-drop', event, () => {
          const json = event.dataTransfer.getData('text')
          const data = JSON.parse(json)
          event.dataTransfer.clear()
          return data
        })
        event.stopPropagation()
      })
    }
  }
}

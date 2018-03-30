import _ from 'lodash'

export default {
  name: 'draggable',

  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode, oldVnode) {
    if (el) {
      // let viewData = _.cloneDeep(bindings.value)
      el.draggable = true

      el.addEventListener('dragstart', event => {
        let data
        if (!_.isEmpty(binding.value)) {
          data = binding.value
          const json = JSON.stringify(data)
          event.dataTransfer.setData('text', json)
        }
        // event.stopPropagation()
        vnode.componentInstance.$emit('dragstart', data, event)
      })
      el.addEventListener('dragend', event => {
        // event.dataTransfer.clearData()
        vnode.componentInstance.$emit('dragend', null, event)
      })
    }
  }
}

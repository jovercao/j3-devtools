// import _ from 'lodash'

export default {
  name: 'draggable',

  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode, oldVnode) {
    if (el) {
      // let viewData = _.cloneDeep(bindings.value)
      el.draggable = true

      el.addEventListener('dragstart', event => {
        console.log(binding.value)
        const json = JSON.stringify(binding.value)
        event.dataTransfer.setData(binding.arg, json)
        // event.stopPropagation()
      })
    }
  }
}

export default {
  name: 'dropable',

  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode, oldVnode) {
    if (el) {
      el.draggable = true
      const exp = binding.value

      el.addEventListener('dragover', event => {
        event.preventDefault()
      })

      el.addEventListener('drop', event => {
        const json = event.dataTransfer.getData(binding.arg)
        const data = JSON.parse(json)
        console.log(data)
        exp(data)
        event.stopPropagation()
      })
    }
  }
}

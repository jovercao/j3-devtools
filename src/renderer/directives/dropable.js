import _ from 'lodash'

export default {
  name: 'dropable',

  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode, oldVnode) {
    if (el) {
      // const exp = binding.value
      // if (!_.isFunction(exp)) {
      //   throw new Error('表达式必须为函数')
      // }
      const vm = vnode.componentInstance
      el.addEventListener('dragover', event => {
        const getData = () => {
          const json = event.dataTransfer.getData(binding.arg)
          return JSON.parse(json)
        }
        vm.$emit('dragover', event, getData)
        event.stopPropagation()
        event.preventDefault()
      })

      el.addEventListener('drop', event => {
        const getData = () => {
          const json = event.dataTransfer.getData(binding.arg)
          return JSON.parse(json)
        }
        vm.$emit('drop', event, getData)
        const exp = binding.value
        if (_.isFunction(exp)) {
          const data = getData()
          exp.call(vm, data)
        }
        event.stopPropagation()
      })
    }
  }
}

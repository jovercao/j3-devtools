import _ from 'lodash'

/**
 * @module pass-event - 事件传递指令
 * 本指令可以将子组件中的事件传递到父组件中，让父组件也响应该事件，仅作为事件传递语法糖
 * ```html
 * <template>
 *  <div><button v-pass-event="['click']"></button></div>
 * </template>
 * <script>
 * </script>
 * ```
 */

/**
 * @param {*} vm - 当前组件
 * @param {*} child - 子组件
 * @param {*} events - 事件函数
 */
function passEvent(vm, child, events) {
  if (_.isString(events)) events = [ events ]
  if (_.isArray(events)) {
    events.forEach(event => {
      child.on(event, (...args) => vm.$emit(event, ...args))
    })
    return
  }
  if (_.isObject(events)) {
    for (const sourceEvent in events) {
      const value = events[sourceEvent]
      let targetEvent, param
      if (_.isString(value)) {
        targetEvent = value
      } else {
        targetEvent = value.event
        param = value.param
      }
      child.on(sourceEvent, (...args) => {
        if (param) args = param(args)
        vm.$emit(targetEvent, ...args)
      })
    }
  }
}

export default {
  name: 'pass-event',
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, binding, vnode, oldVnode) {
    const vm = vnode.componentInstance
    const events = binding.value
    if (vm.$parent) {
      // 传递事件
      passEvent(vm.$parent, vm, events)
    }
  }
}

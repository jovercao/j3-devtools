import _ from 'lodash'

/**
 * vue组件工具类
 */
export default {
  /**
   * 从子组件传递事件到父组件中，以此来减少编码量。
   * @param {VueComponent} vm - 当前组件
   * @param {VueComponent} child - 子组件
   * @param {*} events - 要传递的事件
   */
  passEvent(vm, child, events) {
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
}

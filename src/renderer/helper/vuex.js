// 本文件对Vuex的映射进行扩展
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'

export const mapPropertiesConfig = {
  setterMutation: 'mapProperties#setterMutation',
  stateKeyName: 'key',
  stateValueName: 'value'
}

/**
 * 将state 映射到指定的对象中
 * @param {object} receiver - 接收属性的对象
 * @param {boolean} readOnly - 是否只读
 * @param {array} args - 映射参数，同mapState参数
 */
export function mapProperties(receiver, readOnly, mapper = mapState, ...args) {
  const getters = mapper(...args)
  let modulePath = _.isString(args[0]) ? args[0] : undefined
  // 获取唯一的设置器，如果没有指定模块路径，则获取根路径。
  const setter = modulePath ? mapMutations(modulePath, [mapPropertiesConfig.setterMutation])[mapPropertiesConfig.setterMutation]
    : mapMutations([mapPropertiesConfig.setterMutation])[mapPropertiesConfig.setterMutation]

  // 将getter函数转化为属性
  for (const key in getters) {
    const getter = getters[key]

    Object.defineProperty(receiver, key, {
      // writable: !readOnly,
      enumerable: true,
      get() {
        return getter.call(receiver)
      },
      set: readOnly ? undefined : value => {
        setter.call(receiver, { [mapPropertiesConfig.stateKeyName]: key, [mapPropertiesConfig.stateValueName]: value })
      }
    })
  }
}

export function PropertiesSetterMutation(custom) {
  return function(state, playload) {
    const key = playload[mapPropertiesConfig.stateKeyName]
    const value = playload[mapPropertiesConfig.stateValueName]

    const setter = (value) => {
      const paths = key.split('.')
      let target = state
      for (let i = 0; i < paths.length - 1; i++) {
        const path = paths[i]
        target = target[path]
      }
      // 设置属性
      target[paths[paths.length - 1]] = value
    }

    if (_.isFunction(custom)) {
      custom.call(this, state, key, value, setter)
    } else {
      setter(value)
    }

  }
}

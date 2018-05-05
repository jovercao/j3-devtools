// 本文件对Vuex的映射进行扩展
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
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

/**
 * 创建一个属性设置函数,使用方法
 * const store = new Vuex.Store({
 * mutations: {
 *   ...setterMutation(function(state, key, value, setter) {
 *      f
 *   })
 * },
 * ...
 * @param {function} custom - 可选的，如果不设置自定义函数，则将使用setter函数， function(state, key, value, setter) 不能使用箭头函数，否则将无法绑定store。
 */
export function setterMutation(custom) {
  return {
    [mapPropertiesConfig.setterMutation](state, playload) {
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
}

/**
 *  * 将整个store 映射为
 * @param {object} store - store 实例
 * @param {string} namespace - 要映射的模块, module路径
 * @param {boolean} stateWritable - state是否可写
 * @param {boolean} getterWritable - getter是否可写
 */
export function mapStore(store, namespace, stateWritable = true, getterWritable = false) {
  // 使用了内部成员，可能会进行更改
  const options = store._modules.root._rawModule
  const api = {
    $store: store
  }
  const publicMutations = Object.keys(options.mutations || {}).filter(name => !name.startsWith('_'))
  const publicActions = Object.keys(options.actions || {}).filter(name => !name.startsWith('_'))
  if (namespace) {
    Object.assign(api,
      mapMutations(namespace, publicMutations),
      mapActions(namespace, publicActions)
    )
  } else {
    Object.assign(api,
      mapMutations(publicMutations),
      mapActions(publicActions)
    )
  }

  // 如果有定义属性修改mutation
  if (!options.mutations && options.mutations[mapPropertiesConfig.setterMutation] && (stateWritable || getterWritable)) {
    throw new Error(`可写state或getter，必须定义setter mutation ${mapPropertiesConfig.setterMutation}`)
  }
  // 映射state
  mapProperties(api, stateWritable, mapState, Object.keys(options.state || {}).filter(name => !name.startsWith('_')))
  // 映射getters
  mapProperties(api, getterWritable, mapGetters, Object.keys(options.getters || {}).filter(name => !name.startsWith('_')))

  // 注册子模块
  for (const key in store._modules.root._children) {
    const paths = key.split('/')
    const moduleName = '$' + paths[paths.length - 1]
    let item = api
    if (paths.length >= 2) {
      const items = [item].concat(paths.slice(0, -1))
      item = items.reduce((item, key) => item[key] || (item[key] = {}))
    }
    item[moduleName] = mapStore(store, key, stateWritable, getterWritable)
    // 处理为api别名，便于使用.运算符访问
    if (moduleName.includes('-')) {
      const list = moduleName.split('-')
      const apiName = list.reduce((name, item) => name + item[0].toUpperCase() + item.substr(1))
      if (item[apiName]) throw new Error('命名冲突')
      item[apiName] = item[moduleName]
    }
  }

  return api
}

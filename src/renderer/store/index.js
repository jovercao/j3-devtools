import Vue from 'vue'
import Vuex from 'vuex'
import root from './root'
import dynamic from './dynamic'
import namespaces from './namespaces'
import _ from 'lodash'
import { normalizeModule } from '../utils/vuex'

Vue.use(Vuex)
const bind = normalizeModule(root)
const instance = new Vuex.Store(root)
bind(instance)

/**
 * 注册模块 或者 注销模块 以及获取store
 * @param {string} namespace - 模块名称
 * @param {*} module - 模块配置，请参考Vuex moduel
 */
function store(namespace, module) {
  if (module) {
    const path = namespace ? namespace.split('/') : []
    if (instance._modules.get(path)) {
      throw new Error(`Store模块命名冲突，命名空间'${namespace}'已被注册！`)
    }
    normalizeModule(module)(instance)
    return instance.registerModule(path, module)
  }
  if (_.isString(namespace)) {
    return instance.unregisterModule(namespace)
  }

  if (_.isObject(namespace)) {
    const options = namespace
    for (const key in options) {
      store(key, options[key])
    }
  }
  // 直接调用返回
  return instance
}

// 注册服务
// 注册动态组件模块
store(namespaces.dynamic, dynamic)

export default store

// if (module.hot) {
//   // 使 action 和 mutation 成为可热重载模块
//   module.hot.accept(['./mutations', './modules/a'], () => {
//     // 获取更新后的模块
//     // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
//     const newMutations = require('./mutations').default
//     const newModuleA = require('./modules/a').default
//     // 加载新模块
//     store.hotUpdate({
//       mutations: newMutations,
//       modules: {
//         a: newModuleA
//       }
//     })
//   })
// }

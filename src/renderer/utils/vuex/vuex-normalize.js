import StateHelper from './vuex-state-helper'

const stateHelperMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
  'set',
  'delete',
  'invoke'
]

/**
 * methods下的每一个成员都会自动生成一组action及mutation
 * 生成的action与method同名，如遇命名冲突，则会报错
 * 而生成的mutation名称则会在method名前加上一个@，同时mutation的是隐式的，不建议直接进行调用
 * @param {VuexModel} module - 可自动化action的vuex 的module
 */
export function normalizeModule(module) {
  const {
    methods,
    syncMethods
  } = module

  const mutations = module.mutations || (module.mutations = {})
  const actions = module.actions || (module.actions = {})
  // store实例，跨模块调用。
  // let $store

  function syncCall(local, context, methodName, method, playload) {
    const stateHelper = new StateHelper(local.state, methodName)
    stateHelper.invoke(() => method.call(context, playload))
    local.commit(`@${methodName}`, stateHelper)
    return stateHelper.result[0]
  }

  function submitChanges(state, stateHelper) {
    stateHelper.submit()
  }

  function createContext(local, { methodName, root, namespace }) {
    const { commit, dispatch, state, getters, rootState, rootGetters } = local
    let stateHelper
    return new Proxy({}, {
      has(target, key) {
        return !!actions[key]
      },
      ownKeys(target) {
        return Object.keys(actions)
      },
      get(target, key, receiver) {
        if (key === 'state') {
          let $state = root ? rootState : state
          // 获取命名空间下的state
          if (namespace) {
            return namespace.split('/').reduce((state, key) => state[key], $state)
          }
          return $state
        }

        if (key === 'getters') {
          let $getters = root ? rootGetters : getters
          // 获取命名空间下的state
          if (namespace) {
            return namespace.split('/').reduce((getter, key) => getter[key], $getters)
          }
          return $getters
        }

        // 访问要模块
        if (key === '$root') {
          return createContext(local, { root: true })
        }

        // 含状态, action 内context
        if (methodName && key.startsWith('$')) {
          const shmName = key.substr(1)
          if (!stateHelper) stateHelper = new StateHelper()
          // state
          if (stateHelperMethods.includes(shmName)) {
            return function(...args) {
              stateHelper[shmName](...args)
            }
          }

          if (key === '$commit') {
            return function(handler) {
              if (handler) {
                stateHelper.invoke(handler)
              }
              // 未修改，不提交
              if (!stateHelper.changes.length === 0) {
                return
              }
              commit(`@${methodName}`, stateHelper)
              return stateHelper.result
            }
          }
        }

        // 访问子模块
        if (key.startsWith('$')) {
          const subModule = key.substr(1)
          namespace = namespace ? `${namespace}/${subModule}` : subModule
          return createContext(local, root, namespace)
        }

        // 获取方法
        if (!root && !namespace && actions[key]) {
          // 当前模块的同步方法
          if (syncMethods[key]) {
            return function(playload) {
              const context = createContext(local, { methodName: key })
              return syncCall(local, context, key, syncMethods[key], playload)
            }
          }
        }
        // // 如果访问的是别的模块，并且绑定了store
        // if ((root || namespace) && $store) {
        //   // 判断是否为同步方法
        //   const targetModule = $store._modules.get(namespace.split('/'))._rawModule
        //   if (targetModule.syncMethods[key]) {
        //     const context = createContext(local, { methodName: key, namespace, root })
        //     syncCall(local, )
        //   }
        // }

        return function (playload) {
          let type = namespace ? `${namespace}/${key}` : key
          return dispatch(type, playload, { root })
        }
      },
      set() {
        throw new Error('method context 不允许set操作！')
      }
    })
  }

  const normalizeMethod = (methodKey, method, isSync) => {
    // const method = methods[methodKey]
    const methodType = `@${methodKey}`
    if (actions[methodKey]) {
      throw new Error(`store module， method名称 '${methodKey}' 命名冲突！已存在同名action '${methodKey}'`)
    }
    if (mutations[methodType]) {
      throw new Error(`store module， method名称 '${methodKey}' 命名冲突！已存在同名mutation '${methodType}'`)
    }
    // 添加mutation
    mutations[methodType] = submitChanges

    // 同步的方法
    if (isSync) {
      if (Object.prototype.toString.call(method) === '[object AsyncFunction]') {
        throw new Error('同步方法不允许定义为 async/await 函数')
      }
    }

    // 添加actions
    actions[methodKey] = function (local, playload) {
      const context = createContext(local, { methodName: methodKey })
      if (isSync) {
        return syncCall(local, context, methodKey, method, playload)
      }
      return method.call(context, playload)
    }

  }
  methods && Object.keys(methods).forEach((key) => normalizeMethod(key, methods[key], false))
  syncMethods && Object.keys(syncMethods).forEach(key => normalizeMethod(key, syncMethods[key], true))

  if (module.modules) {
    Object.keys(module.modules).forEach(name => {
      if (stateHelperMethods.includes(name)) {
        throw new Error(`命名冲突!模块${name} 与 context.${name}冲突,请修改后再进行。`)
      }
      normalizeModule(module.modules[name])
    })
  }

  return function bindStore(store) {
    // $store = store
  }
}

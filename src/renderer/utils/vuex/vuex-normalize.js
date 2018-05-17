import StateHelper from './vuex-state-helper'

const stateHelperMethods = [
  '$push',
  '$pop',
  '$shift',
  '$unshift',
  '$splice',
  '$sort',
  '$reverse',
  '$set',
  '$delete',
  '$invoke'
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
  let actionKeys

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
    mutations[methodType] = function submitChanges(state, stateHelper) {
      stateHelper.submit()
    }

    // 同步的方法
    if (isSync) {
      if (Object.prototype.toString.call(method) === '[object AsyncFunction]') {
        throw new Error('同步方法不允许定义为 async/await 函数')
      }
    }

    // 添加actions
    actions[methodKey] = function (local, playload) {
      const {
        commit,
        dispatch,
        state,
        getters,
        rootState,
        rootGetters
      } = local
      let stateHelper
      const getStateHelper = () => stateHelper || (stateHelper = new StateHelper())
      const createContext = (root, namespace) => {
        return new Proxy({}, {
          has(target, key) {
            return actionKeys.includes(key)
          },
          ownKeys(target) {
            return actionKeys
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

            // state
            if (!isSync && stateHelperMethods.includes(key)) {
              return function(...args) {
                getStateHelper()[key.substr(1)](...args)
              }
            }

            if (!isSync && key === '$commit') {
              return function (handler) {
                if (handler) {
                  getStateHelper().invoke(handler)
                }
                // 未修改，不提交
                if (!stateHelper || stateHelper.changes.length === 0) {
                  return
                }
                commit(methodType, stateHelper)
              }
            }

            // 访问要模块
            if (key === '$root') {
              return createContext(true)
            }
            // 访问子模块
            if (key.startsWith('$')) {
              const subModule = key.substr(1)
              namespace = namespace ? `${namespace}/${subModule}` : subModule
              return createContext(root, namespace)
            }

            // 如果是访问当前模块，则加入检测，否则无法检测
            if (!root && !namespace && !actionKeys.includes(key)) {
              throw new Error(`没有找到指定的method 或 action '${key}'。`)
            }

            return function (...args) {
              let type = namespace ? `${namespace}/${key}` : key
              return dispatch(type, ...args, { root })
            }
          },
          set() {
            throw new Error('method context 不允许set操作！')
          }
        })
      }
      const context = createContext(false)

      if (isSync) {
        const helper = getStateHelper()
        helper.invoke(() => method.call(context, playload))
        commit(methodType, helper)
        return helper.result[0]
      } else {
        return method.call(context, playload)
      }

    }
  }
  methods && Object.keys(methods).forEach((key) => normalizeMethod(key, methods[key], false))
  syncMethods && Object.keys(syncMethods).forEach(key => normalizeMethod(key, syncMethods[key], true))

  if (module.modules) {
    Object.keys(module.modules).forEach(name => normalizeModule(module.modules[name]))
  }
  actionKeys = Object.keys(actions)

  return module
}

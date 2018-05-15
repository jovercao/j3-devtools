import StateHelper from './vuex-state-helper'

// const stateMethods = [
//   '$push',
//   '$pop',
//   '$shift',
//   '$unshift',
//   '$splice',
//   '$sort',
//   '$reverse',
//   '$set',
//   '$delete',
//   '$invoke'
// ]

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
        getters
      } = local
      let stateHelper
      const context = new Proxy({}, {
        has(target, key) {
          return actionKeys.includes(key)
        },
        ownKeys(target) {
          return actionKeys
        },
        get(target, key, receiver) {

          if (key === 'state') {
            return state
          }

          if (key === 'getters') {
            return getters
          }

          if (!isSync && key === '$commit') {
            return function (handler) {
              if (handler) {
                if (!stateHelper) stateHelper = new StateHelper(state)
                stateHelper.invoke(handler)
              }
              // 未修改，不提交
              if (!stateHelper || stateHelper.changes.length === 0) {
                return
              }
              commit(methodType, stateHelper)
            }
          }

          if (!isSync && key.startsWith('$')) {
            if (!stateHelper) stateHelper = new StateHelper(state)
            return function(...args) {
              stateHelper[key.substr(1)](...args)
            }
          }

          if (!actionKeys.includes(key)) {
            throw new Error(`没有找到指定的method 或 action '${key}'。`)
          }

          return function (...args) {
            return dispatch(key, ...args)
          }
        },
        set() {
          throw new Error('method context 不允许set操作！')
        }
      })
      if (isSync) {
        const helper = new StateHelper()
        helper.invoke(() => method.call(context, playload))
        commit(methodType, helper)
      } else {
        method.call(context, playload)
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

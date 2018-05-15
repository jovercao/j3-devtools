import StateHelper from './vuex-state-helper'
import Vue from 'vue'

const stateMethods = [
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
    methods
  } = module
  if (!methods) return module
  const mutations = module.mutations || (module.mutations = {})
  const actions = module.actions || (module.actions = {})

  const methodKeys = Object.keys(methods)
  methodKeys.forEach(methodKey => {
    const handler = methods[methodKey]
    const methodType = `@${methodKey}`
    if (actions[methodKey]) {
      throw new Error(`store module， method名称 '${methodKey}' 命名冲突！已存在同名action '${methodKey}'`)
    }
    if (mutations[methodType]) {
      throw new Error(`store module， method名称 '${methodKey}' 命名冲突！已存在同名mutation '${methodType}'`)
    }
    // 添加mutation
    mutations[methodType] = function submitChanges(state, changes) {
      changes.forEach(({
        action,
        object,
        key,
        array,
        value,
        args,
        handler
      }) => {
        try {
          switch (action) {
            case 'set':
              // 赋值操作
              Vue.set(object, key, value)
              break
            case 'delete':
              // 删除值
              Vue.delete(object, key)
              break
            case 'invoke':
              handler(state)
              break
            default:
              // 数组操作
              array[action](args)
              break
          }
        } catch (err) {
          throw new Error(`method ${methodKey} ${action} 操作错误，详细信息： ${err}`)
        }
      })
    }

    // 添加actions
    actions[methodKey] = function (local, playload) {
      const {
        commit,
        dispatch,
        state
      } = local
      let stateHelper
      const context = new Proxy({}, {
        has(target, key) {
          return methodKeys.includes(key)
        },
        ownKeys(target) {
          return methodKeys
        },
        get(target, key) {

          if (key === '$commit') {
            return function () {
              // 未修改，不提交
              if (!stateHelper || stateHelper.changes.length === 0) {
                return
              }
              commit(methodType, stateHelper.changes)
            }
          }

          if (key === '$state') {
            return state
          }

          // 将state helper 的方法提出
          if (stateMethods.includes(key)) {
            if (!stateHelper) stateHelper = new StateHelper()
            return function (...args) {
              stateHelper[key.substr(1)](...args)
            }
          }

          if (!methodKeys.includes(key)) {
            throw new Error(`没有找到指定的method'${key}'。`)
          }

          return function (...args) {
            return dispatch(key, ...args)
          }
        },
        set() {
          throw new Error('action context 不允许set操作！')
        }
      })
      context.$invoke(handler)
      context.$commit()
      handler.call(context, playload)
    }
  })
  if (module.modules) {
    Object.keys(module.modules).forEach(name => normalizeModule(module.modules[name]))
  }
  return module
}

/**
 * 状态修改记录器
 */
import assert from 'assert'
import _ from 'lodash'
import Vue from 'vue'

export default class StateHelper {
  constructor(state) {
    this._state = state
    this._changes = []
    this._returnValues = []
    this._submited = false
  }

  set(object, key, value) {
    assert(_.isObject(object) || _.isArray(object), 'object 参数不允许为空！')
    assert(key, 'key不能为空值！')

    this._changes.push({
      action: 'set',
      object,
      key,
      value
    })
  }

  delete(object, key) {
    assert(_.isObject(object) || _.isArray(object), 'object 参数不允许为空！')
    assert(key, 'key不能为空值！')

    this._changes.push({
      action: 'delete',
      object,
      key
    })
  }

  invoke(handler) {
    assert(_.isFunction(handler), 'handler 参数必须为函数！')
    this._changes.push({
      action: 'invoke',
      handler: () => handler(this._state)
    })
  }

  push(array, ...args) {
    assert(_.isArray(array), 'object 参数必须为array类型！')
    this._changes.push({
      action: 'push',
      array,
      args
    })
  }

  pop(array, key, value) {
    assert(_.isArray(array), 'object 参数必须为array类型！')
    this._changes.push({
      action: 'pop',
      array
    })
  }

  shift(array) {
    assert(_.isArray(array), 'object 参数必须为array类型！')
    this._changes.push({
      action: 'shift',
      array
    })
  }

  unshift(array, ...args) {
    assert(_.isArray(array), 'object 参数必须为array类型！')
    this._changes.push({
      action: 'unshift',
      array,
      args
    })
  }

  splice(array, ...args) {
    assert(_.isArray(array), 'object 参数必须为array类型！')
    this._changes.push({
      action: 'splice',
      array,
      args
    })
  }

  sort(array, ...args) {
    assert(_.isArray(array), 'object 参数必须为array类型！')
    this._changes.push({
      action: 'sort',
      array,
      args
    })
  }

  reverse(array) {
    assert(_.isArray(array), 'object 参数必须为array类型！')
    this._changes.push({
      action: 'reverse',
      array
    })
  }

  get changes() {
    return this._changes
  }
  get result() {
    if (!this._submited) {
      throw new Error('StateHelper尚未提交。')
    }
    return this._returnValues
  }

  submit() {
    this.changes.forEach(({
      action,
      object,
      key,
      array,
      value,
      args,
      handler
    }) => {
      if (action === 'invoke') {
        this._returnValues.push(handler())
        return
      }
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
          default:
            // 数组操作
            array[action](...args)
            break
        }
      } catch (err) {
        throw new Error('StateHelper 提交错误！' + err)
      }
    })
    this._submited = true
    return this.result
  }
}

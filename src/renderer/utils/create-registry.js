import assert from 'assert'
import _ from 'lodash'

export default function createRegistry(context, exts) {
  const registry = {}
  const register = function(key, value) {
    if (_.isObject(key)) {
      Object.entries(key).forEach(([key, value]) => register(key, value))
      return register
    }
    assert(_.isString(key), 'Key必须为string类型')
    if (key && value) {
      if (registry[key] !== undefined) {
        throw new Error(`名称${key}已经被注册，请解决名称冲突。`)
      }
      if (register[key] !== undefined) {
        throw new Error(`名称${key}为保留关键字，不允许注册。`)
      }
      registry[key] = value
      Object.defineProperty(register, key, {
        writable: false,
        value
      })
      return register
    }

    if (key && !value) {
      return register[key]
    }

    return registry
  }
  if (context) register(context)
  Object.assign(register, {
    all() {
      return Object.entries(registry)
    },
    each(handler) {
      this.all().forEach(handler)
    }
  })
  if (exts) Object.assign(register, exts)

  return register
}

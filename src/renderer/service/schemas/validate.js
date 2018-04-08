import _ from 'lodash'
import assert from 'assert'

function invalid(message) {
  // return {
  //   isValid: false,
  //   message
  // }
  return message
}

function valid() {
  // return {
  //   isValid: true
  // }
  return true
}

function checkResult(result) {
  if (result === true || result.isValid === true) return true
  return result.message || result
}

function isTypeOf(value, defTypes) {
  const types = _.isArray(defTypes) ? defTypes : [ defTypes ]
  for (const type of types) {
    if (value.constructor === type || value instanceof type) {
      return true
    }
  }
  return false
}

function validate(obj, schema) {
  assert(_.isObject(schema) && !_.isNull(schema), 'schema不能为空')
  assert(_.isObject(obj) && !_.isNull(schema), 'obj不能为空')

  for (const name in schema) {
    if (name === '$id') continue
    const define = schema[name]
    const val = obj[name]
    const nullOrUndefined = (val === undefined || val === null)

    // 必须项检查
    if (define.required && nullOrUndefined) {
      return invalid(`属性${name}值${val}为必须的。`)
    }

    // 检查类型
    if (!nullOrUndefined && define.type && !isTypeOf(val, define.type)) {
      return invalid(`属性${name}值${val}与定义类型不匹配${define.type}`)
    }

    if (!nullOrUndefined && define.type === Number) {
      if (Object.hasOwnProperty(define, 'max') && val > define.max) {
        return invalid(`属性${name}值${val}大于定义的最大值${define.max}`)
      }
      if (Object.hasOwnProperty(define, 'min') && val < define.min) {
        return invalid(`属性${name}值${val}小于定义的最小值${define.min}`)
      }
    }

    if (!nullOrUndefined && define.type === String) {
      if (Object.hasOwnProperty(define, 'match') && !define.match.test(val)) {
        return invalid(`属性${name}值${val}不符合匹配${define.match}`)
      }
      if (Object.hasOwnProperty(define, 'maxLength') && val.length > define.maxLength) {
        return invalid(`属性${name}值${val}超过最大长度${define.maxLength}`)
      }
      if (Object.hasOwnProperty(define, 'minLength') && val.length < define.minLength) {
        return invalid(`属性${name}值${val}小于最小长度${define.minLength}`)
      }
    }

    // 自定义检查器
    if (!nullOrUndefined && define.validator) {
      const ret = define.validator(val, obj)
      if (!ret) {
        throw new Error(`架构${schema.$id}验证函数 validator 定义不正确，必须返回 { isValid, message } 格式对象。`)
      }
      const res = checkResult(ret)
      if (res !== true) {
        return invalid(`属性${name}值${val}不符合自定义函数要求，错误消息：${res}`)
      }
    }
  }

  return valid()
}

export {
  validate,
  invalid,
  valid,
  isTypeOf,
  checkResult
}

export default validate

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

function isTypeIn(type, defTypes) {
  const types = _.isArray(defTypes) ? defTypes : [ defTypes ]
  return types.includes(type)
}

function validate(value, schema) {
  schema = schema || (value && value.$schema) // 被引用的
  assert(_.isObject(schema) && !_.isNull(schema), 'schema不能为空')
  // assert(_.isObject(value) && !_.isNull(schema), 'value不能为空')

  const nullOrUndefined = (value === undefined || value === null)

  // 必须项检查
  if (nullOrUndefined) {
    if (schema.required) {
      return invalid('值不能这空。')
    }
    return valid()
  }

  // 检查类型
  if (!nullOrUndefined && schema.type && !isTypeOf(value, schema.type)) {
    return invalid(`与定义类型不匹配${schema.type}`)
  }

  if (!nullOrUndefined && schema.type === Number) {
    if (Object.hasOwnProperty(schema, 'max') && value > schema.max) {
      return invalid(`大于定义的最大值${schema.max}`)
    }
    if (Object.hasOwnProperty(schema, 'min') && value < schema.min) {
      return invalid(`小于定义的最小值${schema.min}`)
    }
  }

  if (!nullOrUndefined && schema.type === String) {
    if (Object.hasOwnProperty(schema, 'match') && !schema.match.test(value)) {
      return invalid(`未能通过合正则表达式匹配验证${schema.match}`)
    }
    if (Object.hasOwnProperty(schema, 'maxLength') && value.length > schema.maxLength) {
      return invalid(`超过最大长度${schema.maxLength}`)
    }
    if (Object.hasOwnProperty(schema, 'minLength') && value.length < schema.minLength) {
      return invalid(`未能达到最小长度要求'${schema.minLength}'`)
    }
  }

  // 自定义检查器
  if (!nullOrUndefined && schema.validator) {
    const ret = schema.validator(value)
    const res = checkResult(ret)
    if (res !== true) {
      return invalid(`未能通过自定义函数验证，错误消息：${res}`)
    }
  }

  if (isTypeIn(Array, schema.type) && schema.item && _.isArray(value)) {
    for (const itemValue of value) {
      const res = validate(itemValue, schema.item)
      if (checkResult(res) !== true) {
        return invalid(`数组元素${itemValue}符合定义要求：${res}`)
      }
    }
  }

  if (isTypeIn(Object, schema.type) && _.isObject(value)) {
    if (_.isFunction(schema.props)) {
      const validator = schema.props
      for (const [propName, propValue] of Object.entries(value)) {
        const res = validator(propValue)
        if (checkResult(res) !== true) {
          return invalid(`属性${propName}值${propValue}：${res}`)
        }
      }
    } else if (_.isObject(schema.props)) {
      for (const [propName, propSchema] of Object.entries(schema.props)) {
        const propValue = value[propName]
        const res = validate(propValue, propSchema)
        if (checkResult(res) !== true) {
          return invalid(`属性${propName}值${propValue}：${res}`)
        }
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

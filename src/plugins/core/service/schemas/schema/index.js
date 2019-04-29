import _ from 'lodash'
import { invalid, valid, isTypeOf, checkResult, validate } from '../validate'

// 面对架构的架构
const schemaSchema = {
  $id: 'schema',
  type: Object,
  required: true,
  validator(item) {
    const nullOrUndefined = _.isNull(item) || _.isUndefined(item)
    // 验证default
    if (nullOrUndefined) {
      return valid()
    }

    if (item.hasOwnProperty('default') && !isTypeOf(item.default, item.type)) {
      return invalid(`默认值${item.default}与定义的类型${item.type}不匹配！`)
    }

    return valid()
  },
  props: {
    props: {
      type: [Object],
      required: false,
      validator(props, comp) {
        for (const name in props) {
          if (name === '$schema' || name === '$id') continue

          const value = props[name]
          if (value === undefined) continue
          // 除非有指定验证架构，否则，使用原架构
          const schema = (value && value.$schema) || schemaSchema
          const res = validate(value, schema)
          // 验证失败，返回
          if (checkResult(res) !== true) {
            return `架构定义props属性${name}值${value}验证失败，请确定${res}`
          }
        }
        return valid()
      }
    },
    type: {
      // title: '类型',
      // description: '类型为单个类型时直接书写类型：String，多个类型时：[String, Number]',
      type: [Function, Array],
      required: false,
      validator(value, item) {
        if (_.isArray(value)) {
          for (const el of value) {
            if (!_.isFunction(el)) {
              return invalid('type 必须为类型(Function)')
            }
          }
          return valid()
        } else if (_.isFunction(value)) {
          return valid()
        }
        return invalid('type 必须为类型(Function)')
      }
    },
    default: {
      required: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    validator: {
      type: Function,
      required: false
    }
  }
}

schemaSchema.$schema = schemaSchema

// 验证自身
validate(schemaSchema, schemaSchema)

export default schemaSchema

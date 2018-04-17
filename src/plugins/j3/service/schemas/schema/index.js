import _ from 'lodash'
import { invalid, valid, isTypeOf } from '../validate'

const schema = {
  $id: 'component',
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
    required: false,
    validator(value, item) {
      if (_.isNull(item) || _.isUndefined(item)) {
        if (!isTypeOf(value, item.type)) {
          return invalid(`默认值${value}与定义的类型${item.type}不匹配！`)
        }
      }
      return valid()
    }
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

export default schema

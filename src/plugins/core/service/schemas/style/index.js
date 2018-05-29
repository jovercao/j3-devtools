import { validate, invalid, valid, isTypeOf, checkResult } from '../validate'
import _ from 'lodash'
// import binding from '../binding'
import schema from '../schema'

const propSchema = Object.assign({}, schema, {
  $id: 'style',
  $schema: 'schema',

  title: {
    type: String,
    required: false
  },
  selections: {
    type: Array,
    required: false,
    validator(selections, prop) {
      if (!selections) {
        return valid()
      }

      for (const el of selections) {
        if (!_.isObject(el)) {
          return invalid(`选项${el}格式不正确，必须为 { title, value, description } 格式`)
        }
        if (prop.type && !isTypeOf(el.value, prop.type)) {
          return invalid(`selections中的项${el}必须要与定义的类型${prop.type}匹配。`)
        }
      }
      return valid()
    }
  }
})

export default {
  $id: 'component',
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  props: {
    type: Object,
    required: false,
    validator(props, comp) {
      for (const name in props) {
        const value = props[name]
        if (value === undefined) continue

        const res = validate(value, propSchema)
        if (checkResult(res) !== true) {
          return invalid(`组件${comp.name}属性${name}的定义不正确，错误信息：${checkResult(res)}`)
        }
      }
      return valid()
    }
  }
}

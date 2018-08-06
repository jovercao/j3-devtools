import { validate, invalid, valid, isTypeOf, checkResult } from '../validate'
import _ from 'lodash'
// import binding from '../binding'
import schema from '../schema'

const propSchema = _.merge({}, schema, {
  $id: 'prop',
  props: {
    title: {
      type: String,
      required: false
    },
    editor: {
      tag: String,
      options: Object,
      component: Object
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
    // ,
    // // 删除props验证
    // props: undefined
  }
})

export default {
  $id: 'component',
  validator(define) {
    if (!define.tag && !define.component) {
      return invalid(`组件${define.name}定义不正确，tag 与 component 不能同时为空！`)
    }
    return valid()
  },
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: false
    },
    component: {
      type: Function,
      required: false
    },
    props: {
      type: Object,
      required: false,
      validator(props, comp) {
        for (const name in props) {
          const value = props[name]
          if (value === undefined) continue

          let res = validate(value, propSchema)
          res = checkResult(res)
          if (res !== true) {
            return invalid(`组件${(comp && comp.name) || ''}属性${name}的定义不正确，错误信息：${checkResult(res)}`)
          }
        }
        return valid()
      }
    },
    quickProps: {
      type: Array,
      required: false,
      validator(value, comp) {
        if (comp) {
          const props = comp.props.keys()
          for (const item of value) {
            if (!props.includes(item)) {
              return invalid(`快速属性${item}必须为已声明的组件属性！`)
            }
          }
        }
        return valid()
      }
    }
  }
}

/**
 * 预解释组件定义
 */

import mapProps from './map-props'
import _ from 'lodash'

export default function(component) {
  format(component.name, component)
}

export function format(name, component) {
  if (!component.type && !component.tag) {
    // 未定义类型！
    throw new Error(`组件${name}，未定义类型或者标签。`)
  }
  if (!component.tag) {
    component.tag = component.type.name
  }
  if (!component.props) {
    console.warn(`组件${component.name}未定义props属性，将从组件${component.tag}中获取。`)
    component.props = mapProps(component.tag || component.component)
  }
  assignName(name, component)
  formatProps(component)
  formatEvents(component)
  formtBindings(component)
}

function assignName(name, item) {
  if (!item.title) {
    item.title = name
  }
  if (!item.description) {
    item.description = item.title
  }
}

function formatProps(item) {
  const { props } = item
  Object.keys(props).forEach((key) => {
    const value = props[key]
    const prop = props[key] = formatProp(value)
    assignName(key, prop)
  })
}

function formatProp(prop) {
  let item = prop
  if (_.isFunction(item)) {
    item = {
      type: [ item ],
      required: false
    }
  }
  if (!_.isArray(item.type)) {
    item.type = [ item.type ]
  }
  // 格式化selections以及值
  if (item.selections) {
    item.selections = item.selections.map(v => {
      if (!_.isObject(v)) {
        v = { value: v }
      }
      return v
    })
  }
  // 创建验证函数
  if (item.selections && !item.validator) {
    item.validator = makeSelectionsValidator(item.selections)
  }
  return item
}

function formatEvents(item) {
  return true
}

function formtBindings(item) {
  return true
}

function makeSelectionsValidator(selections) {
  return function(value) {
    return selections.includes(value)
  }
}

/**
 * 预解释组件定义
 */

import mapProps from './map-props'
import _ from '#'

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
    component.props = mapProps(component.tag)
  }
  formatItem(name, component)
  formatProps(name, component)
  formatEvents(name, component)
  formtBindings(name, component)
}

function formatItem(name, item) {
  if (!item.title) {
    item.title = name
  }
  if (!item.description) {
    item.description = item.title
  }
}

function formatProps(name, item) {
  const { props } = item
  Object.keys(props).forEach((key) => {
    const value = props[key]
    props[value] = formatProp(key, value)
  })
}

function formatProp(name, prop) {
  let item = prop
  if (_.isFunction(item)) {
    item = {
      type: item,
      required: false
    }
  }
  formatItem(name, item)
  return item
}

function formatEvents(name, item) {
  return true
}

function formtBindings(name, item) {
  return true
}

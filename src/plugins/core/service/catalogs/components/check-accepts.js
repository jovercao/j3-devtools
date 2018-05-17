import components from './components'
import _ from 'lodash'
// 双向检查
export default function checkAccepts(container, slot, items) {
  if (_.isArray(items)) {
    return !items.find(p => !checkAccepts(container, slot, p))
  }
  if (container === items) return false

  const accepts = components[container.type].slots[slot].accepts
  if (accepts && accepts !== '*') {
    if (!accepts.includes(items.type)) {
      return false
    }
  }

  const acceptsParent = components[items.type].acceptsParent
  if (acceptsParent && acceptsParent !== '*') {
    if (!acceptsParent.includes(container.type)) {
      return false
    }
  }

  if (!checkCircle(container, items)) {
    return false
  }

  return true
}

export function checkCircle(container, item) {
  for (const slot in item.slots) {
    const childItems = item.slots[slot]
    for (const childItem of childItems) {
      if (childItem === container) {
        return false
      } else {
        if (!checkCircle(container, childItem)) {
          return false
        }
      }
    }
  }
  return true
}

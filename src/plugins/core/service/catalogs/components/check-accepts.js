import components from './components'

// 双向检查
export default function(container, slot, item) {
  if (container === item) return false

  const accepts = components[container.type].slots[slot].accepts
  if (accepts && accepts !== '*') {
    if (!accepts.includes(item.type)) {
      return false
    }
  }

  const acceptsParent = components[item.type].acceptsParent
  if (acceptsParent && acceptsParent !== '*') {
    if (!acceptsParent.includes(container.type)) {
      return false
    }
  }

  if (!checkCircle(container, item)) {
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

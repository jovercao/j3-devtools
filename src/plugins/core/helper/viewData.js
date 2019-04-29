import _ from 'lodash'
export function properVue(vue) {
  properView(vue.view)
}

// * 准备View数据
export function properView(view) {
  for (const slot in view.slots) {
    const items = view.slots[slot]
    if (items) {
      items.forEach((childItem, index) => {
        // 添加父级指针，方便后续操作
        childItem.slot = slot
        childItem.parent = view
        childItem.index = index
        properView(childItem)
      })
    }
  }
}

export function isPaternity(item1, item2) {
  return hasChild(item1, item2) || hasChild(item2, item1)
}

export function hasChild(container, item) {
  for (const slot in container.slots) {
    const items = item.slots[slot]
    if (items.find(child => child === item || hasChild(child, item))) {
      return true
    }
  }
  return false
}

export function unproperVue(vue) {
  const { view, data, css, methods, computed } = vue
  return {
    view: unproperView(view),
    data,
    css,
    methods,
    computed
  }
}

export function unproperView(item) {
  const { slots, props, type } = item
  const newItem = {
    type,
    slots: {},
    props: _.cloneDeep(props)
  }

  for (const slot in slots) {
    const children = item.slots[slot]
    const newChildren = newItem.slots[slot] = []
    if (children) {
      children.forEach(childItem => {
        newChildren.push(unproperView(childItem))
      })
    }
  }

  return newItem
}

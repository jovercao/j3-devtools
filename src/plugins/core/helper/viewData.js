import _ from 'lodash'
// * 准备ViewData数据
export function properViewData(item) {
  for (const slot in item.slots) {
    const items = item.slots[slot]
    if (items) {
      items.forEach((childItem, index) => {
        // 添加父级指针，方便后续操作
        childItem.slot = slot
        childItem.parent = item
        childItem.index = index
        properViewData(childItem)
      })
    }
  }
}

export function readValue(item) {
  const { slots, props, type, bindings, events, styles, classes } = item
  const newItem = {
    type,
    slots: {},
    props: _.cloneDeep(props),
    bindings: _.cloneDeep(bindings),
    events: _.cloneDeep(events),
    styles: _.cloneDeep(styles),
    classes: _.cloneDeep(classes)
  }

  for (const slot in slots) {
    const children = item.slots[slot]
    const newChildren = newItem.slots[slot] = []
    if (children) {
      children.forEach(childItem => {
        newChildren.push(readValue(childItem))
      })
    }
  }

  return newItem
}

// * 准备ViewData数据
const properViewData = (item) => {
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

export {
  properViewData
}

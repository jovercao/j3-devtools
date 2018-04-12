import _ from 'lodash'

const Menus = [
  {
    title: '文件',
    icon: 'file',
    children: [
      {
        title: '打开文件',
        icon: 'open_with',
        command: 'ide.open-file'
      },
      {
        title: '打开项目',
        icon: 'folder_open',
        command: 'ide.open-project'
      },
      '-',
      {
        title: '最近...',
        icon: 'view_list',
        children: [
        ]
      }
    ]
  }, {
    title: '编辑',
    children: [
      {
        title: '剪切',
        icon: 'content_cut',
        command: 'ide.cut'
      },
      {
        title: '复制',
        icon: 'content_copy',
        command: 'ide.copy'
      },
      {
        title: '粘贴',
        icon: 'content_paste',
        command: 'ide.parse'
      }
    ]
  },
  {
    title: '查看',
    children: [
    ]
  }
]

function menus() {
  return Menus
}

/**
 * @param {object} item - menuItem { title, icon, command, children: [...] }，也可以是 '-'，分隔符。
 * @param {int[]} indexes - 菜单项插入的位置
 */
function addItem(item, indexes) {
  if ((!indexes || indexes.length === 1) && _.isString(item)) {
    throw new Error('父级元素不允许出现分隔符！')
  }
  if (_.isString(item) && item !== '-') {
    throw new Error('如果要指定分隔符，则item的值必须为"-"')
  }
  if (indexes) {
    const x = getArray(indexes)
    // 插入项
    x.array.children.splice(x.index, 0, item)
  } else {
    Menus.push(item)
  }
}

function getArray(indexes) {
  let array = Menus
  if (indexes.length > 1) {
    for (let i = 0; i < indexes.length - 1; i++) {
      if (!array[i]) {
        throw new Error(`给定的索引${indexes}不正确！超出索引范围。`)
      }
      if (!array[i].children) {
        array[i].children = []
      }
      array = array[i].children
    }
  }
  return {
    array,
    index: indexes[indexes.length - 1]
  }
}

function indexesOf(item) {
  const indexes = []
  function find(items) {
    const index = items.findIndex((el, index) => {
      if (item === el) {
        return true
      } else {
        return find(el.children)
      }
    })
    if (index >= 0) {
      indexes.unshift(index)
      return true
    }
    return false
  }
  find(Menus)
  return indexes
}

function removeItem(item) {
  const indexes = indexesOf(item)
  if (indexes.length > 0) {
    const x = getArray(indexes)
    // 删除元素
    x.array.splice(x.index, 1)
  }
}

Object.assign(menus, {
  indexesOf,
  addItem,
  removeItem
})

export default menus

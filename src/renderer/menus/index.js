import _ from 'lodash'

const Menus = [
  {
    title: '文件',
    icon: 'file',
    children: [
      {
        title: '打开文件',
        icon: 'insert_drive_file',
        command: 'ide.open-file'
      },
      {
        title: '打开项目',
        icon: 'folder_open',
        command: 'ide.open-project'
      },
      {
        title: '最近...',
        icon: 'view_list',
        children: [
          {
            title: '文件一',
            icon: 'folder_open',
            command: 'ide.open-project'
          },
          {
            title: '文件二',
            icon: 'folder_open',
            command: 'ide.open-project'
          }
        ]
      },
      '-',
      {
        title: '保存',
        icon: 'save',
        command: 'ide.save'
      },
      {
        title: '全部保存',
        icon: 'account_balance_wallet',
        command: 'ide.save-all'
      },
      {
        title: '关闭',
        icon: 'close',
        command: 'ide.close'
      },
      {
        title: '全部关闭',
        icon: 'close',
        command: 'ide.close-all'
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

function getListChildren(indexes) {
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
  return array
}

function insert(item, indexes, replace = false) {
  if ((!indexes || indexes.length === 1) && _.isString(item)) {
    throw new Error('父级元素不允许出现分隔符！')
  }
  if (_.isString(item) && item !== '-') {
    throw new Error('如果要指定分隔符，则item的值必须为"-"')
  }
  const items = _.isArray(item) ? item : [ item ]
  if (indexes) {
    const children = getListChildren(indexes)
    const deleteCount = replace ? items.length : 0
    // 插入项
    children.splice(indexes[indexes.length - 1], deleteCount, ...items)
  } else {
    Menus.push(...item)
  }
}

/**
 * 菜单管理器
 */
function menus(indexes, items, replace = false) {
  if (indexes && !items) {
    return menus.get(indexes)
  }
  if (indexes && items) {
    if (replace) {
      return menus.replace(items, indexes)
    } else {
      return menus.add(items, indexes)
    }
  }
  return Menus
}

/**
 * @param {object} item - menuItem { title, icon, command, children: [...] }，也可以是 '-'，分隔符。
 * @param {int[]} indexes - 菜单项插入的位置
 */
menus.add = function(item, indexes) {
  return insert(item, indexes)
}

/**
 * 替换菜单项
 * @param {menus} item - 菜单项
 * @param {int[]} indexes - 索引
 */
menus.replace = function(item, indexes) {
  return insert(item, indexes, true)
}

menus.get = function(indexes) {
  return getListChildren(indexes)[indexes[indexes.length - 1]]
}

/**
 * 获取菜单项所处的索引位置
 * @param {MenuItem} item - 菜单项
 * @return {integer[]} 返回索引
 */
menus.indexesOf = function(item) {
  return menus.findIndexes(xitem => item === xitem)
}

/**
 * 通过自定义函数查找索引
 * @param {function} fn (item, index) => boolean
 */
menus.findIndexes = function(fn) {
  const indexes = []
  function find(items) {
    const index = items.findIndex((el, index) => {
      return fn(el, index) || find(el.children)
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

menus.remove = function(item) {
  const indexes = menus.indexesOf(item)
  if (indexes.length > 0) {
    const children = getListChildren(indexes)
    // 删除元素
    children.splice(indexes[indexes.length - 1], 1)
  }
}

export default menus

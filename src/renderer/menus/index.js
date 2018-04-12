import _ from 'lodash'

const menus = [
  {
    title: '文件',
    icon: 'file',
    children: [
      {
        title: '打开文件',
        icon: 'open_with',
        command: 'openFile'
      },
      {
        title: '打开项目',
        icon: 'folder_open',
        command: 'doIt'
      },
      '-',
      {
        title: '最近文件',
        icon: 'view_list',
        children: [
          {
            title: '文件1...'
          },
          {
            title: '文件2...'
          }
        ]
      }
    ]
  }, {
    title: '编辑',
    children: [
      {
        title: '剪切',
        icon: 'content_cut',
        command: 'edit.cut'
      },
      {
        title: '复制',
        icon: 'content_copy',
        command: 'edit.copy'
      },
      {
        title: '粘贴',
        icon: 'content_paste',
        command: 'edit.parse'
      }
    ]
  }
]

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
    let position = item
    if (indexes.length > 1) {
      for (let i = 0; i < indexes.length - 1; i++) {
        if (!position[i].children) {
          position[i].children = []
        }
        position = position[i].children
      }
    }
    position.children.splice(indexes[indexes.length - 1], 0, item)
  } else {
    menus.push(item)
  }
}

export default menus

export {
  addItem
}

import service from '../service'

const Toolboxes = {}

let changed = false

/**
 * @param {string} name - 名称
 * @param {string} options.icon - 显示的图标，如果为sidebar时，则为点击的图标
 * @param {string} options.dock - 可选项，sidebar, bottombar
 * @param {string} options.component - toolbox所指向的VueComponent的tag名称
 */
function toolbox(name, options) {
  if (!options) {
    return Toolboxes[name]
  }
  if (Toolboxes[name] && options !== Toolboxes[name]) {
    throw new Error(`Toolbox 命名冲突！ 名称 '${name}' 已经存在！`)
  }

  Toolboxes[name] = options
  changed = true
}

/**
 * 获取所有工具箱
 */
toolbox.all = function() {
  return toolbox.filter()
}

toolbox.filter = function(fn) {
  const toolboxes = []
  for (const key in Toolboxes) {
    const options = Toolboxes[key]
    if (!fn || fn(options, key)) {
      toolboxes.push(options)
    }
  }
  return toolboxes
}

toolbox.sidebars = function() {
  return toolbox.filter(tb => tb.dock === 'sidebar')
}

toolbox.bottombars = function() {
  return toolbox.filter(tb => tb.dock === 'bottombar')
}
// 注册工具栏
service('toolbox', toolbox)

// 获取查看菜单下的菜单项
toolbox.refreshViewMenus = function() {
  if (!changed) return
  const menus = service('menus')
  const commands = service('commands')

  const items = toolbox.all().map(item => {
    const command = 'ide.toggle-' + item.name
    // 注册命令
    commands(command, {
      title: item.title,
      handler(app) {
        app.ide.toggleToolbox(item)
      }
    })
    return { title: item.title, icon: item.icon, command }
  })
  menus([2], {
    title: '查看',
    children: items
  }, true)
  changed = false
}

export default toolbox

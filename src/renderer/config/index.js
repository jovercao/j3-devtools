
import shortcuts from './shortcuts'

const defaultConfig = {
  // 插件安装路径
  'plugins-path': './src/plugins',
  // 隐藏的工具栏，默认为显示
  'hide-toolboxes': [],
  'plugin-registry': 'http://jover.cn/registry',
  // 下载用临时目录
  'temp-path': './temps',
  'content-editors': {
    'txt': 'text-editor'
  },
  // 快捷键
  shortcuts,
  // 已安装的插件，不可修改
  'installed-plugins': [
    'core'
  ]
}

let currentConfig

function save() {
  if (!currentConfig) {
    return
  }
  localStorage.setItem('ide', currentConfig)
}

function read() {
  const json = localStorage.getItem('ide')
  if (json) {
    console.log('json 内容', json)
    currentConfig = JSON.parse(json)
    return
  }
  currentConfig = defaultConfig
}

function get(name, path) {
  if (!currentConfig) read()
  if (!path) {
    return currentConfig[name]
  } else {
    return currentConfig[path][name]
  }
}

let tid
function set(name, value, path) {
  if (!currentConfig) read()
  if (path) {
    if (!currentConfig[path]) {
      currentConfig[path] = {}
    }
    currentConfig[path][name] = value
  } else {
    currentConfig[name] = value
  }
  if (tid) clearTimeout(tid)
  // 延时保存
  tid = setTimeout(save, 1000)
}

export default {
  get,
  set
}

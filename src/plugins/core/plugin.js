import file from './resource/file'
// import ExplorerBox from './toolbox/ExplorerBox.vue'
import commands from './commands'
import toolbox from './toolbox'
import defaultConfig from './default-config'
import store from './store'
import editors from './editors'

function go(ide, options) {
  // 注册资源
  ide.resource('file', file)
  // 注册store
  store(ide)
  // 注册工具栏
  ide.toolbox(toolbox)

  ide.editor(editors)
  // 注册命令
  ide.commands(commands)
}

export default {
  go,
  defaultConfig
}

export {
  go,
  defaultConfig
}

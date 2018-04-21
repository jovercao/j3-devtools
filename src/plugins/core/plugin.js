import file from './resource/file'
// import ExplorerBox from './toolbox/ExplorerBox.vue'
import commands from './commands'
import toolbox from './toolbox'
import defaultConfig from './default-config'
import store from './store'
import editors from './editors'

function go(ide, config) {
  console.log(ide)
  // 注册资源
  ide.resource('file', file(ide, config))

  // 注册store
  ide.store(store(ide, config))

  // 注册工具栏
  ide.toolbox(toolbox(ide, config))

  ide.editor(editors)

  // 注册命令
  ide.commands(commands(ide, config))
}

export default {
  go,
  defaultConfig
}

export {
  go,
  defaultConfig
}

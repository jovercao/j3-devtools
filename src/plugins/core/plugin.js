import file from './resource/file'
// import ExplorerBox from './toolbox/ExplorerBox.vue'
import commands from './commands'
import toolbox from './toolbox'
import defaultConfig from './default-config'
import store from './store'
import editors from './editors'
import services from './service'
import helper from './helper'
import components from './components'
import directives from './directives'
// import dialogs from './dialogs'

function init(ctx, config) {

  ctx.service(services)
  // 注册资源
  ctx.resource('file', file(ctx, config))

  // 注册store
  ctx.store(store(ctx, config))

  // 注册工具栏
  ctx.toolbox(toolbox(ctx, config))

  ctx.editor(editors)
  // 注册组件
  ctx.Vue.use(components)
  // 注册指令
  ctx.Vue.use(directives)
  // 注册对话框
  // ide.Vue.use(dialogs)

  // 注册命令
  ctx.commands(commands(ctx, config))

  Object.assign(ctx.helper, helper)
}

export default {
  init,
  defaultConfig
}

export {
  init,
  defaultConfig
}

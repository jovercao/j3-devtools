import context from '@'
import Vue from 'vue'
import directives from './directives'
import filters from './filters'
import components from './components'
import MuseUI from 'muse-ui'
import ElementUI from 'element-ui'
import messages from './messages'
import 'material-design-icons/iconfont/material-icons.css'
import 'muse-ui/dist/muse-ui.css'
// import 'muse-ui/dist/theme-carbon.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/proper.less'
import plugins from './plugin-mgr'
import App from './App.vue'
import { mapStore } from './utils/vuex'
import shortcuts from './utils/shortcuts'
import config from './config'
import commands from './commands'

Vue.use(components)
Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.use(directives)
Vue.use(filters)
// 事件总线
Vue.prototype.$messages = messages

const ctx = global.ctx = context

async function run(params) {

  // **********初始化应用程序******** ***
  // 设置默认context
  ctx.commands.defaultContext = ctx
  // 初始化插件
  await plugins.init(ctx)

  // 映射整个初始化完之后的store到ide中
  ctx.ide = Vue.ide = Vue.prototype.$ide = mapStore(ctx.store())

  Vue.prototype.$exec = name => commands.exec(name)

  // 绑定快捷键
  const shortcutCfg = config.get('shortcuts')
  const shortcutsForReg = {}
  Object.entries(shortcutCfg).forEach(([keys, command]) => {
    shortcutsForReg[keys] = () => commands.exec(command)
  })
  shortcuts.on(shortcutsForReg)

  // Vue.prototype.$ctx = ctx
  // *** 加载 UI ***
  new Vue({
    router: ctx.router,
    store: ctx.store(),
    components: { App },
    template: '<App/>'
  }).$mount('#app')

}

run()

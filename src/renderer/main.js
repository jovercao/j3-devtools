import context from './context'
import Vue from 'vue'
import directives from './directives'
import filters from './filters'
import MuseUI from 'muse-ui'
import 'material-design-icons/iconfont/material-icons.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

import App from './App.vue'

Vue.use(MuseUI)
Vue.use(directives)
Vue.use(filters)

const ctx = context()

// **********初始化应用程序******** ***
// 初始化ctx对象，以便command执行
ctx.store.init(ctx)
// 初始化查看菜单中的工具栏。
ctx.toolbox.menus()
// 初始化插件
ctx.plugin.initPlugins(ctx)

// *** 加载 UI ***
new Vue({
  router: ctx.router,
  store: ctx.store(),
  components: { App },
  template: '<App/>'
}).$mount('#app')

import context from '@'
import Vue from 'vue'
import directives from './directives'
import filters from './filters'
import components from './components'
import MuseUI from 'muse-ui'
import ElementUI from 'element-ui'
import bus from './bus'
import 'material-design-icons/iconfont/material-icons.css'
import 'muse-ui/dist/muse-ui.css'
// import 'muse-ui/dist/theme-carbon.css'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/proper.less'

import App from './App.vue'

Vue.use(components)
Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.use(directives)
Vue.use(filters)
// 事件总线
Vue.prototype.$bus = bus

const ctx = global.ctx = context

async function run(params) {

  // **********初始化应用程序******** ***
  // 设置默认context
  ctx.commands.defaultContext = ctx
  // 初始化插件
  await ctx.plugins.init(ctx)
  // // 初始化查看菜单中的工具栏。
  // ctx.toolbox.menus()

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

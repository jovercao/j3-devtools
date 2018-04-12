// import { go } from './ide'

// go()
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import store from './store'
import routers from './routers'
import Vuex from 'vuex'
import helper from './helper'
import directives from './directives'
import service from './service'
import resource from './resource'
import filters from './filters'
import plugin from './plugin'
import toolbox from './toolbox'
import mixin from './mixins'

import MuseUI from 'muse-ui'
import 'material-design-icons/iconfont/material-icons.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

Vue.use(Router)
Vue.use(Vuex)
Vue.use(MuseUI)
Vue.use(directives)
Vue.use(filters)

Vue.prototype.$helper = helper
Vue.prototype.$service = service
Vue.prototype.$resource = resource

const ide = {
  // ui,
  mixin,
  service,
  toolbox,
  store,
  resource,
  Vue
}

function go() {
  // 加载插件
  plugin.initPlugins(ide)

  const router = new Router(routers)
  const rootStore = store()
  new Vue({
    router,
    store: rootStore,
    components: { App },
    template: '<App/>'
  }).$mount('#app')

}

go()

export default ide

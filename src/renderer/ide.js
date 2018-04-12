import Vue from 'vue'
import axios from 'axios'
import App from './App'
import routers from './routers'
import store from './store'
// import toolbox from './toolbox'
import Vuex from 'vuex'
import Router from 'vue-router'
import plugin from './plugin'
import MuseUI from 'muse-ui'
import 'material-design-icons/iconfont/material-icons.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
// import filters from './filters'
// import helper from './helper'
// import directives from './directives'

// import service from './service'
// import resource from './resource'

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Router)
Vue.use(MuseUI)
// Vue.use(filters)
// Vue.use(directives)
Vue.http = Vue.prototype.$http = axios
// Vue.service = Vue.prototype.$service = service

// let isRunning = false
// let root

function go() {
  // 加载插件
  plugin.initPlugins(ide)
  // isRunning = true

  const rootStore = store()
  const router = new Router(routers)

  // // // 通过service进行调用
  // Object.assign(uiApi, {
  //   $store: rootStore,
  //   ...mapMutations([
  //     'setActive',
  //     'setActiveSidebar',
  //     'showToolbox',
  //     'openContent',
  //     'saveContent',
  //     'createContent'
  //   ]),
  //   ...mapState([
  //     'actived'
  //   ])
  // })

  new Vue({
    components: { App },
    router,
    store: rootStore,
    template: '<App/>'
  }).$mount('#app')
}

// const uiApi = {}

// 将uiapi注册到服务中，在其他Vue中可以
// 这种方式调用: this.$service('ide').setActive()
// 或者: this.$service.ide.setActive()
// service('ide', uiApi)

const ide = {
  // ui,
  // service,
  // toolbox,
  store,
  // resource,
  Vue
}

export default ide

export {
  go
}

import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import mainStore from './store'
import 'material-design-icons/iconfont/material-icons.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import directives from './directives'
import filters from './filters'
import Vuex from 'vuex'
import Router from 'vue-router'

import service, { VuePlugin as ServiceVuePlugin } from './service'
import resource, { VuePlugin as ResourceVuePlugin } from './resource'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Router)
Vue.use(filters)
Vue.use(directives)
Vue.use(ServiceVuePlugin)
Vue.use(ResourceVuePlugin)

let isRunning = false

function run() {
  isRunning = true
  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router: new Router(router),
    store: new Vuex.Store(mainStore),
    template: '<App/>'
  }).$mount('#app')
}

function store(id, module) {
  if (isRunning) {
    throw new Error('process is running')
  }
  mainStore.modules[id] = module
}

const ide = {
  run,
  service,
  store,
  resource,
  Vue
}

export default ide

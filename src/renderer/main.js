import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import Helper from './helper'
import Service from './service'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'material-design-icons/iconfont/material-icons.css'
import Components from '@'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Helper)
Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.use(Components)
Vue.use(Service)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

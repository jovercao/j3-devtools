import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import helper from './helper'
// 为了能自动初始化组件props属性定义，必须先加载组件。
import service from './service'
import 'material-design-icons/iconfont/material-icons.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import directives from './directives'
import filters from './filters'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(helper)
Vue.use(filters)
Vue.use(directives)
Vue.use(service)

function run() {
  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')
}

const ide = {
  run,
  service,

  Vue
}

export default ide

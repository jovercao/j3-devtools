import app from '@'
import router from './router'
import store from './store'
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

app.plugin.initPlugins(app)

new Vue({
  router,
  store: store(),
  components: { App },
  template: '<App/>'
}).$mount('#app')


import Vue from 'vue'
import helper from './helper'
import service from './service'
import resource from './resource'
import toolbox from './toolbox'
import mixin from './mixin'
import ide from './apis'
import store from './store'
import menus from './menus'
import commands from './commands'
import plugin from './plugin'

Vue.prototype.$helper = helper
Vue.prototype.$service = service
Vue.prototype.$resource = resource
Vue.ide = Vue.prototype.$ide = ide

const app = {
  Vue,
  ide,
  mixin,
  service,
  toolbox,
  store,
  resource,
  commands,
  helper,
  menus,
  plugin
}

store.init(app)

export default app

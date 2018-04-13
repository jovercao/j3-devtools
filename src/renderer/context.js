/**
 * context 对象，几乎可以通过此对象访问所有IDE资源
 */
import Vue from 'vue'
import helper from './helper'
import service from './service'
import resource from './resource'
import toolbox from './toolbox'
import mixin from './mixin'
import ide from './apis'
import router from './router'
import store from './store'
import menus from './menus'
import commands from './commands'
import plugin from './plugin'

Vue.prototype.$helper = helper
Vue.prototype.$service = service
Vue.prototype.$resource = resource
Vue.ide = Vue.prototype.$ide = ide

let instance

export default function context() {
  if (!instance) {
    instance = {
      // vue对象
      Vue,
      // 路由对象
      router,
      // ide api
      ide,
      // 混入器
      mixin,
      // 服务，context成员下的许多其他对象也被注册进了服务
      service,
      // 工具栏
      toolbox,
      // vuex store
      store,
      // 资源管理器中的资源
      resource,
      // 命令
      commands,
      // 助手
      helper,
      // 菜单
      menus,
      // 插件管理器
      plugin
    }
  }
  return instance
}

import resource from '../resource'
import editor from '../editor'
import menus from '../menus'
import toolbox from '../toolbox'
import helper from '../helper'
import commands from '../commands'
import config from '../config'
import service from '../service'

import _ from '../utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { basename } from 'path'

Vue.use(Vuex)

const hidedToolboxes = config.get('hide-toolboxes')

const instance = new Vuex.Store({
  state: {
    version: '0.1.0',
    activeBottombareTab: null,
    // 打开的内容
    openeds: [],
    // 打开的标签页
    openedTabs: [],
    // 打开的工具栏
    toolboxes: {
      'j3-components-box': true
    },
    activeSidebar: 'div',
    sidebarVisible: true,
    bottombarVisible: true,
    activeBottombar: 'div',
    editors: editor.all,
    resourceTree: {},
    hidedToolboxes
  },
  getters: {
    sidebars() { return toolbox.sidebars() },
    bottombars() { return toolbox.bottombars() },
    activeItem(state) {
      return state.activeTab ? state.activeTab.content : null
    },
    menus() {
      toolbox.refreshViewMenus()
      return menus()
    },
    openedItems(state) {
      return state.openedTabs.map(tab => tab.content)
    },
    visibleBottombars(state) {
      return toolbox.bottombars().filter(item => !state.hidedToolboxes(item.name))
    },
    visibleSidebars(state) {
      return toolbox.sidebars().filter(item => !state.hidedToolboxes.includes(item.name))
    }
  },
  mutations: {
    // setter接口
    [helper.mapPropertiesConfig.setterMutation]: helper.PropertiesSetterMutation(function(state, key, value, setter) {
      // 自定义处理函数，调用setter(value)可以修属性值。
      switch (key) {
        case 'sidebars':
          break
        default:
          break
      }
      setter(value)
    }),
    // *************************Toolbox**************************
    showToolbox(state, name) {
      hidedToolboxes[name] = true
    },
    hideToolbox(state, name) {
      hidedToolboxes[name] = true
    },
    toggleToolbox(state, name) {
      hidedToolboxes[name] = !hidedToolboxes[name]
    },
    // *************************Menus*****************************
    addMenu(state, { menu, indexes }) {
      menus.add(menu, indexes)
    },
    removeMenu(state, menu) {
      menus.removeItem(menu)
    },
    // *********************tab and items*************************
    setActiveTab(state, tab) {
      if (_.isNumber(tab)) {
        tab = state.openedTabs[tab]
      }
      state.activeTab = tab
    },
    closeActiveTab(state) {
      this.commit('closeTab', state.activeTab)
    },
    itemChanged(state, item) {
      const index = state.openedTabs.find(tab => tab.content === item)
      if (index > 0) {
        // 标记已修改，才便关闭前提示保存
        item.changed = true
      }
    },
    openTab(state, tab) {
      const index = this.openedTabs.indexOf(tab)
      if (index < 0) {
        state.openedTab.push(tab)
      }
      this.commit('setActiveTab', tab)
    },
    closeTab(state, tab) {
      const index = this.openedTabs.indexOf(tab)
      if (index >= 0) {
        state.openedTabs.splice(index, 1)
      }
      const activeIndex = (state.openedTabs.length > index ? index : state.openedTabs.length - 1)
      this.commit('setActiveTab', state.openedTabs[activeIndex])
    },
    setActiveItem(state, item) {
      const tab = this.openedTabs.find(tab => tab.content === item)
      if (tab) {
        this.commit('setActiveTab', tab)
      }
    },
    /**
     * 打开内容，内容将在标签页中打开
     * item = { editor, content, title, icon }
     */
    openItem(state, item) {
      // 如果已经打开，则激活显示
      const openedTab = state.openedTabs.find(tab => tab.content === item)
      if (openedTab) {
        this.commit('setActiveTab', openedTab)
        return
      }

      const editorOptions = editor.getEditor(item.contentType)
      if (!editorOptions) {
        throw new Error(`没有找到类型${item.contentType}的编辑器！`)
      }
      const title = _.shortString(basename(item.id))
      const newTab = {
        title,
        icon: editorOptions.icon,
        content: item,
        editor: editorOptions.component,
        openTime: new Date()
      }
      this.commit('openTab', newTab)
    },
    /**
     *  关闭指定标签页
     */
    closeItem(state, item) {
      const tab = state.openedTabs.find(tab => tab.content === item)
      if (tab) {
        this.commit('closeTab', tab)
      }
    },

    // ********************Sidebar************************
    setActiveSidebar(state, item) {
      state.activeSidebar = item
    },
    showSidebar(state, sidebar) {
      if (sidebar) {
        state.activeSidebar = sidebar
      }
      state.sidebarVisible = true
    },
    hideSidebar(state) {
      state.sidebarVisible = false
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    // ********************Bottombar************************
    setActiveBottombar(state, item) {
      state.activeBottombar = item
    },
    showBottombar(state) {
      state.bottombarVisible = true
    },
    hideBottombar(state) {
      state.bottombarVisible = false
    },
    toggleBottombar(state) {
      state.bottombarVisible = !state.bottombarVisible
    }
  },
  actions: {
    async executeCommand(x, command) {
      commands.exec(command)
    },
    async exec(x, command) {
      commands.exec(command)
    },
    async refreshContentList({ commit }, { resourceType, path }) {
      resource.list(`${resourceType}://${path}`)
    },
    // 保存所有打开的项
    async saveAll({ commit }, { id }) {

    },
    // 打开资源, arg可以是uri字符串，也可以是对象{ resourceType, id }
    async open({ commit }, arg) {
      let data
      if (_.isObject(arg)) {
        const { resourceType, id } = arg
        const mgr = resource(resourceType)
        data = await mgr.get(id)
        data.resourceType = resourceType
      } else if (_.isString(arg)) {
        const uri = arg
        data = await resource.get(uri)
      }
      commit('openItem', data)
    },
    // 保存内容
    async save({ commit, dispatch }, content) {
      const { id, contentType, resourceType, data } = content
      const mgr = resource(contentType)
      await mgr.set(id, data)
      commit('contentSaved', content)
      const path = resource.parentId(id)
      await dispatch('refreshContentList', { resourceType, path })
    },
    async create({ commit, dispatch }, content) {
      const { id, resourceType, data } = content
      const mgr = resource(resourceType)
      await mgr.create(id, data)
      commit('contentSaved', content)
      const path = resource.parentId(id)
      await dispatch('refreshContentList', { resourceType, path })
    },
    activeDefaultBottombar({ commit, getters }) {
      if (getters.bottombars.length > 0) {
        commit('setActiveBottombar', getters.bottombars[0])
      }
    },
    activeDefaultSidebar({ commit, getters }) {
      if (getters.sidebars.length > 0) {
        commit('setActiveSidebar', getters.sidebars[0])
      }
    }
  },
  modules: {},
  strict: process.env.NODE_ENV !== 'production'
})

/**
 * 注册模块 或者 注销模块 以及获取store
 * @param {string} name - 模块名称
 * @param {*} module - 模块配置，请参考Vuex moduel
 */
function store(name, module) {
  if (module) {
    if (instance.modules[name]) {
      throw new Error(`Store模块命名冲突，名称'${name}'已被注册！`)
    }
    instance.registerModule(name, module)
  }
  if (name) {
    return instance.unregisterModule(name)
  }

  // 直接调用返回
  return instance
}

// 注册服务
service('store', store)

export default store

// if (module.hot) {
//   // 使 action 和 mutation 成为可热重载模块
//   module.hot.accept(['./mutations', './modules/a'], () => {
//     // 获取更新后的模块
//     // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
//     const newMutations = require('./mutations').default
//     const newModuleA = require('./modules/a').default
//     // 加载新模块
//     store.hotUpdate({
//       mutations: newMutations,
//       modules: {
//         a: newModuleA
//       }
//     })
//   })
// }

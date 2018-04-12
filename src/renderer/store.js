import _ from './utils'
import resource from './resource'
import toolbox from './toolbox'
import editor from './editor'
// import config from './config'
import Vuex from 'vuex'
import menus, { addItem } from './menus'
import { basename } from 'path'

// const hideToolbox = config.get('hide-toolboxes')

let instance

const rootStore = {
  state: {
    version: '0.1.0',
    activeBottombareTab: null,
    menus,
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
    bottombarVisible: false,
    activeBottombar: 'div',
    editors: editor.all,
    resourceTree: {}
  },
  getters: {
    activeItem(state) {
      return state.activeTab ? state.activeTab.content : null
    },
    openedItems(state) {
      return state.openedTabs.map(tab => tab.content)
    },
    sidebars(state) {
      // TODO: 过滤隐藏的工具栏
      return toolbox.sidebars()
    },
    bottombars(state) {
      // TODO: 过滤隐藏的工具栏
      return toolbox.bottombars()
    }
  },
  mutations: {
    // *************************Menus*****************************
    addMenu(state, { menu, indexes }) {
      addItem(menu, indexes)
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
    hdieBottombar(state) {
      state.bottombarVisible = false
    },
    toggleBottombar(state) {
      state.bottombarVisible = !state.bottombarVisible
    }
  },
  actions: {
    async executeCommand({ commit }, command) {
      window.alert(`Command '${command}' executed!!`)
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
    }
  },
  modules: {},
  strict: process.env.NODE_ENV !== 'production'
}

function store(id, module) {
  if (module) {
    if (instance) {
      throw new Error('必须在初始化完成前注册Store。')
    }
    if (rootStore.modules[id]) {
      throw new Error(`Store模块命名冲突，名称'${id}'已被注册！`)
    }
    rootStore.modules[id] = module
  }
  if (id) {
    return rootStore.modules[id]
  }
  // 直接调用返回
  if (!id && !module) {
    if (!instance) {
      instance = new Vuex.Store(rootStore)
    }
    return instance
  }
}

export default store

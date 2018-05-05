import resource from '../resource'
import editor from '../editor'
import menus from '../menus'
import toolbox from '../toolbox'
import helper from '../helper'
import commands from '../commands'
import config from '../config'
import _ from '../utils'
import bus from '../bus'
const hidedToolboxes = config.get('hide-toolboxes')

export default {
  state: {
    version: '0.1.0',
    activeBottombareTab: null,
    // 打开的内容
    openeds: {},
    // 打开的标签页
    openedTabs: [],
    activeTab: null,
    // 打开的工具栏
    toolboxes: {
      'j3-components-box': true
    },
    activeSidebar: null,
    sidebarVisible: true,
    bottombarVisible: true,
    activeBottombar: null,
    editors: editor.all,
    resourceTree: {},
    // 拖动数据
    dragData: null,
    dragging: false,
    hidedToolboxes
  },
  getters: {
    sidebars() { return toolbox.sidebars() },
    bottombars() { return toolbox.bottombars() },
    activeContent(state) {
      return state.activeTab ? state.activeTab.content : null
    },
    menus() {
      toolbox.refreshViewMenus()
      return menus()
    },
    openedContents(state) {
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
    ...helper.setterMutation(function(state, key, value, setter) {
      // 自定义处理函数，调用setter(value)可以修属性值。
      // switch (key) {
      //   case 'sidebars':
      //     break
      //   default:
      //     break
      // }
      setter(value)
    }),
    beginDrag(state, data) {
      state.dragData = data
      state.dragging = true
    },
    endDrag(state, data) {
      state.dragData = null
      state.dragging = false
    },
    preventDrag(state) {
      state.dragData.prevent = true
    },
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
    openTab(state, tab) {
      const index = state.openedTabs.indexOf(tab)
      if (index < 0) {
        state.openedTabs.push(tab)
        state.openeds[tab.uri] = tab.context
      }
      this.commit('setActiveTab', tab)
    },
    closeTab(state, tab) {
      const index = _.isNumber(tab) ? tab : state.openedTabs.indexOf(tab)
      tab = _.isNumber(tab) ? state.openedTabs[index] : tab
      if (index >= 0) {
        delete state.openeds[tab.uri]
        state.openedTabs.splice(index, 1)
      }
      if (state.openedTabs.length > 0) {
        const activeIndex = (state.openedTabs.length > index ? index : state.openedTabs.length - 1)
        this.commit('setActiveTab', activeIndex)
      } else {
        this.commit('setActiveTab', null)
      }
    },
    setActiveTabByUri(state, uri) {
      const index = state.openedTabs.findIndex(tab => tab.uri === uri)
      if (index >= 0) {
        this.commit('setActiveTab', index)
      }
    },
    /**
     *  关闭指定标签页
     */
    closeItem(state, item) {
      const index = state.openedTabs.findIndex(tab => tab.content === item)
      if (index >= 0) {
        this.commit('closeTab', index)
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
      state.activeSidebar = null
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
    },
    editorCreated(state, { context, getChangedValue }) {
      context.getChangedValue = getChangedValue
      context.changed = false
    },
    editorChanged(state, context) {
      context.changed = true
    },
    editorSaved(state, context) {
      context.changed = false
    }
  },
  actions: {
    async executeCommand(x, command) {
      commands.exec(command)
    },
    async exec(x, command) {
      commands.exec(command)
    },
    // 打开资源, arg可以是uri字符串，也可以是对象{ resourceType, uri }
    async open({ commit, dispatch, state }, arg) {
      let data
      let uri = arg
      if (_.isObject(arg)) {
        uri = resource.toUriString(arg)
      }
      if (state.openeds[uri]) {
        commit('setActiveTabByUri', uri)
        return
      }
      data = await resource.get(uri)
      return dispatch('openContent', data)
    },

    /**
     * 打开内容，内容将在标签页中打开
     * item = { editor, content, title, icon }
     */
    openContent({ state }, content) {
      // 如果已经打开，则激活显示
      const tab = state.openedTabs.find(tab => tab.content === content)
      if (tab) {
        this.commit('setActiveTab', tab)
        return
      }

      const editorOptions = editor.getEditor(content.contentType)
      if (!editorOptions) {
        // editorOptions = editor.getEditor('*')
        // if (!editorOptions) {
        throw new Error(`没有找到类型${content.contentType}的编辑器！`)
        // }
      }

      // const value = (editorOptions.convertFrom || _.toString)(content.data)
      const context = {
        changed: false,
        // 通过函数解耦, 待组件创建成功后，会返回获取修改后的值函数。
        getValue: () => (editorOptions.convertFrom || _.toString)(content.data),
        getChangedValue: () => { throw new Error('需要由editor返回绑定函数！') },
        getData: () => content.data,
        getChangedData: () => {
          const value = newTab.context.getChangedValue()
          return (editorOptions.convertTo || _.toString)(value)
        }
      }
      const newTab = {
        uri: content.uri,
        path: content.path,
        title: content.name,
        icon: editorOptions.icon,
        // content: content,
        context,
        editor: editorOptions,
        openTime: new Date()
      }
      this.commit('openTab', newTab)
    },
    isOpened({ state }, uri) {
      return state.openeds.hasOwnProperty(uri)
    },
    // 关闭所有打开项
    async closeAll({ dispatch, state }) {
      for (let i = state.openedTabs.length - 1; i >= 0; i--) {
        const tab = state.openedTabs[i]
        await dispatch('close', tab)
      }
    },
    // 关闭打开的项
    async close({ commit, state }, arg) {
      let tab
      if (arg === null || arg === undefined) {
        tab = state.activeTab
      } else if (_.isString(arg)) {
        const uri = arg
        tab = state.openedTabs.find(tab => tab.uri === uri)
      } else if (_.isObject(arg)) {
        tab = arg
      } if (_.isNumber(arg)) {
        const index = arg
        tab = state.openedTabs[index]
      }
      if (!tab) {
        throw new Error('未指定要关闭的项或者未打开项！')
      }

      if (tab.context.changed) {
        const confirm = await helper.confirm(`${tab.title}尚未保存，您确定要关闭吗？`, { type: 'warning' })
        if (!confirm) return false
      }
      commit('closeTab', tab)
      return true
    },
    // 保存内容
    async save({ commit, state }, tab) {
      bus.emit('beforesave', tab)
      tab = tab || state.activeTab
      // 预处理
      // commit('updateEditorData', tab)
      const { uri, path } = tab
      const data = tab.context.getChangedData()
      const toSave = { uri, path, data }
      await resource.set(toSave)
      commit('editorSaved', tab.context)
    },
    // 保存所有
    async saveAll({ state, dispatch }) {
      for (const tab of state.openedTabs) {
        await dispatch('save', tab)
      }
    },
    // 创建内容
    async create({ commit, dispatch }, content) {
      const { uri, data } = content
      await resource.create(uri, data)
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
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true
}

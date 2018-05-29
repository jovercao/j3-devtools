import resource from '../resource'
import editor from '../editor'
import menus from '../menus'
import toolbox from '../toolbox'
import helper from '../helper'
import config from '../config'
import _ from '../utils'
import OpenDialog from '../views/dialogs/OpenDialog'
import commands from '../commands'
import messages from '../messages'
const hidedToolboxes = config.get('hide-toolboxes')

export default {
  state: {
    // 测试
    test: {
      string: 'abc',
      array: [
        'a',
        'b',
        {
          name: 'innerObject',
          value: 'ab'
        }
      ]
    },
    // 剪切板
    clipboard: null,
    // {
    //   type: '',
    //   data: null,
    //   source: ''
    // },
    // 版本号
    version: '0.1.0',
    // 激活的底栏
    activeBottombareTab: null,
    // 打开的内容
    openeds: {},
    // 打开的标签页
    openedTabs: [],
    // 激活的当前页面
    activeTab: null,
    // 打开的项目对象
    project: null,
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
    sidebars() {
      return toolbox.sidebars()
    },
    bottombars() {
      return toolbox.bottombars()
    },
    activeContent(state) {
      return state.activeTab ? state.activeTab.content : null
    },
    menus() {
      toolbox.refreshViewMenus(menus, commands)
      return menus()
    },
    openedContents(state) {
      return state.openedTabs.map(tab => tab.content)
    },
    visibleBottombars(state) {
      return toolbox
        .bottombars()
        .filter(item => !state.hidedToolboxes(item.name))
    },
    visibleSidebars(state) {
      return toolbox
        .sidebars()
        .filter(item => !state.hidedToolboxes.includes(item.name))
    }
  },
  syncMethods: {
    openPath({ resourceType, path }) {

    },
    copyToClipboard(content) {
      this.state.clipboard = content
    },
    clearClipboard() {
      this.state.clipboard = null
    },
    // // setter接口
    // ...helper.setterMutation(function(state, key, value, setter) {
    //   // 自定义处理函数，调用setter(value)可以修属性值。
    //   // switch (key) {
    //   //   case 'sidebars':
    //   //     break
    //   //   default:
    //   //     break
    //   // }
    //   setter(value)
    // }),
    beginDrag(data) {
      const { state } = this
      state.dragData = data
      state.dragging = true
    },
    endDrag(data) {
      const { state } = this
      state.dragData = null
      state.dragging = false
    },
    preventDrag() {
      const { state } = this
      state.dragData.prevent = true
    },
    // *************************Toolbox**************************
    showToolbox(state, name) {
      hidedToolboxes[name] = true
    },
    hideToolbox(name) {
      hidedToolboxes[name] = true
    },
    toggleToolbox(name) {
      hidedToolboxes[name] = !hidedToolboxes[name]
    },
    // *************************Menus*****************************
    addMenu({ menu, indexes }) {
      menus.add(menu, indexes)
    },
    removeMenu(menu) {
      menus.removeItem(menu)
    },
    // *********************tab and items*************************
    setActiveTab(tab) {
      const { state } = this
      if (_.isNumber(tab)) {
        tab = state.openedTabs[tab]
      }
      state.activeTab = tab
      if (tab) {
        messages.dispatch('tabActived', tab)
      }
    },
    closeActiveTab() {
      this.closeTab(this.state.activeTab)
    },
    openTab(tab) {
      const { state } = this
      const index = state.openedTabs.indexOf(tab)
      if (index < 0) {
        state.openedTabs.push(tab)
        state.openeds[tab.uri] = tab.context
      }
      this.setActiveTab(tab)
    },
    closeTab(tab) {
      const { state } = this
      const index = _.isNumber(tab) ? tab : state.openedTabs.indexOf(tab)
      tab = _.isNumber(tab) ? state.openedTabs[index] : tab
      if (index >= 0) {
        delete state.openeds[tab.uri]
        state.openedTabs.splice(index, 1)
      }
      // 当前页被关闭，激活另一个页
      if (state.activeTab === tab) {
        if (state.openedTabs.length > 0) {
          const activeIndex =
            state.openedTabs.length > index ? index : state.openedTabs.length - 1
          this.setActiveTab(activeIndex)
        } else {
          this.setActiveTab(null)
        }
      }
    },
    /**
     *  关闭指定标签页
     */
    closeItem(item) {
      const { state } = this
      const index = state.openedTabs.findIndex(tab => tab.content === item)
      if (index >= 0) {
        this.closeTab(index)
      }
    },
    setActiveTabByUri(uri) {
      const { state } = this
      const index = state.openedTabs.findIndex(tab => tab.uri === uri)
      if (index >= 0) {
        this.setActiveTab(index)
      }
    },
    // ********************Sidebar************************
    setActiveSidebar(item) {
      const { state } = this
      state.activeSidebar = item
    },
    showSidebar(sidebar) {
      const { state } = this
      if (sidebar) {
        state.activeSidebar = sidebar
      }
      state.sidebarVisible = true
    },
    hideSidebar() {
      const { state } = this
      state.sidebarVisible = false
      state.activeSidebar = null
    },
    toggleSidebar() {
      const { state } = this
      state.sidebarVisible = !state.sidebarVisible
    },
    // ********************Bottombar************************
    setActiveBottombar(item) {
      this.state.activeBottombar = item
    },
    showBottombar() {
      this.state.bottombarVisible = true
    },
    hideBottombar() {
      this.state.bottombarVisible = false
    },
    toggleBottombar() {
      this.state.bottombarVisible = !this.state.bottombarVisible
    },
    editorCreated({ context, getChangedValue }) {
      context.getChangedValue = getChangedValue
      context.changed = false
    },
    editorChanged(context) {
      context.changed = true
    },
    editorSaved(context) {
      context.changed = false
    },
    /**
     * 打开内容，内容将在标签页中打开
     * item = { editor, content, title, icon }
     */
    _openContent(content) {
      const { state } = this
      // 如果已经打开，则激活显示
      const tab = state.openedTabs.find(tab => tab.content === content)
      if (tab) {
        this.setActiveTab(tab)
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
        getChangedValue: () => {
          throw new Error('需要由editor返回绑定函数！')
        },
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
      this.openTab(newTab)
    },
    isOpened(uri) {
      const { state } = this
      return state.openeds.hasOwnProperty(uri)
    },
    activeDefaultBottombar() {
      const { getters } = this
      if (getters.bottombars.length > 0) {
        this.setActiveBottombar(getters.bottombars[0])
      }
    },
    activeDefaultSidebar() {
      const { getters } = this
      if (getters.sidebars.length > 0) {
        this.setActiveSidebar(getters.sidebars[0])
      }
    },
    exec(command) {
      commands.exec(command)
    }
  },
  methods: {
    // 打开资源, arg可以是uri字符串，也可以是对象{ resourceType, uri }
    async open(arg) {
      const { state } = this
      let data
      let uri = arg
      if (_.isObject(arg)) {
        uri = resource.toUriString(arg)
      }
      if (state.openeds[uri]) {
        this.setActiveTabByUri(uri)
        return
      }
      data = await resource.get(uri)
      return this._openContent(data)
    },
    // 关闭所有打开项
    async closeAll() {
      const { state } = this
      for (let i = state.openedTabs.length - 1; i >= 0; i--) {
        const tab = state.openedTabs[i]
        await this.close(tab)
      }
    },
    // 关闭打开的项
    async close(arg) {
      const { state } = this
      let tab
      if (arg === null || arg === undefined) {
        tab = state.activeTab
      } else if (_.isString(arg)) {
        const uri = arg
        tab = state.openedTabs.find(tab => tab.uri === uri)
      } else if (_.isObject(arg)) {
        tab = arg
      }
      if (_.isNumber(arg)) {
        const index = arg
        tab = state.openedTabs[index]
      }
      if (!tab) {
        throw new Error('未指定要关闭的项或者未打开项！')
      }

      if (tab.context.changed) {
        const confirm = await helper.confirm(
          `${tab.title}尚未保存，您确定要关闭吗？`,
          { type: 'warning' }
        )
        if (!confirm) return false
      }
      this.closeTab(tab)
      return true
    },
    async doSave(tab) {
      const { state } = this
      if (!state.activeTab) return
      // 预处理
      // this.updateEditorData(tab)
      const { uri, path } = tab
      const data = tab.context.getChangedData()
      const toSave = { uri, path, data }
      await resource.set(toSave)
    },
    // 保存内容
    async save(tab) {
      tab = tab || this.state.activeTab
      if (!tab) return
      try {
        await this.doSave(tab)
        helper.message({
          type: 'success',
          showClose: true,
          message: '保存成功!'
        })
      } catch (err) {
        helper.message({
          type: 'error',
          showClose: true,
          message: '保存失败!' + err
        })
      }
      this.editorSaved(tab.context)
    },
    // 保存所有
    async saveAll() {
      const { state } = this
      try {
        for (const tab of state.openedTabs) {
          await this.doSave(tab)
        }
      } catch (err) {
        helper.message({
          type: 'error',
          showClose: true,
          message: '保存失败!' + err
        })
      }
    },
    // 创建内容
    async create(content) {
      const { uri, data } = content
      await resource.create(uri, data)
    },
    async openProject() {
      const result = await OpenDialog.show()
      if (result.ok) {
        this.openPath({
          resourceType: result.resourceType,
          path: result.selected.path
        })
      }
    }
  },
  modules: {},
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true
}

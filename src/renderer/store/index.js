import Vue from 'vue'
import Vuex from 'vuex'
import uiDesigner from './modules/ui-designer'
import { service } from '../service'
import _ from '../utils'

Vue.use(Vuex)

const { resource } = service
export default new Vuex.Store({
  mutations: {
    selectTab(state, item) {
      state.activeTab = item
    },
    selectSidebar(state, item) {
      state.activeSidebar = item
    },
    /**
     * 切换侧边栏是否可见
     */
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    /**
     * 打开标签页
     * item = { editor, content, title, icon }
     */
    openTab(state, item) {
      const index = state.openedTabs.indexOf(item)
      if (index < 0) {
        Vue.set(state.openedTabs, state.openedTabs.length, item)
      }
      this.commit('selectTab', item)
    },
    /**
     *  关闭指定标签页
     */
    closeTab(state, item) {
      const index = state.openedTabs.indexOf(item)
      if (index >= 0) {
        state.openedTabs.splice(index, 1)
      }
      // 切换到下一个标签
      const activeIndex = (state.openedTabs.length > index ? index : state.openedTabs.length - 1)
      this.commit('selectTab', state.openedTabs[activeIndex])
    }
  },
  state: {
    version: '0.1.0',
    activeTab: null,
    sidebarVisible: true,
    // 打开的编辑器
    openedTabs: [
      /*
      {
        * 标题
        title: '',
        * 图标
        icon: '',
        * 打开所使用的编辑器
        editor: '',
        * 打开的内容，数据
        content:  {
          id: String,
          contentType: String,
          title: String,
          data: Any,
          openTime: Date
          lastSaveTime: Date,
        }
      }
      */
    ],
    // 已注册的编辑器，用于打开编辑
    editors: [
      {
        // 编辑器名称
        name: '',
        // 编辑器所带的Vue组件名称
        component: '',
        // 是否允许多开
        multiple: false,
        // 兼容的资源类型
        contentType: [
          'j3-view',
          'vue-component-file'
        ]
      }
    ],
    contentList: {
    },
    // 内容类型列表
    contentTypes: [
      'vue-file',
      'any-file',
      'j3-view',
      'j3-query',
      'j3-model'
    ],
    activeSidebar: 'ExplorerSidebar',
    sidebars: {
      ExplorerSidebar: 'ExplorerSidebar',
      ComponentsSidebar: 'ComponentsSidebar'
    }
  },

  actions: {
    // 打开资源
    async openContent({ commit }, { contentType, id }) {
      const mgr = resource(contentType)
      const data = await mgr.get(id)
      commit('openTab', {
        icon: '',
        title: _.shortString(id),
        data,
        content: {
          id,
          contentType,
          openTime: new Date()
        }
      })
    },
    // 保存资源
    async saveContent({ commit, dispatch }, content) {
      const { id, contentType, data } = content
      const mgr = resource(contentType)
      await mgr.set(id, data)
      commit('contentSaved', content)
      await dispatch('refreshContentList')
    },
    async createContent({ commit, dispatch }, content) {
      const { id, contentType, data } = content
      const mgr = resource(contentType)
      await mgr.create(id, data)
      commit('contentSaved', content)
      const pid = resource.parentId(id)
      await dispatch('refreshContentList', { contentType, pid })
    },
    async refreshContentList({ commit }, { contentType, id }) {
      const mgr = resource(contentType)
      const pid = resource.parentId(id)
      const list = await mgr.list(pid)
      commit('replaceContentList', { pid, list })
    }
  },
  modules: {
    'ui-designer': uiDesigner
  },
  strict: process.env.NODE_ENV !== 'production'
})

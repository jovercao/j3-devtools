import { service } from '../../service'
import Vue from 'vue'

const state = {
  // 视图数据
  viewData: null,
  // 选中的视图项
  selectedItem: null,
  // 高亮的视图项
  hlItem: null,
  // 当前显示的侧边栏
  activeSidebar: 'ComponentsSidebar',
  // 当前显示的页
  activeView: 'DesignerView',
  // 设计摘要数据
  catalogs: null
}

const getters = {
  // 当前选择组件信息
  curCmp(state) {
    return state.selectedItem ? state.catalogs.components[state.selectedItem.type] : {}
  },
  // 静态数据，以映射方式返回
  // TODO: 升级catalogs为所有描述
  components(state) {
    return state.catalogs ? state.catalogs.components : null
  }
}

const mutations = {
  selectItem(state, item) {
    state.selectedItem = item
  },
  changeHlItem(state, item) {
    state.hlItem = item
  },
  changeProp(state, { prop, value }) {
    state.selectedItem.props[prop] = value
  },
  addChildItem(state, { viewData, dropedViewData, slot }) {
    console.log(dropedViewData)
    const comp = state.catalogs.components[viewData.type]
    const accepts = comp.slots[slot].accepts
    if (accepts !== '*') {
      if (!accepts.includes(dropedViewData.type)) {
        throw Error('不支持的子组件！')
      }
    }

    if (!viewData.slots) {
      Vue.set(viewData, 'slots', {})
    }
    if (!viewData.slots[slot]) {
      Vue.set(viewData.slots, slot, [])
    }
    const items = viewData.slots[slot]
    Vue.set(items, items.length, dropedViewData)
  },
  changeActiveView(state, view) {
    state.activeView = view
  },
  selectSidebar(state, sidebar) {
    state.activeSidebar = sidebar
  },
  openView(state, viewData) {
    state.viewData = viewData
  },
  loadCatalogs(state, catalogs) {
    state.catalogs = catalogs
  }
}

const actions = {
  async selectItem({ commit }, item) {
    // do something async
    commit('selectItem', item)
  },
  selectSidebar({ commit }, sidebar) {
    commit('selectSidebar', sidebar)
  },
  changeProp({ commit }, { prop, value }) {
    commit('changeProp', { prop, value })
  },
  changeHlItem({ commit }, item) {
    commit('changeHlItem', item)
  },
  async openView({ commit }, path) {
    const view = await service.readView(path)
    commit('openView', view)
  },
  async loadCatalogs({ commit }, uri) {
    const catalogs = await service.getCatalogs()
    commit('loadCatalogs', catalogs)
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}

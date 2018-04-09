import { service } from '../../service'
import _ from '../../utils'

// * 准备ViewData数据
const properViewData = (item) => {
  for (const slot in item.slots) {
    const items = item.slots[slot]
    if (items) {
      items.forEach((childItem, index) => {
        // 添加父级指针，方便后续操作
        childItem.slot = slot
        childItem.parent = item
        childItem.index = index
        properViewData(childItem)
      })
    }
  }
}

const state = {
  // 视图数据
  viewData: null,
  // 选中的视图项
  selectedItem: null,
  viewId: '',
  // 高亮的视图项
  hoverItem: null,
  // 当前显示的侧边栏
  activeSidebar: 'ComponentsSidebar',
  // 当前显示的页
  activeView: 'DesignerView',
  // 设计摘要数据
  catalogs: null,
  // 拖动数据
  dragData: null,
  dragging: false
}

const getters = {
  // 当前选择组件信息
  selectedComponent(state) {
    return state.selectedItem ? state.catalogs.components[state.selectedItem.type] : {}
  },
  components(state) {
    return state.catalogs ? state.catalogs.components : {}
  },
  templates(state) {
    return state.catalogs ? state.catalogs.templates : []
  }
}

const mutations = {
  selectItem(state, item) {
    state.selectedItem = item
  },
  beginDrag(state, data) {
    state.dragData = data
    state.dragging = true
  },
  endDrag(state, data) {
    state.dragData = null
    state.dragging = false
  },
  selectParentItem(state) {
    if (state.selectedItem && state.selectedItem.parent) {
      state.selectedItem = state.selectedItem.parent
    }
  },
  hoverEnter(state, item) {
    state.hoverItem = item
  },
  hoverLeave(state) {
    state.hoverItem = null
  },
  changeProp(state, { prop, value, oldValue }) {
    state.selectedItem.props[prop] = value
  },
  removeItem(state, item) {
    if (item.isRoot) {
      this.viewData = null
      return
    }
    // 从原有插糟移除
    if (item.parent) {
      const slot = item.parent.slots[item.slot]
      const index = slot.indexOf(item)
      if (index >= 0) {
        slot.splice(index, 1)
        for (let i = index; i < slot.length; i++) {
          slot[i].index = i
        }
      }
    }
    this.commit('ui-designer/selectItem', null)
  },
  addItem(state, { container, slot, item, index }) {
    const comp = state.catalogs.components[container.type]
    const accepts = comp.slots[slot].accepts
    if (accepts !== '*') {
      if (!accepts.includes(item.type)) {
        throw Error('不支持的子组件！')
      }
    }

    if (!container.slots) {
      container.slots = {}
    }
    if (!container.slots[slot]) {
      container.slots[slot] = []
    }

    // 从原有插糟移除
    this.commit('ui-designer/removeItem', item)
    item.parent = container
    item.slot = slot
    // 插入指定位置
    if (_.isNumber(index) && index >= 0) {
      container.slots[slot].splice(index, 0, item)
      for (let i = index; i < container.slots[slot].length; i++) {
        container.slots[slot][i].index = i
      }
    } else {
      item.index = container.slots[slot].length
      container.slots[slot].push(item)
    }
    properViewData(item)
    this.commit('ui-designer/selectItem', item)
  },
  changeActiveView(state, view) {
    state.activeView = view
  },
  selectSidebar(state, sidebar) {
    state.activeSidebar = sidebar
  },
  openView(state, { id, data }) {
    this.selectedItem = null
    state.viewData = data
    state.viewId = id
    data.isRoot = true
    properViewData(data)
  },
  loadCatalogs(state, catalogs) {
    state.catalogs = catalogs
  }
}

const actions = {
  // async selectItem({ commit }, item) {
  //   // do something async
  //   commit('selectItem', item)
  // },
  // selectSidebar({ commit }, sidebar) {
  //   commit('selectSidebar', sidebar)
  // },
  // changeProp({ commit }, { prop, value }) {
  //   commit('changeProp', { prop, value })
  // },
  // hoverEnter({ commit }, item) {
  //   commit('hoverEnter', item)
  // },
  async openView({ commit }, id) {
    const data = await service.resource('demo-view').get(id)
    // * 为子级添加上低级指针，方便后续操作。
    commit('openView', { id, data })
  },
  loadCatalogs({ commit }, uri) {
    const catalogs = service.catalogs
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

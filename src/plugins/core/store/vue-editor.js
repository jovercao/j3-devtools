import { checkAccepts, load as loadCatalogs } from '../service/catalogs'
import _ from 'lodash'
import { properViewData } from '../helper/viewData'
import ctx from '@'
import Vue from 'vue'

export const namespace = 'vue-editor'

// editor 需要共享的状态，使用store模块声明
// vue-eidtor

const state = {
  // 当前视图数据
  viewData: null,
  // 选中的视图项
  activeItem: null,
  // 选中的项，多选
  selecteds: [],
  // 高亮的视图项
  hoverItem: null,
  // 设计摘要信息
  catalogs: loadCatalogs()
}

const getters = {
  // 当前选择组件信息
  selectedComponent(state) {
    return state.activeItem && state.catalogs.components[state.activeItem.type]
  },
  components(state) {
    return state.catalogs ? state.catalogs.components : {}
  },
  icons(state) {
    return state.catalogs ? state.catalogs.icons : {}
  },
  templates(state) {
    return state.catalogs ? state.catalogs.templates : []
  },
  componentTemplates(state) {
    return state.catalogs && state.catalogs.templates && state.catalogs.templates.components
  }
}

const syncMethods = {
  select(item) {
    const { state } = this
    if (!item) throw new Error('被选择的项不能为空')
    if (!state.selecteds.find(i => i === item)) {
      state.selecteds.push(item)
    }
    state.activeItem = item
  },
  deselect(item) {
    const { state } = this
    const index = state.selecteds.findIndex(i => i === item)
    if (index >= 0) {
      state.selecteds.splice(index, 1)
    }
  },
  deselectAll() {
    const { state } = this
    state.activeItem = null
    state.selecteds.splice(0, state.selecteds.length)
  },
  selectParent() {
    const { state } = this
    const current = state.activeItem
    this.deselectAll()
    if (current && current.parent) {
      this.select(current.parent)
    }
  },
  hoverEnter(item) {
    this.state.hoverItem = item
  },
  hoverLeave() {
    this.state.hoverItem = null
  },
  changeProp({ prop, value, oldValue, item }) {
    Vue.set((item || this.state.activeItem).props, prop, value)
  },
  changeSelectedsProp({ prop, value, oldValue, item }) {
    for (const item of this.state.selecteds) {
      Vue.set(item.props, prop, value)
    }
  },
  beginEdit(viewData) {
    const { state } = this
    if (state.viewData) {
      throw new Error('在调用beginEdit之前必须调用 endEdit以清除上一次的编辑状态！')
    }
    if (!viewData.propered) {
      properViewData(viewData)
      viewData.propered = true
    }
    state.viewData = viewData
  },
  endEdit() {
    this.state.viewData = null
    this.deselectAll()
    this.hoverLeave()
  },
  remove(item) {
    // 从原有插糟移除
    if (item.parent) {
      this.deselect(item)
      const slot = item.parent.slots[item.slot]
      const index = slot.indexOf(item)
      if (index >= 0) {
        slot.splice(index, 1)
        for (let i = index; i < slot.length; i++) {
          slot[i].index = i
        }
      }
    }
  },
  removeSelecteds() {
    this.state.selecteds.forEach(item => this.remove(item))
  },
  add({ container, slot, item, index }) {
    if (!checkAccepts(container, slot, item)) {
      throw Error('不支持的子组件！')
    }

    if (!container.slots) {
      container.slots = {}
    }
    if (!container.slots[slot]) {
      container.slots[slot] = []
    }

    // 如果是从别处移动过来的
    if (item.parent) {
      // 从原有插糟移除
      this.remove(item)
      properViewData(item)
    }
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
    this.select(item)
  }
}

const methods = {
  async loadCatalogs() {
    const catalogs = await ctx.service('catalogs').load()
    this.$commit((state) => { state.catalogs = catalogs })
  }
}

export default () => ({
  namespaced: true,
  getters,
  state,
  methods,
  syncMethods
})

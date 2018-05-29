import {
  checkAccepts,
  load as loadCatalogs
} from '../service/catalogs'
import _ from 'lodash'
import {
  properViewData
} from '../helper/viewData'
import Vue from 'vue'

export const namespace = 'vue-editor'
export const viewDataType = 'view-data'

// editor 需要共享的状态，使用store模块声明
// vue-eidtor

const util = {
  cloneItems(items) {
    return (_.isArray(items) ? items : [items]).map(item => {
      // 断开关联再进行复制
      const parent = item.parent
      const old = item
      old.parent = null
      const cloned = _.cloneDeep(old)
      // 复制完成后恢复
      old.parent = parent
      // 非外部来源，检测是否未移动位置
      return cloned
    })
  }
}

const state = {
  // 当前视图数据
  viewData: null,
  // 选中的视图项
  activeItem: null,
  // 选中的项，多选
  selecteds: [],
  // 高亮的视图项
  hoveringItem: null,
  // 拖过的项
  dropTarget: null,
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
  dropContainer(state) {
    return state.dropTarget && state.dropTarget.container
  },
  dropSlot(state) {
    return state.dropTarget && state.dropTarget.slot
  },
  dropContainerSlots(state, getters) {
    const dropContainer = getters.dropContainer
    if (dropContainer) {
      return getters.components[dropContainer.type].slots
    }
    return {}
  },
  componentTemplates(state) {
    return state.catalogs && state.catalogs.templates && state.catalogs.templates.components
  },
  dropable(state, getters, rootState) {
    const dragdata = rootState.dragData
    if (!dragdata || dragdata.type !== viewDataType) return false
    if (!state.dropTarget) return false
    const {
      container,
      slot
    } = state.dropTarget
    const result = checkAccepts(container, slot, dragdata.data)
    return result
  }
}

const syncMethods = {
  select(item) {
    const items = _.isArray(item) ? item : [item]
    const {
      state
    } = this
    if (!item) throw new Error('被选择的项不能为空')
    items.forEach(item => {
      if (!state.selecteds.includes(item)) {
        state.selecteds.push(item)
      }
    })
    state.activeItem = items[items.length - 1]
  },
  deselect(items) {
    const {
      state
    } = this
    if (!_.isArray(items)) {
      items = [ items ]
    }
    items.forEach(item => {
      const index = state.selecteds.findIndex(i => i === items)
      if (index >= 0) {
        state.selecteds.splice(index, 1)
      }
      if (item === state.activeItem) {
        state.activeItem = null
      }
    })
  },
  deselectAll() {
    const {
      state
    } = this
    state.activeItem = null
    state.selecteds.splice(0, state.selecteds.length)
  },
  selectParent() {
    const {
      state
    } = this
    const current = state.activeItem
    this.deselectAll()
    if (current && current.parent) {
      this.select(current.parent)
    }
  },
  hoverEnter(item) {
    this.state.hoveringItem = item
  },
  hoverLeave() {
    this.state.hoveringItem = null
  },
  changeProp({
    prop,
    value,
    oldValue,
    item
  }) {
    Vue.set((item || this.state.activeItem).props, prop, value)
  },
  changeSelectedsProp({
    prop,
    value,
    oldValue,
    item
  }) {
    for (const item of this.state.selecteds) {
      Vue.set(item.props, prop, value)
    }
  },
  beginEdit(viewData) {
    const {
      state
    } = this
    // if (state.viewData) {
    //   throw new Error('在调用beginEdit之前必须调用 endEdit以清除上一次的编辑状态！')
    // }
    if (!viewData.propered) {
      properViewData(viewData)
      viewData.propered = true
    }
    state.viewData = viewData
  },
  endEdit() {
    Vue.set(this.state, 'viewData', null)
    this.deselectAll()
    this.hoverLeave()
  },
  dragenter({
    container,
    slot = 'default'
  }) {
    const {
      state,
      getters
    } = this
    const dragdata = this.$root.state.dragData
    if (!dragdata || dragdata.type !== viewDataType) return
    if (!container) return

    const containerHasSlots = getters.components[container.type].slots && Object.keys(getters.components[container.type].slots).length > 0
    // 如果当前元素没有插糟，则将目标定为父级容器
    if (!containerHasSlots && container.parent) {
      state.dropTarget = {
        container: container.parent,
        slot: container.slot,
        index: container.index
      }
    } else {
      state.dropTarget = {
        container: container,
        slot
      }
    }
    this.hoverEnter(state.dropTarget.container)
  },
  dragleave() {
    this.hoverLeave()
    this.state.dropTarget = null
  },
  dragend() {
    this.state.dropTarget = null
    this.hoverLeave()
    this.$root.endDrag()
  },
  dragstart(items, source) {
    source = source || this.state.viewData
    items = items || _.clone(this.state.selecteds)
    this.$root.beginDrag({
      type: viewDataType,
      source,
      data: items
    })
  },
  drop(isCopy) {
    const {
      state
    } = this
    const {
      container,
      slot,
      index
    } = state.dropTarget
    const dragdata = this.$root.state.dragData
    let items = dragdata.data
    if (!this.getters.dropable) {
      return
    }

    // 外部来源，先进行复制
    if (dragdata.source !== state.viewData || isCopy) {
      items = util.cloneItems(items)
    } else {
      this.remove(items)
    }
    // 记录原容器
    // const sourceContainer = dragdata.source === this.state.viewData && state.activeItem.parent
    this.add({
      container,
      items,
      slot,
      index
    })
    //! 当元素被拖放移动到其他容器后，原有元素被移除，将导致dragend事件无法触发，因此手动触发。
    // if (dragdata.source === this.state.viewData && sourceContainer !== container) {
    this.dragend()
    // }
  },
  copy() {
    const {
      state
    } = this
    // 复制选定的项
    if (state.selecteds.length === 0) return

    const cloned = _.clone(state.selecteds)

    // 复制到剪切板
    this.$root.copyToClipboard({
      action: 'copy',
      type: viewDataType,
      source: 'vue-editor',
      data: cloned
    })
  },
  cut() {
    const {
      state
    } = this
    // 复制选定的项
    if (state.selecteds.length === 0) return

    const cloned = _.clone(state.selecteds)

    this.$root.copyToClipboard({
      action: 'cut',
      type: viewDataType,
      source: state.viewData,
      data: cloned
    })
  },
  parse() {
    const { state } = this
    const clipboard = this.$root.state.clipboard
    if (!clipboard || clipboard.type !== viewDataType) return
    if (state.activeItem) {

      let items = clipboard.data
      // 不兼容，返回
      if (!checkAccepts(state.activeItem, 'default', items)) {
        return
      }

      // 除内部剪切以外，均需要先复制再粘贴
      if (!(clipboard.action === 'cut' && clipboard.source === state.viewData)) {
        items = util.cloneItems(clipboard.data)
      }
      this.add({
        container: state.activeItem,
        slot: 'default',
        items: items
      })
    }
  },
  delete() {
    this.remove(_.clone(this.state.selecteds))
  },
  remove(items) {
    if (!_.isArray(items)) {
      items = [items]
    }
    this.deselect(items)
    items.forEach(item => {
      // 从原有插糟移除
      if (item.parent) {
        const slot = item.parent.slots[item.slot]
        item.parent = null
        const index = slot.indexOf(item)
        if (index >= 0) {
          slot.splice(index, 1)
          for (let i = index; i < slot.length; i++) {
            slot[i].index = i
          }
        }
      }
    })

  },
  removeSelecteds() {
    this.state.selecteds.forEach(item => this.remove(item))
  },
  add({
    container,
    slot,
    items,
    index
  }) {
    if (!checkAccepts(container, slot, items)) {
      throw Error('不兼容的子组件！')
    }

    if (!container.slots) {
      container.slots = {}
    }
    const list = container.slots[slot] || (container.slots[slot] = [])
    if (!_.isArray(items)) {
      items = [items]
    }
    items.forEach(item => {
      // 如果是从别处移动过来的
      if (item.parent) {
        // 从原有插糟移除
        this.remove(item)
      } else {
        properViewData(item)
      }
      item.parent = container
      item.slot = slot
    })
    if (!_.isNumber(index)) {
      index = list.length
    }
    // 插入指定位置
    list.splice(index, 0, ...items)
    for (let i = index; i < list.length; i++) {
      list[i].index = i
    }
    this.deselectAll()
    this.select(items)
  }
}

const methods = {
  async loadCatalogs() {
    const catalogs = await loadCatalogs()
    this.$commit((state) => {
      state.catalogs = catalogs
    })
  }
}

export default () => ({
  namespaced: true,
  getters,
  state,
  methods,
  syncMethods
})

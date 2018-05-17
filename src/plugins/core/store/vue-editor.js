import { checkAccepts } from '../service/catalogs'
import _ from 'lodash'
import { properViewData } from '../helper/viewData'
import ctx from '@'
import Vue from 'vue'

export const namespace = 'vue-editor'
export const viewDataType = 'view-data'

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
  hoveringItem: null,
  // 拖过的项
  dropContainer: null,
  // 拖放的插糟
  dropSlot: 'default',
  // 设计摘要信息
  catalogs: null
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
  // ,dropable(state, getters, rootState) {
  //   const dragdata = rootState.dragData
  //   if (!dragdata || dragdata.type !== viewDataType) return false
  //   if (!state.dropContainer) return false
  //   const { container, slot } = state.dropContainer
  //   return checkAccepts(container, slot, dragdata.data)
  // }
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
    this.state.hoveringItem = item
  },
  hoverLeave() {
    this.state.hoveringItem = null
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
  dragover({ item, slot }) {
    const { state } = this
    const dragdata = this.$root.state.drogData
    if (!dragdata || dragdata.type !== viewDataType) return false
    if (!state.dropContainer) return false
    if (checkAccepts(item, slot, dragdata.data)) {
      state.dropContainer = {
        container: item,
        slot
      }
      return true
    } else if (item.parent && !slot) {
      // 放入父级容器
      if (checkAccepts(item.parent, item.slot, dragdata.data)) {
        state.dropContainer = {
          container: item.parent,
          slot: item.slot
        }
        return true
      }
    }
    return false
  },
  dragstop() {
    this.state.dropContainer = null
  },
  drag(items, source) {
    source = source || 'view-editor'
    items = items || _.clone(this.state.selecteds)
    this.$root.beginDrag({ type: viewDataType, source, data: items })
  },
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
  },
  drop() {
    let index
    const { state } = this
    const container = state.dropContainer
    const slot = state.dropSlot
    const dragdata = this.$root.state.dragData
    let items = dragdata.data
    if (!this.getters.dropable) {
      if (this.checkAccepts()) {
        return
      }
      index = 11
    }
    if (dragdata.type !== viewDataType) {
      return
    }

    // 外部来源，先进行复制
    if (dragdata.source !== this.state.viewData) {
      items = this.cloneItems(items)
    } else {
      // 未移动，不作操作
      if (
        container === items.parent &&
        slot === items.slot &&
        items.index === index
      ) {
        return
      }
      // 同源，先在原处移除
      this.remove(items)
    }
    this.add({ container, items, slot, index })

    this.hideChoosebar()
  },
  copy() {
    const { state } = this
    // 复制选定的项
    if (state.selecteds.length === 0) return

    const cloned = _.clone(state.selecteds)

    // 复制到剪切板
    this.$root.copyToClipboard({ type: viewDataType, source: 'vue-editor', data: cloned })
    console.log('copy')
  },
  cut(items) {
    // 切断联系
    items.forEach(item => {
      this.remove(item)
    })
    this.$root.copyToClipboard({ type: viewDataType, source: 'vue-editor', data: items })
  },
  parse() {
    const clipboard = this.$root.state.clipboard
    if (!clipboard || clipboard.type !== viewDataType) return
    if (this.state.activeItem) {
      // 切断联系后复制
      // state.selecteds.forEach(item => {
      //   const parent = item.parent
      //   item.parent = null
      //   cloned.push(_.cloneDeep(item))
      //   // 复制完成后恢复
      //   item.parent = parent
      // })
      clipboard.data.forEach(item => {
        item.parent = null
        this.add({
          container: this.state.activeItem,
          slot: 'default',
          item: _.cloneDeep(item)
        })
        //   // 复制完成后恢复
        item.parent = parent
      })
    }
    console.log('parse')
  },
  delete(items) {

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
  add({ container, slot, items, index }) {
    if (!checkAccepts(container, slot, items)) {
      throw Error('不兼容的子组件！')
    }

    if (!container.slots) {
      container.slots = {}
    }

    const list = container.slots[slot] || (container.slots[slot] = [])

    // 如果是从别处移动过来的
    if (items.parent) {
      // 从原有插糟移除
      this.remove(items)
      properViewData(items)
    }
    items.parent = container
    items.slot = slot
    // 插入指定位置
    if (_.isNumber(index) && index >= 0) {
      list.splice(index, 0, items)
      for (let i = index; i < list.length; i++) {
        list[i].index = i
      }
    } else {
      items.index = list.length
      list.push(items)
    }
    this.select(items)
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

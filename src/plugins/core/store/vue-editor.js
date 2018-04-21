import { checkAccepts } from '../service/catalogs'
import _ from 'lodash'

// * 准备ViewData数据
function properViewData(item) {
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

// editor 需要共享的状态，使用store模块声明
// vue-eidtor

const state = {
  // 当前视图数据
  viewData: null,
  // 选中的视图项
  selected: null,
  // 高亮的视图项
  hoverItem: null
}

const mutations = {
  select(state, item) {
    state.selected = item
  },
  selectParent(state) {
    if (state.selected && state.selected.parent) {
      state.selected = state.selected.parent
    }
  },
  hoverEnter(state, item) {
    state.hoverItem = item
  },
  hoverLeave(state) {
    state.hoverItem = null
  },
  changeProp(state, { prop, value, oldValue }) {
    state.selected.props[prop] = value
  },
  beginEdit(state, viewData) {
    if (state.viewData) {
      throw new Error('在调用beginEdit之前必须调用 endEdit以清除上一次的编辑状态！')
    }
    if (!viewData.propered) {
      properViewData(viewData)
      viewData.propered = true
    }
    state.viewData = viewData
    // this.commit('select', null)
    // this.commit('hoverLeave')
  },
  endEdit(state) {
    state.viewData = null
    this.commit('select', null)
    this.commit('hoverLeave')
  },
  remove(state, item) {
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
    state.selected = null
  },
  add(state, { container, slot, item, index }) {
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
      this.commit('remove', item)
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
    state.selected = item
  }
}

export default () => ({
  namespaced: true,
  state,
  mutations
})

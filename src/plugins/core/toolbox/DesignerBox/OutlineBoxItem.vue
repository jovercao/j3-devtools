<template>
  <div class="outline-box-item">
    <div
      :style="{ 'padding-left': 6 + deeps * 18 + 'px' }"
      :class="['item', { 'selected': isSelected, actived: isActived, 'heightlight': ishoverItem }]"
      draggable="true"
      @dragstart.stop="$ide.beginDrag({ source: 'inner', type: 'view-data', data: viewData })"
      @dragend.stop="$ide.endDrag(null)"
      @dragover.stop="_onTitleDragover"
      @drop.stop="addDropItem(viewData.parent, viewData.slot, viewData.index, $event)"
      @mouseover.stop="hoverEnter(viewData)"
      @mouseleave.stop="hoverLeave()"
      @click="handlerItemClick"
      >
      <mu-icon v-if="hasSlotsDef(viewData.type)"
          class="icon" :value="expandIcon" @click="toggleExpand" />
      <span>{{title}}</span>
      <div class="right">
        <mu-icon class='icon' :size="14" value="clear" @click="remove(viewData)" />
      </div>
    </div>
    <div class="children" v-show="expaned" v-if="components[viewData.type].slots">
      <div class="slot" v-for="(slotDef, slotName, index) in components[viewData.type].slots" :key="index">
        <div :class="['item', { 'heightlight': slotName === hlslot }]"
          :style="{ 'padding-left':  12 + deeps * 18 + 'px' }"
          @dragover.stop="_onSlotDragover(slotName, $event)"
          @dragleave.stop="hlslot = null"
          @drop.stop="addDropItem(viewData, slotName, null, $event)">
          <span>{{`[${slotDef.title || slotName}]`}}</span>
        </div>
        <div v-if="hasSlotItem(slotName)" class="children">
          <OutlineBoxItem :deeps="deeps + 1" slot="nested" :key="index" v-for="(item, index) in viewData.slots[slotName]" :viewData="item">
          </OutlineBoxItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { namespace } from '../../store/vue-editor'
import { mapGetters, mapState, mapActions } from 'vuex'
import { checkAccepts } from '../../service/catalogs'
import _ from 'lodash'

export default {
  name: 'OutlineBoxItem',
  props: {
    deeps: Number,
    viewData: Object,
    position: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      expaned: true,
      // 高亮插糟名称
      hlslot: ''
    }
  },
  computed: {
    ...mapGetters(namespace, ['components', 'selectedComponent']),
    ...mapState(namespace, ['activeItem', 'hoveringItem', 'selecteds']),
    ...mapState([ 'dragData' ]),
    isActived() {
      return this.viewData === this.activeItem
    },
    isSelected() {
      return this.selecteds.includes(this.viewData)
    },
    ishoverItem() {
      return this.hoveringItem === this.viewData
    },
    title() {
      if (!this.viewData) return ''
      if (this.viewData.title) return this.viewData.title
      const component = this.components[this.viewData.type]
      return component.title || component.name
    },
    expandIcon() {
      return this.expaned ? 'keyboard_arrow_down' : 'keyboard_arrow_right'
    }
  },
  methods: {
    ...mapActions(namespace, [
      'select',
      'deselect',
      'deselectAll',
      'hoverEnter',
      'hoverLeave',
      'add',
      'remove'
    ]),
    handlerItemClick() {
      const item = this.viewData
      if (!this.selecteds.includes(item) && !event.ctrlKey) {
        this.deselectAll()
      }
      if (!event.ctrlKey) {
        this.select(item)
      } else {
        if (this.selecteds.includes(item)) {
          this.deselect(item)
          this.hideFloatBar()
        } else {
          this.select(item)
        }
      }
    },
    component(type) {
      return this.components[type]
    },
    hasSlotItem(slotName) {
      return (
        this.viewData.slots &&
        this.viewData.slots[slotName] &&
        this.viewData.slots[slotName].length > 0
      )
    },
    hasSlotsDef(type) {
      return (
        this.components[type].slots &&
        Object.keys(this.components[type].slots).length > 0
      )
    },
    toggleExpand() {
      this.expaned = !this.expaned
    },
    _onTitleDragover(event) {
      this.expaned = true

      if (!this.viewData.parent) {
        return
      }
      // console.log(this.viewData.parent)
      // console.log(this.viewData.slot)
      // console.log(this.dragData)
      if (
        !this.checkDragData(
          this.viewData.parent,
          this.viewData.slot,
          this.dragData
        )
      ) {
        return
      }

      event.preventDefault()
    },
    checkDragData(container, slot, dragData) {
      return (
        dragData &&
        dragData.type === 'view-data' &&
        checkAccepts(container, slot, dragData.data)
      )
    },
    _onSlotDragover(slot, event) {
      if (this.checkDragData(this.viewData, slot, this.dragData)) {
        this.hlslot = slot
        event.preventDefault()
      }
    },
    // 添加到指定节点
    addDropItem(container, slot, index, event) {
      // 根节点，不予以理会
      if (!container) return
      this.hlslot = null

      const data = this.dragData
      let item = data.data
      if (data.source !== 'inner') {
        item = _.cloneDeep(item)
      }
      this.add({ container, slot, index, item })
    }
  }
}
</script>

<style lang="less" scoped>
.outline-box-item {

  .item {
    padding-right: 13px;
    font-size: 9pt;
    height: 28px;
    line-height: 28px;
    white-space: nowrap; //强制文本在一行内输出
    overflow: hidden; //隐藏溢出部分
    text-overflow: ellipsis; //对溢出部分加上...
    // transition: background-color .2s;
    cursor: pointer;
    .icon {
      vertical-align: middle;
      &:hover {
        color: blueviolet;
      }
    }
    .right {
      float: right;
      height: 28px;
      line-height: 28px;
    }
    &.selected {
      background: rgba(116, 0, 173, 0.15);
      &.actived {
        font-weight: 600;
      }
    }
    &.heightlight {
      background: rgba(116, 0, 173, 0.13);
    }
  }

  .children {

  }

}

.slot {
  .outline-box-item
}
</style>

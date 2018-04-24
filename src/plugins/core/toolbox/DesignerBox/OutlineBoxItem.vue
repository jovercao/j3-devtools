<template>
  <div class="outline-box-item">
    <div
      :style="{ 'padding-left': 6 + deeps * 18 + 'px' }"
      :class="['outline-box-item-head', { 'outline-box-item-selected': isSelected, 'outline-box-item-heightlight': ishoverItem }]"
      draggable="true"
      @dragstart.stop="beginDrag({ source: 'inner', type: 'view-data', data: viewData })"
      @dragend.stop="endDrag(null)"
      @dragover.stop="_onTitleDragover"
      @drop.stop="addDropItem(viewData.parent, viewData.slot, viewData.index, $event)"
      @mouseover.stop="hoverEnter(viewData)"
      @mouseleave.stop="hoverLeave()"
      @click="select(viewData)"
      >

      <mu-icon v-if="hasSlotsDef(viewData.type)"
          class="outline-box-item-icon" :value="expandIcon" @click="toggleExpand" />
      <span>{{title}}</span>
      <div class="right">
        <mu-icon class='outline-box-clear-icon' :size="14" value="clear" @click="remove(viewData)" />
      </div>
    </div>
    <div class="outline-box-item-body" v-show="expaned" v-if="components[viewData.type].slots">
      <div class="outline-box-item" v-for="(slotDef, slotName, index) in components[viewData.type].slots" :key="index">
        <div :class="['outline-box-item-head', { 'outline-box-item-heightlight': slotName === hlslot }]"
          :style="{ 'padding-left':  12 + deeps * 18 + 'px' }"
          @dragover.stop="_onSlotDragover(slotName, $event)"
          @dragleave.stop="hlslot = null"
          @drop.stop="addDropItem(viewData, slotName, null, $event)"
        >
          <span>{{`[${slotDef.title || slotName}]`}}</span>
        </div>
        <div v-if="hasSlotItem(slotName)" class="outline-box-item-body">
          <OutlineBoxItem :deeps="deeps + 1" slot="nested" :key="index" v-for="(item, index) in viewData.slots[slotName]" :viewData="item">
          </OutlineBoxItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { namespace } from '../../store/vue-editor'
import { mapGetters, mapState, mapMutations } from 'vuex'
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
    ...mapState(namespace, ['selected', 'hoverItem']),
    ...mapState([ 'dragData' ]),
    isSelected() {
      return this.viewData === this.selected
    },
    ishoverItem() {
      return this.hoverItem === this.viewData
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
    ...mapMutations(namespace, [
      'select',
      'hoverEnter',
      'hoverLeave',
      'add',
      'remove'
    ]),
    ...mapMutations([
      'beginDrag',
      'endDrag'
    ]),
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

}
.outline-box-item-selected {
  .outline-box-item-heightlight;
  color: rebeccapurple;
}
.outline-box-item-heightlight {
  background-color: #ddd;
}

.outline-box-item-head {
  padding-right: 13px;
  font-size: 9pt;
  height: 28px;
  line-height: 28px;
  white-space: nowrap; //强制文本在一行内输出
  overflow: hidden; //隐藏溢出部分
  text-overflow: ellipsis; //对溢出部分加上...
  cursor: pointer;
  .right {
    float: right;
    height: 28px;
    line-height: 28px;
  }
}
.outline-box-item-icon {
  vertical-align: middle;
}

.outline-box-item-body {

}

.outline-box-item-body {

}

.outline-box-clear-icon {
  vertical-align: middle;
}
.outline-box-clear-icon:hover {
  color: blueviolet;
  background: #aaa;
}
</style>

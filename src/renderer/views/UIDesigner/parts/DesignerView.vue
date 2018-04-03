<template>
  <div class="designer-view">
    <DesignerComponent v-if="viewData" :viewData="viewData" :selected="selectedItem"
      :heightlight="hoverItem" @contextmenu="showFloatBar" 
       @select="_onComponentSelect"
       @mouseleave="_onComponentMouseleave"
       @dragover="_onComponentDragover"
       @dragleave="_onComponentDragleave"
       @mouseover="_onComponentMouseover"
       @dragstart="beginDrag({ type: 'view-data', source: 'inner', data: arguments[0] })"
       @dragend="endDrag()"
       @drop="_onComponentDrop"
       />
    <!-- 快速浮动操作栏 -->
    <mu-popover v-if="selectedItem" :trigger="floatbarTrigger" :open="floatbarOpened" @close="hideFloatBar">
      <div class="designer-quickbar">
        <div class="header">
          {{ propTitle }}
        </div>
        <div class="row" v-for="prop in quickProps" :key="prop">
          <span class="value-label">{{selectedComponent.props[prop].title || prop}}</span>
          <value-editor @change="changeProp({ prop, value: arguments[0] })" 
            :selections="selectedComponent.props[prop].selections"
            class="value-editor"
            :value="selectedItem.props[prop]"
            :data-type="selectedComponent.props[prop].type">
          </value-editor>
        </div>
        <div class="footer" v-show="selectedItem !== viewData">
          <mu-icon-button tooltip="删除" icon="clear" @click="removeItem(selectedItem)"/>
          <mu-icon-button v-show="selectedItem.parent" tooltip="选择父级" icon="developer_board" @click="doSelectParent" />
        </div>
      </div>
    </mu-popover>
    <!-- Slots选择框 -->
    <!-- <div style="background: balck;position: absolute; left:0px; right: 0px; bottom:0px; opacity: .3" v-show="slotChoosebarOpened" @click="hideChoosebar"> -->
    
    <!-- v-show="slotChoosebarOpened"  -->
    <div v-show="dragging && slotChoosebarOpened" ref="choosebar" class="designer-choosebar" 
      :style="{ left: choosebarPos.x + 'px', top: choosebarPos.y + 'px' } ">
      <div class="header">请将组件拖动到以下插糟中</div>
      <div v-if="dropContainer && dropContainer.parent"
        class="item"
        @dragenter.stop="hoverEnter(dropContainer = dropContainer.parent)"
        @dragleave.stop="hoverLeave()"
        >
        <!-- @dragover.stop="parentHeightlight = true" -->
        [父级] - {{ getComponetTitle(dropContainer.parent) }}
      </div>
      <div
        v-for="(slot, name, index) in dropContainerSorts"
        :class="['item', { 'item-hover': catcheSlot === name }]"
        :key="index"
        @dragover.stop="_onChoosebarDragover(name, $event)"
        @dragleave.stop="catcheSlot = ''"
        @drop.stop="addDropItem(dropContainer, name)">
        {{slot.title || name}}
      </div>
    </div>
  </div>
</template>

<script>
import DesignerComponent from './DesignerComponent'
import { mapState, mapMutations, mapGetters } from 'vuex'
import modules from '../../../store/store-modules'
import _ from 'lodash'
import { checkAccepts } from '../../../service/catalogs'
// import './DesignerBox.less'
// import Vue from 'vue'

export default {
  components: {
    DesignerComponent
  },
  data() {
    return {
      floatbarTrigger: null,
      floatbarOpened: false,
      slotChoosebarOpened: false,
      slotContainerTrigger: null,
      dropContainer: null,
      choosebarPos: { x: 600, y: 400 },
      catcheSlot: '',
      parentHeightlight: false
    }
  },
  computed: {
    ...mapState(modules.UiDesigner, [
      'viewData',
      'selectedItem',
      'hoverItem',
      'dragging',
      'dragData'
    ]),
    ...mapGetters(modules.UiDesigner, ['components', 'selectedComponent']),
    dropContainerSorts() {
      if (!this.dropContainer) return null
      return this.components[this.dropContainer.type].slots
    },
    quickProps() {
      return this.selectedComponent.quickProps
    },
    propTitle() {
      return this.selectedItem
        ? this.selectedItem.title ||
            this.selectedComponent.title ||
            this.selectedComponent.name
        : ''
    }
  },
  methods: {
    ...mapMutations(modules.UiDesigner, [
      'hoverEnter',
      'hoverLeave',
      'selectItem',
      'addItem',
      'removeItem',
      'beginDrag',
      'endDrag',
      'changeProp',
      'selectParentItem'
    ]),
    // // 选择插糟
    // async chooseSlot(viewData) {
    //   const cmp = this.components[viewData.type]
    //   if (cmp) {

    //   }

    //   return ''
    // },
    _onComponentMouseover(item) {
      this.hoverEnter(item)
    },
    hasSlotsDef(type) {
      return (
        this.components[type].slots &&
        Object.keys(this.components[type].slots).length > 0
      )
    },
    hasDefaultSlotDef(type) {
      return this.components[type].slots && this.components[type].slots.default
    },
    getComponetTitle(item) {
      return (
        item.title ||
        this.components[item.type].title ||
        this.components[item.type].name
      )
    },
    checkDragData(container, slot, dragData) {
      return (
        dragData &&
        dragData.type === 'view-data' &&
        checkAccepts(container, slot, dragData.data)
      )
    },
    // checkAccepts(container, slot, item) {
    //   // 不可接受类型，拒绝接受
    //   const accepts = this.components[container.type].slots[slot].accepts
    //   // 有设置可接受类型
    //   if (accepts && accepts !== '*') {
    //     if (!accepts.includes(item.type)) {
    //       return false
    //     }
    //   }
    //   return true
    // },
    _onComponentDragover(item, event) {
      this.hoverEnter(item)
      this.catcheSlot = ''
      // if (this.dropContainer === item) {
      //   return
      // }
      const dragData = this.dragData
      if (!dragData || dragData.type !== 'view-data') {
        return
      }
      // 如果是容器则显示插糟及父级选择窗口
      if (this.hasSlotsDef(item.type)) {
        // 显示选择器
        this.showChoosebar(item, event)
        // 检查当前容器兼容性
        if (
          !this.hasDefaultSlotDef(item.type) ||
          !checkAccepts(item, 'default', dragData.data)
        ) {
          return
        }
      } else {
        this.hideChoosebar()
        // 检查上级容器兼容性，以及是否父窗口向子窗口拖动
        if (
          item.parent &&
          !checkAccepts(item.parent, item.slot, dragData.data)
        ) {
          return
        }
      }

      // 允许拖放
      event.preventDefault()
    },
    _onComponentDrop(item) {
      // 如果是不支持子元素的元素,则放入父级
      if (!this.hasSlotsDef(item.type)) {
        this.addDropItem(item.parent, item.slot, item.index)
      } else {
        this.addDropItem(item, 'default')
      }
    },
    _onComponentDragleave() {
      this.hoverLeave()
    },
    _onChoosebarDragover(slotname, event) {
      if (!this.checkDragData(this.dropContainer, slotname, this.dragData)) {
        return
      }
      this.catcheSlot = slotname
      event.preventDefault()
    },
    showChoosebar(item, event) {
      this.dropContainer = item

      // 显示slots选择卡
      // this.choosebarPos = this.$helper.getMousePos(event)
      // DOM 操作尽量封装到API中,如 $helper

      const rect = this.$helper.getOffsetRect(event.currentTarget)
      const size = this.$helper.getClientSize(this.$refs.choosebar)
      this.choosebarPos.x = rect.x + rect.width / 2 - size.width / 2
      this.choosebarPos.y = rect.y + rect.height / 2 - size.height / 2

      this.slotChoosebarOpened = true
    },
    hideChoosebar() {
      this.slotChoosebarOpened = false
      this.dropContainer = null
    },
    addDropItem(container, slotName, index) {
      const dragData = this.dragData

      if (dragData.type !== 'view-data') {
        return
      }
      let item = dragData.data

      // const slot = await this.chooseSlot(container)

      // 外部来源，先进行复制，断开联系
      if (dragData.source !== 'inner') {
        item = _.cloneDeep(item)
        // 非外部来源，检测是否未移动位置
      } else if (
        container === item.parent &&
        slotName === item.slot &&
        item.index === index
      ) {
        return
      }
      this.addItem({ container, item, slot: slotName, index })

      this.hideChoosebar()
    },
    _onComponentMouseleave(item) {
      this.hoverLeave()
    },
    _onComponentSelect(item, event) {
      this.selectItem(item)
      this.showFloatbar(event.currentTarget)
    },
    doSelectParent() {
      this.selectParentItem()
      this.showFloatbar(null)
    },
    showFloatbar(trigger) {
      if (trigger) {
        this.floatbarTrigger = trigger
      }
      this.floatbarOpened = true
    },
    hideFloatBar(e) {
      this.floatbarOpened = false
    },
    showFloatBar(item, event) {
      console.log(event.currentTarget)
      this.floatbarTrigger = event.currentTarget
      this.selectItem(item)
      this.floatbarOpened = true
    }
  }
}
</script>

<style lang="less" scoped>
.designer-view {
  // .designer-component-selected {
  //   background: #ddd;
  // }
}
.designer-quickbar {
  padding: 20px 32px 20px 32px;
  width: 400px;
  .row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 50px;
    line-height: 50px;
    .value-editor {
      flex-grow: 1;
      flex-basis: 0px;
      overflow: hidden;
      vertical-align: middle;
      overflow: hidden;
    }

    .value-label {
      overflow: hidden;
      display: inline-block;
      flex-basis: 120px;
      vertical-align: middle;
    }
  }

  .footer {
    text-align: right;
  }

  .header {
    color: #888;
    height: 28px;
  }
}
.designer-choosebar {
  position: absolute;
  width: 300px;
  background: white;
  border: #555 solid 1px;
  z-index: 2000;
  .header {
    padding: 5px 25px 5px 25px;
    color: #888;
  }

  .item {
    height: 64px;
    border: #888 dashed 1px;
    text-align: center;
    line-height: 64px;
    :hover {
      .item-hover;
    }
  }
  .item-hover {
    background-color: rgb(152, 195, 236);
  }
}
</style>

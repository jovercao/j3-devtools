<template>
  <div class="designer-view" tabindex="0">
    <DesignerComponent v-if="value" :viewData="value" :activeItem="activeItem"
      :selecteds="selecteds"
      :preview="mode === 'preview'"
      :heightlightItme="hoveringItem"
      :outlineItem="dropContainer"
      @contextmenu="showFloatBar"
      @select="_onComponentSelect"
      @dragenter="_onComponentDragenter"
      @dragover="_onComponentDragover"
      @mouseover="hoverEnter"
      @mouseout="hoverLeave"
      @dragstart="dragstart()"
      @dragend="dragend()"
      @drop="_onComponentDrop"
      @valuechange="_onValueChange" />
      <!--      @dragleave="dragleave" -->
    <!-- 快速浮动操作栏 -->
    <mu-popover v-if="activeItem" :trigger="floatbarTrigger" :open="floatbarOpened" @close="hideFloatBar">
      <div class="designer-quickbar">
        <div class="header">
          {{ propTitle }}
        </div>
        <div class="row" v-for="prop in quickProps" :key="prop">
          <span class="value-label">{{selectedComponent.props[prop].title || prop}}</span>
          <value-editor @change="changeProp({ prop, value: arguments[0] })"
            :selections="selectedComponent.props[prop].selections"
            class="value-editor"
            :value="activeItem.props[prop]"
            :data-type="selectedComponent.props[prop].type">
          </value-editor>
        </div>
        <div class="footer" v-show="activeItem !== value">
          <mu-icon-button tooltip="删除" icon="clear" @click="_onRemoveClick" />
          <mu-icon-button
            v-show="activeItem.parent"
            tooltip="选择父级"
            icon="developer_board"
            @click="selectParent" />
        </div>
      </div>
    </mu-popover>
    <!-- Slots选择框 -->
    <!-- <div style="background: balck;position: absolute; left:0px; right: 0px; bottom:0px; opacity: .3" v-show="slotChoosebarOpened" @click="hideChoosebar"> -->

    <!-- v-show="slotChoosebarOpened"  -->
    <div v-show="dropContainer"
      ref="choosebar"
      class="designer-choosebar"
      :style="{ left: choosebarPos.x + 'px', top: choosebarPos.y + 'px' } ">
      <div class="header">请将组件拖动到以下插糟中</div>
      <div v-if="dropContainer && dropContainer.parent"
        class="item"
        @dragenter.stop="dragenter({ container: dropContainer.parent })">
         <!-- dragover({ container: dropContainer.parent }) -->
        [父级] - {{ getComponetTitle(dropContainer.parent) }}
      </div>
      <div v-for="(slot, name) in dropContainerSlots"
        :key="name"
        :class="['item', { 'item-hover': catcheSlot === name }]"
        @dragover.stop="_onChoosebarDragover(name, $event)"
        @dragenter.stop="dragenter({ container: dropContainer, slot: name })"
        @drop.stop="_onComponentDrop(activeItem, $event)">
        {{slot.title || name}}
      </div>
    </div>
  </div>
</template>

<script>
import DesignerComponent from './DesignerComponent'
import { mapState, mapActions, mapGetters } from 'vuex'
import { namespace } from '../../../store/vue-editor'
// import './DesignerBox.less'
// import Vue from 'vue'

export default {
  components: {
    DesignerComponent
  },
  props: {
    value: Object,
    visible: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: 'design'
    }
  },
  created() {
    this.$subscribe({
      cut: () => {
        if (this.editable && this.activeItem) {
          this.cut()
          return false
        }
      },
      copy: () => {
        if (this.editable && this.activeItem) {
          this.copy()
          return false
        }
      },
      parse: () => {
        if (this.editable && this.activeItem) {
          this.parse()
          return false
        }
      },
      delete: () => {
        if (this.editable) {
          // 首次删除当前选定
          if (this.activeItem) {
            this.removeSelecteds()
          }
          this.hideFloatBar()
          return false
        }
      },
      cancel: () => {
        if (this.isFocused()) {
          if (this.activeItem) {
            this.deselect(this.activeItem)
          } else if (this.selecteds.length > 0) {
            this.deselectAll()
          }
          return false
        }
      }
    })
  },
  data() {
    return {
      floatbarTrigger: null,
      floatbarOpened: false,
      slotContainerTrigger: null,
      choosebarPos: { x: 600, y: 400 },
      catcheSlot: '',
      parentHeightlight: false
    }
  },
  computed: {
    ...mapState(namespace, [ 'activeItem', 'selecteds', 'hoveringItem', 'dropTarget' ]),
    ...mapGetters(namespace, [ 'selectedComponent', 'components', 'dropContainer', 'dropContainerSlots', 'dropSlots', 'dropable' ]),
    quickProps() {
      return this.selectedComponent.quickProps
    },
    propTitle() {
      return this.activeItem
        ? this.activeItem.title ||
            this.selectedComponent.title ||
            this.selectedComponent.name
        : ''
    },
    editable() {
      return this.visible && this.mode === 'design'
    }
  },
  methods: {
    ...mapActions(namespace, [
      'hoverEnter',
      'hoverLeave',
      'select',
      'deselect',
      'deselectAll',
      'add',
      'remove',
      'removeSelecteds',
      'changeProp',
      'selectParent',
      'copy',
      'parse',
      'cut',
      'delete',
      'dragstart',
      'dragend',
      'drop',
      'dragenter',
      'dragleave'
    ]),
    // // 选择插糟
    // async chooseSlot(value) {
    //   const cmp = this.components[value.type]
    //   if (cmp) {

    //   }

    //   return ''
    // },
    _onRemoveClick() {
      this.remove(this.activeItem)
      this.hideFloatBar()
    },
    _onComponentMouseover(item) {
      this.hoverEnter(item)
    },
    _onValueChange(item, value) {
      this.changeProp({ item, prop: 'value', value })
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
    _onComponentDragenter(item, event) {

      this.dragenter({ container: item })
      // 显示选择器
      this.moveChoosebar(event.currentTarget)
    },
    _onComponentDragover(item, event) {
      console.log('over')
      if (this.dropable) event.preventDefault()
    },
    _onComponentDrop(item, event) {
      const isCopy = event.ctrlKey
      this.drop(isCopy)
    },
    _onChoosebarDragover() {
      if (this.dropable) event.preventDefault()
    },
    moveChoosebar(target) {

      const rect = this.$helper.getOffsetRect(target)
      const size = this.$helper.getClientSize(this.$refs.choosebar)
      const designerRect = this.$helper.getOffsetRect(this.$el)

      this.choosebarPos.y = rect.y + rect.height / 2 - size.height / 2
      if (rect.width > size.width) {
        this.choosebarPos.x = rect.x + rect.width / 2 - size.width / 2
      } else {
        this.choosebarPos.x = rect.x + rect.width - 5
        // 如果超出界限了
        if (this.choosebarPos.x + size.width > designerRect.x + designerRect.width) {
          this.choosebarPos.x = rect.x - size.width + 5
        }
      }
    },
    isFocused() {
      return (
        this.$el &&
        document.activeElement &&
        this.$el === document.activeElement
      )
    },
    _onComponentSelect(item, event) {
      if (!this.selecteds.includes(item) && !event.ctrlKey) {
        this.deselectAll()
        this.hideFloatBar()
      }
      if (!event.ctrlKey) {
        this.select(item)
      } else {
        if (this.selecteds.includes(item)) {
          this.deselect(item)
        } else {
          this.select(item)
        }
      }
      // this.showFloatbar(event.currentTarget)
    },
    // showFloatbar(trigger) {
    //   if (trigger) {
    //     this.floatbarTrigger = trigger
    //   }
    //   this.floatbarOpened = true
    // },
    hideFloatBar(e) {
      this.floatbarOpened = false
    },
    showFloatBar(item, event) {
      this.deselectAll()
      this.select(item)
      this.floatbarTrigger = event.currentTarget
      this.floatbarOpened = true
    }
  },
  watch: {
    mode(value) {
      if (value === 'preview') {
        this.deselectAll()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.designer-view {
  width: 100%;
  &:focus {
    outline: none;
  }
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
  transition: left, top .2s;
  .header {
    padding: 5px 25px 5px 25px;
    color: #888;
  }

  .item {
    height: 38px;
    border: #888 dashed 1px;
    text-align: center;
    line-height: 38px;
    :hover {
      .item-hover;
    }
  }
  .item-hover {
    background-color: rgb(152, 195, 236);
  }
}
</style>

<template>
  <div class="outline-box-item">
    <div @mouseover.stop="changeHlItem(viewData)" @mouseleave.stop="changeHlItem(null)" @click="handlerClick(viewData)" :class="['outline-box-item-title', { 'outline-box-item-selected': isSelected, 'outline-box-item-heightlight': isHlItem }]">
      <mu-icon class="outline-box-item-icon" :value="expaned ? 'keyboard_arrow_down' : 'keyboard_arrow_right'" @click="toggleExpand" />
      <span>{{title}}</span>
    </div>
    <div class="outline-box-item-slot" v-if="expaned && viewData.slots">
      <div class="outline-box-item" v-for="(items, name, index) in viewData.slots" :key="index">
        <div class="outline-box-item-title" >
          <span>{{`[${components[viewData.type].slots[name].title}]`}}</span>
        </div>
        <div class="outline-box-item-list" v-if="items && items.length > 0">
          <OutlineBoxItem @select="handlerClick" slot="nested" :key="index" v-for="(item, index) in items" :viewData="item">
          </OutlineBoxItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import modules from '../../../store/store-modules'

export default {
  name: 'OutlineBoxItem',
  computed: {
    ...mapGetters(modules.UiDesigner, ['components']),
    ...mapState(modules.UiDesigner, ['selectedItem', 'hlItem']),
    isSelected() {
      return this.viewData === this.selectedItem
    },
    isHlItem() {
      return this.hlItem === this.viewData
    },
    title() {
      if (!this.viewData) return ''
      if (this.viewData.title) return this.viewData.title
      const component = this.components[this.viewData.type]
      return component.title || component.name
    }
  },
  data() {
    return {
      expaned: false
    }
  },
  props: {
    viewData: Object,
    position: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    ...mapMutations(modules.UiDesigner, [ 'changeHlItem' ]),
    handlerClick(viewData) {
      this.$emit('select', viewData)
    },
    toggleExpand() {
      this.expaned = !this.expaned
    }
  }
}
</script>

<style lang="less" scoped>
.outline-box-item {
}
.outline-box-item-selected {
  .outline-box-item-heightlight;
  color:rebeccapurple;
}
.outline-box-item-heightlight {
  background-color: #ddd;
}

.outline-box-item-title {
  font-size: 9pt;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
}
.outline-box-item-icon {
  vertical-align: middle;
}

.outline-box-item-list {
  margin-left: 12px;
}

.outline-box-item-slot {
  margin-left: 5px;
}
</style>

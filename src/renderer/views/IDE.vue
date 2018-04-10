<template>
  <flex-panel class="container"
      @mouseup.native="endResize"
      @mousemove.native="resizeSidebar">
    <!-- @mouseup.native="endResize" @mousemove.native="resizeSidebar" -->
    
    <flex-panel-item :thickness="48" class="activitybar">
      <flex-panel class="dock" direction="vertical">
        <flex-panel-item class="body" :grow="1">
          <mu-icon-button :class="{ active: activeSidebar === 'ComponentsSidebar' }" icon="view_module" @click="selectSidebar('ComponentsSidebar')" /> <br>
          <mu-icon-button @dragover.native="handlerDrogover('DesignerSidebar', $event)" icon="view_headline" :class="{ active: activeSidebar === 'DesignerSidebar' }" @click="selectSidebar('DesignerSidebar')"/> <br>
          <!-- <mu-icon-button :class="{ active: activeSidebar === 'property' }" icon="build" @click="selectSidebar('property')" /> <br> -->
          <mu-icon-button icon="mouse" /> <br>
          <mu-icon-button icon="flash_on" /> <br>
          <mu-icon-button icon="data_usage" /> <br>
        </flex-panel-item>
        <flex-panel-item :thickness="64">
          <mu-icon-button icon="settings" @click="loadData"/> <br>
        </flex-panel-item>
      </flex-panel>
    </flex-panel-item>
    <flex-panel-item class="sidebar" :thickness="sidebarWidth">
      <keep-alive>  
        <component :is="activeSidebar"></component>
      </keep-alive>
    </flex-panel-item>
    <flex-panel-item class="sidebar-resizer"
      :thickness="2"
      @mousedown.native.stop.prevent="beginResize"
    />
    <flex-panel-item :grow="1" class="content">
      <flex-panel class="dock" direction="vertical">
        <flex-panel-item class="header" :thicknes="36">
          <mu-flat-button
            v-for="(item, index) in openeds" :key="index"
            @click="setActive(item)"
            :class="{ active: actived === item }"
            :icon="item.icon" :label="item.title"/>
        </flex-panel-item>
        <flex-panel-item class="body" :grow="1">
          <component
            v-show="actived === item" v-for="(item, index) in openeds"
            :key="index"
            :is="getEditor(item)"
            class="dock"/>
        </flex-panel-item>
      </flex-panel>
    </flex-panel-item>
  </flex-panel>
</template>

<script>
import DesignerSidebar from './parts/DesignerSidebar'
import ComponentsSidebar from './parts/ComponentsSidebar'
import DesignerView from './parts/DesignerView'
import CodeView from './parts/CodeView'
import { mapState, mapActions, mapMutations } from 'vuex'
import modules from '../../store/store-modules'

export default {
  data() {
    return {
      sidebarWidth: 250,
      sidebarVisible: true,
      activeSidebar: null,
      resizing: false,
      resizeStartPos: null,
      resizeStartSidebarWidth: 0
    }
  },
  components: {
    DesignerSidebar,
    DesignerView,
    ComponentsSidebar,
    CodeView
    // FlexContainer,
    // FlexContainerItem,
    // OutlineBox,
    // PropertyBox
  },
  computed: {
    ...mapState(['actived']),
    activeTab() {
      return this.actived
    }
  },
  methods: {
    ...mapActions(modules.UiDesigner, [
      'loadCatalogs',
      'openView'
    ]),
    ...mapMutations(modules.UiDesigner, [
      'setActive'
    ]),
    getEditor(item) {
      // item.content.contentType
      return 'view-editor'
    },
    selectSidebar(name) {
      this.activeSidebar = name
    },
    /**
     * 切换侧边栏是否可见
     */
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    resizeSidebar(event) {
      if (!this.resizing) return
      const p = this.$helper.getMousePos(event)
      let move = p.x - this.resizeStartPos.x
      this.sidebarWidth = this.resizeStartSidebarWidth + move
      // event.currentTarget.previousSibling.style.flexBasis = this.sidebarWidth + 'px'
    },
    beginResize(event) {
      this.resizing = true
      this.resizeStartPos = this.$helper.getMousePos(event)
      this.resizeStartSidebarWidth = this.sidebarWidth
    },
    endResize(event) {
      if (this.resizing) {
        this.resizeSidebar(event)
        this.resizeStartPos = null
        this.resizeStartSidebarWidth = 0
        this.resizing = false
      }
    },
    async loadData() {
      await this.loadCatalogs('http://simple.com/catalogs')
      await this.openView('http://simple.com/views/simple.view')
    },
    handlerDrogover(viewName, event) {
      event.stopPropagation()
      event.preventDefault()
      this.selectSidebar(viewName)
    }
  }
}
</script>


<style lang="less" scoped>
@import url('../../assets/define.less');

.dock {
  width: 100%;
  height: 100%;
}

.container {
  .dock;
  // .flex-v;
  .sidebar {
    background: @bg1;
    overflow: auto;
  }

  .sidebar-resizer {
    // flex-basis: 3px;
    cursor: e-resize;
    background: @bg2;
  }

  .activitybar {
    // .fixed50;
    // .flex-h;
    background: @bg2;
    padding: 3px;
    .active {
      color: @active;
    }
    // .body {
    //   // .scale1;
    // }

    // .footer {
    //   // .fixed50;
    // }
  }

  .content {
    // .scale1;
    // .flex-h;
    .header {
      // flex-basis: 32px;
      background: @bg2;
      .active {
        color: @active;
        background: @bg1;
      }
    }
    // .body {
    //   // .scale1;
    //   // .flex;
    //   // .component {
    //   //   .dock;
    //   //   // .scale1;
    //   //   overflow: auto;
    //   // }
    // }
  }
}
</style>

<template>
  <flex-panel class="container" @mouseup.native="endResize" @mousemove.native="resizeSidebar">
    <flex-panel-item :thickness="48" class="activitybar">
      <flex-panel class="dock" direction="vertical">
        <flex-panel-item class="body" :grow="1">
          <mu-icon-button :class="{ active: activeSidebar === 'ComponentsSidebar' }" icon="view_headline" @click="selectSidebar('ComponentsSidebar')" /> <br>
          <mu-icon-button @dragover.native="handlerDrogover('DesignerSidebar', $event)" icon="view_module" :class="{ active: activeSidebar === 'DesignerSidebar' }" @click="selectSidebar('DesignerSidebar')"/> <br>
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
      :thickness="3"
      @mousedown.native="beginResize"
      @mouseup.native="endResize"
    />
    <flex-panel-item :grow="1" class="content">
      <flex-panel class="dock" direction="vertical">
        <flex-panel-item class="header" :thicknes="36">
          <mu-flat-button @click="changeActiveView('DesignerView')" :class="{ active: activeView === 'DesignerView' }" icon="computer" label="设计视图"></mu-flat-button>
          <mu-flat-button @click="changeActiveView('CodeView')" :class="{ active: activeView === 'CodeView' }" icon="code" label="查看代码"></mu-flat-button>
        </flex-panel-item>
        <flex-panel-item class="body" :grow="1">
          <keep-alive>
            <component :is="activeView" class="dock"/>
          </keep-alive>
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
    ...mapState('ui-designer/', ['activeSidebar', 'activeView'])
  },
  methods: {
    ...mapActions(modules.UiDesigner, [
      'loadCatalogs',
      'openView'
    ]),
    ...mapMutations(modules.UiDesigner, [
      'changeActiveView',
      'selectSidebar',
      'selectTab'
    ]),
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

<<<<<<< HEAD
  .activitybar {
    background: @grey200;
    padding: 3px;
    // width: 64px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
=======
  .sidebar-resizer {
    // flex-basis: 3px;
    cursor: e-resize;
    background: @bg1;
  }
>>>>>>> issue-01

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

<template>
<<<<<<< HEAD
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
=======
  <div class="viewport">
    <menubar class="menubar" />
    <div class="container"
        @mouseup="endResize"
        @mousemove="resize">
      <!-- @mouseup.native="endResize" @mousemove.native="resizeSidebar" -->
      <div class="activitybar">
        <div class="body" :grow="1">
          <div :key="index" v-for="(item, index) in visibleSidebars">
            <mu-icon-button
              :class="{ active: activeSidebar === item }"
              :icon="item.icon | muIcon"
              @click="handlerSidebar(item)"
              @dragover.native.stop.prevent="handlerSidebar(item)"
              />
          </div>
        </div>
        <div class="footer">
          <mu-icon-button icon="settings"/> <br>
        </div>
      </div>
      <sidebar class="sidebar" v-show="sidebarVisible"
        :style="{ 'flex-basis': sidebarWidth + 'px', cursor: sidebarCursor }"
        @mousemove.native="handlerSidebarMousemove"
        @mousedown.native.stop.prevent="beginResize($event, 'sidebar')">
      </sidebar>
      <!-- <div class="sidebar-resizer"
        @mousedown.stop.prevent="beginResize($event, 'sidebar')"
      >
        <div class="header"></div>
        <div class="body"></div>
      </div>
      -->
      <div class="content">
        <div class="header">
>>>>>>> ide
          <mu-flat-button
            v-for="(tab, index) in openedTabs" :key="index"
            @click="setActiveTab(tab)"
            @dragover.native.stop.prevent="setActiveTab(tab)"
            :class="{ active: actived === tab }"
            :icon="tab.icon" :label="tab.title"
            />
        </div>
        <div class="body">
          <component
            v-show="actived === item" v-for="(tab, index) in openedTabs"
            :key="index"
            :is="tab.editor"
            v-model="tab.content.data"
            />
        </div>
        <!-- <div class="bottombar-resizer" ></div> -->
        <bottombar v-if="bottombarVisible"
          class="footer"
          :style="{ 'flex-basis': bottombarHeight + 'px', cursor: bottombarCursor }"
          @mousemove.native="handlerBottombarMousemove"
          @mousedown.native.stop.prevent="beginResize($event, 'bottombar')"
          />
      </div>
    </div>
  </div>  
</template>

<script>
import Menubar from './parts/Menubar'
import Bottombar from './parts/Bottombar'
import ideApi from '../mixin/ide'
import Sidebar from './parts/Sidebar'

export default {
  components: {
    Menubar,
    Bottombar,
    Sidebar
  },
  filters: {
    muIcon(value) {
      return value ? value.replace(/-/g, '_') : ''
    }
  },
  mixins: [
    ideApi
  ],
  created() {
    this.activeDefaultSidebar()
    this.activeDefaultBottombar()
  },
  data() {
    return {
      sidebarWidth: 250,
      bottombarHeight: 200,
      sidebarResizing: false,
      bottombarResizing: false,
      resizeStartPos: null,
      resizeStartThickness: 0,
      sidebarCursor: 'auto',
      bottombarCursor: 'auto'
    }
  },
  methods: {
    handlerSidebarMousemove(event) {
      if (event.offsetX >= this.sidebarWidth - 3) {
        this.sidebarCursor = 'e-resize'
      } else {
        this.sidebarCursor = 'auto'
      }
    },
    handlerBottombarMousemove(event) {
      if (event.offsetY <= 3) {
        this.bottombarCursor = 'n-resize'
      } else {
        this.bottombarCursor = 'auto'
      }
    },
    handlerBottombar(item) {
      if (!this.bottombarVisible) {
        this.showBottombar(item)
        // 如果已经是相同的bottombar，则隐藏
      } else if (this.activeBottombar === item) {
        this.toggleBottombar()
      }
      this.setActiveBottombar(item)
    },
    handlerSidebar(item) {
      if (!this.sidebarVisible) {
        this.showSidebar(item)
        // 如果已经是相同的sidebar，则隐藏
      } else if (this.activeSidebar === item) {
        this.toggleSidebar()
      }
      this.setActiveSidebar(item)
    },
    resize(event) {
      if (this.sidebarResizing) {
        const p = this.$helper.getMousePos(event)
        const offsetX = p.x - this.resizeStartPos.x
        this.sidebarWidth = this.resizeStartThickness + offsetX
      }
      if (this.bottombarResizing) {
        const p = this.$helper.getMousePos(event)
        const offsetY = this.resizeStartPos.y - p.y
        this.bottombarHeight = this.resizeStartThickness + offsetY
      }
      if (event.buttons !== 1) {
        this.endResize()
      }
    },
    beginResize(event, bar) {
      if (bar === 'sidebar' && this.sidebarCursor === 'e-resize') {
        this.sidebarResizing = true
        this.resizeStartThickness = this.sidebarWidth
      }
      if (bar === 'bottombar' && this.bottombarCursor === 'n-resize') {
        this.resizeStartThickness = this.bottombarHeight
        this.bottombarResizing = true
      }
      this.resizeStartPos = this.$helper.getMousePos(event)
    },
    endResize() {
      this.resizeStartPos = null
      this.resizeStartThickness = 0
      if (this.sidebarResizing) this.sidebarResizing = false
      if (this.bottombarResizing) this.bottombarResizing = false
    }
  }
}
</script>


<style lang="less" scoped>
@import url('../assets/define.less');

.dock {
  width: 100%;
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .dock;

  .menubar {
    flex: 0 0 35px;
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex: 1 1 0px;


    // .sidebar-resizer {
    //   flex: 0 0 2px;
    //   cursor: e-resize;
    //   display: flex;
    //   flex-direction: column;
    //   align-items: stretch;
    //   .header {
    //     flex: 0 0 32px;
    //     background: @bg2;
    //   }
    //   .body {
    //     flex: 1 1 0px;
    //     background: @bg1;
    //   }
    // }

    .activitybar {
      flex-basis: 48px;
      flex-grow: 0;
      background: @bg2;
      padding: 3px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      .body {
        flex: 1 1 0px;
        .active {
          color: @active;
        }
      }

      .footer {
        flex: 0 0 48px;
      }
    }

    .sidebar {
      transform: display 1s;
      min-width: 150px;
      max-width: 80%;
      flex: 0 0 auto;
    }

    .content {
      flex: 1 1 0px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      .header {
        flex: 0 0 32px;
        background: #f8f8f8;
        .active {
          color: @active;
          background: @bg1;
        }
      }
      .body {
        flex: 1 1 0px;
        .dock;
      }
      .bottombar-resizer {
        flex: 0 0 2px;
        cursor: n-resize;
        background: @bg2;
      }
      .footer {
        flex: 0 0 180px;
        min-height: 100px;
        max-height: 80%;
        border-top: @bg2 solid 1px;
      }
    }
  }
}
</style>

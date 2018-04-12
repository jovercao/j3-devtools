<template>
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
              :icon="item.icon"
              @click="handlerSidebar(item)"
              @dragover.native.stop.prevent="handlerSidebar(item)"
              />
          </div>
        </div>
        <div class="footer">
          <mu-icon-button icon="settings"/> <br>
        </div>
      </div>
      <div class="sidebar" v-show="sidebarVisible" :style="{ 'flex-basis': sidebarWidth + 'px' }">
        <keep-alive>  
          <component :is="activeSidebar.component" />
        </keep-alive>
      </div>
      <div class="sidebar-resizer"
        @mousedown.stop.prevent="beginResize($event, 'sidebar')"
      />
      <div class="content">
        <div class="header">
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
        <div class="bottombar-resizer" @mousedown.stop.prevent="beginResize($event, 'bottombar')"></div>
        <bottombar v-if="bottombarVisible" class="footer" :style="{ 'flex-basis': bottombarHeight + 'px' }"/>
      </div>
    </div>
  </div>  
</template>

<script>
import Menubar from './parts/Menubar'
import Bottombar from './parts/Bottombar'
import ideApi from '../mixin/ide'

export default {
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
      resizeStartThickness: 0
    }
  },
  components: {
    Menubar,
    Bottombar
  },
  methods: {
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
      if (bar === 'sidebar') {
        this.sidebarResizing = true
        this.resizeStartThickness = this.sidebarWidth
      }
      if (bar === 'bottombar') {
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

    .sidebar {
      background: @bg1;
      overflow: auto;
      flex: 0 0 auto;
    }

    .sidebar-resizer {
      flex: 0 0 2px;
      cursor: e-resize;
      background: @bg2;
    }

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
        flex: 0 0 64px;
      }
    }

    .content {
      flex: 1 1 0px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      .header {
        flex: 0 0 32px;
        background: @bg2;
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
      }
    }
  }
}
</style>

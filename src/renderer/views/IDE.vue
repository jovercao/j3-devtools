<template>
  <div class="viewport">
    <menubar class="menubar" />
    <div class="container"
        @mouseup="endResize"
        @mousemove="resizeSidebar">
      <!-- @mouseup.native="endResize" @mousemove.native="resizeSidebar" -->
      <div class="activitybar">
        <div class="body" :grow="1">
          <div :key="index" v-for="(item, index) in sidebars">
            <mu-icon-button
              :class="{ active: activeSidebar === item }"
              :icon="item.icon"
              @click="handlerSidebar(item)"
              @dragover.native.stop.prevent="handlerDrogonSidebar(item)"
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
        @mousedown.stop.prevent="beginResize"
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
        <div class="bottombar" v-if="bottombarVisible">
          <div class="header">
            <mu-flat-button v-for="(bar, index) in bottombars" :key="index"
              :class="{ actived: activeBottombar === bar }"
              :label="bar.title"
              @click="setActiveBottombar(bar)" />
          </div>
          <keep-alive>
            <component :is="activeBottombar.component"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import Menubar from './parts/Menubar'
import ideApi from '../mixins/ide'

export default {
  mixins: [
    ideApi
  ],
  data() {
    return {
      sidebarWidth: 250,
      resizing: false,
      resizeStartPos: null,
      resizeStartSidebarWidth: 0
    }
  },
  components: {
    Menubar
  },
  computed: {
    ...mapGetters(['sidebars', 'bottombars'])
  },
  methods: {
    handlerBottombar(item) {
      if (this.activeBottombar === item) {
        this.toggleBottombar()
        return
      }
      this.setActiveBottombar(item)
    },
    handlerSidebar(item) {
      // 如果已经是相同的sidebar，则隐藏
      if (this.activeSidebar === item) {
        this.toggleSidebar()
        return
      }
      this.setActiveSidebar(item)
    },
    handlerDrogonSidebar(item) {
      if (!this.sidebarVisible) {
        this.showSidebar(item)
      }
      this.setActiveSidebar(item)
    },
    resizeSidebar(event) {
      if (!this.resizing) return
      if (event.buttons !== 1) {
        this.endResize()
        return
      }
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
    endResize() {
      if (this.resizing) {
        this.resizeStartPos = null
        this.resizeStartSidebarWidth = 0
        this.resizing = false
      }
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
      flex: 0 0 3px;
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
      .bottombar {
        flex: 0 0 180px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        .header {
          flex: 0 0 35px;
        }
        .body {
          flex: 1 1 0px;
        }
      }
    }
  }
}
</style>

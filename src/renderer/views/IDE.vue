<template>
  <div class="viewport">
    <menubar class="menubar" />
    <div class="container"
        @mouseup="endResize"
        @mousemove="resize">
      <div class="activitybar">
        <div class="body" :grow="1">
          <div :key="index" v-for="(item, index) in visibleSidebars">
            <mu-icon-button
              :class="{ active: activeSidebar === item }"
              :icon="item.icon | muIcon"
              @click="handlerSidebar(item)"
              @dragover.native.stop.prevent="showSidebar(item)"
              />
          </div>
        </div>
        <div class="footer">
          <mu-icon-button icon="settings"/> <br>
        </div>
      </div>
      <sidebar class="sidebar" v-show="sidebarVisible"
        :style="{ 'width': sidebarWidth + 'px', cursor: sidebarResizeable ? 'e-resize' : 'auto' }"
        :scrollable="!sidebarResizeable"
        @mousemove.native="handlerSidebarMousemove"
        @mousedown.native.stop="handlerBeginResize($event, 'sidebar')">
      </sidebar>
      <div class="content">
        <div class="header">
          <mu-popover 
            :trigger="trigger"
            :open="tabMenuVisibe"
            @close="tabMenuVisibe = false"
            >
            <mu-menu>
              <mu-menu-item title="关闭当前" />
              <mu-menu-item title="关闭其他" />
              <mu-menu-item title="关闭右侧" />
              <mu-divider />
              <mu-menu-item title="关闭所有" />
            </mu-menu>
          </mu-popover>
          <div class="tab-sheets"
            @contextmenu.stop="showTabMenu"
            @mousewheel="$helper.scroll($event.currentTarget, - $event.wheelDelta)">
            <mu-flat-button
              v-for="(tab, index) in openedTabs" :key="index"
              @click="setActiveTab(tab)"
              @mousedown.native="handlerTabMouseDown(tab, $event)"
              @dragover.native.stop.prevent="setActiveTab(tab)"
              @mouseenter.native="hoverTab = tab"
              @mouseleave.native="hoverTab = null"
              :class="['tab-sheet', { active: activeTab === tab }]"
              :icon="tab.icon | muIcon"
              :label="tab.title"
            >
              <i @click.stop="close(tab)" class="el-icon-close close-btn"/>
            </mu-flat-button>
          </div>
          <div class="tools">
            <template v-if="activeTab">
              <ide-icon-button v-for="(tool, index) in activeTab.editor.tools"
                :key="index"
                :icon="tool.icon"
                :command="tool.command" />
            </template>
            <ide-icon-button icon="more_vert" @click.stop="showTabMenu">
            </ide-icon-button>
          </div>
        </div>
        <div class="body">
          <keep-alive
            v-for="(tab, index) in openedTabs"
            :key="index">
            <component
              class="dock"
              v-if="activeTab === tab"
              :uri="tab.uri"
              :context="tab.context"
              :contentType="tab.contentType"
              :resourceType="tab.resourceType"
              :is="tab.editor.component"
            />
          </keep-alive>
        </div>
        <!-- <div class="bottombar-resizer" ></div> -->
        <bottombar v-show="bottombarVisible" v-if="activeBottombar !== null"
          class="footer"
          :style="{ 'flex-basis': bottombarHeight + 'px', cursor: bottombarCursor }"
          @mousemove.native="handlerBottombarMousemove"
          @mousedown.native.stop.prevent="handlerBeginResize($event, 'bottombar')"
          />
      </div>
      <!-- <dialogs/> -->
    </div>
  </div>  
</template>

<script>
import Menubar from './parts/Menubar'
import Bottombar from './parts/Bottombar'
import Sidebar from './parts/Sidebar'
import { mapState, mapGetters, mapActions } from 'vuex'
// import Dialogs from './parts/Dialogs'

export default {

  components: {
    Menubar,
    Bottombar,
    Sidebar
    // Dialogs
  },
  filters: {
    muIcon(value) {
      if (value) {
        if (value.indexOf('-') >= 0) {
          return ':' + value
        }
        return value
      }
      return ''
    }
  },
  created() {
    this.activeDefaultSidebar()
    this.activeDefaultBottombar()
  },
  data() {
    return {
      tabMenuVisibe: false,
      trigger: null,
      hoverTab: null,
      sidebarWidth: 280,
      bottombarHeight: 200,
      sidebarResizing: false,
      bottombarResizing: false,
      resizeStartPos: null,
      resizeStartThickness: 0,
      sidebarResizeable: true,
      bottombarCursor: 'auto'
    }
  },
  computed: {
    ...mapState([
      'activeTab',
      'openedTabs',
      'activeSidebar',
      'activeBottombar',
      'bottombarVisible',
      'hidedToolboxes',
      'sidebarVisible'
    ]),
    ...mapGetters([
      'openedItems',
      'activeItem',
      'sidebars',
      'bottombars',
      'visibleSidebars',
      'visibleBottombars'
    ])
  },
  methods: {
    ...mapActions([
      'open',
      'close',
      'openFromUri',
      'activeDefaultBottombar',
      'activeDefaultSidebar',
      // openeds
      'setActiveTab',
      'setActiveItem',
      'closeActiveTab',
      'openItem',
      'openTab',
      'closeTab',
      'closeItem',
      // sidebar
      'setActiveSidebar',
      'showSidebar',
      'hideSidebar',
      'toggleSidebar',

      // bottombar
      'setActiveBottombar',
      'showBottombar',
      'hideBottombar',
      'toggleBottombar'
    ]),
    handlerTabMouseDown(tab, event) {
      if (event.button === 1) {
        this.close(tab)
      }
    },
    showTabMenu(event) {
      this.trigger = event.target
      this.tabMenuVisibe = true
    },
    handlerSidebarMousemove(event) {
      this.sidebarResizeable = (event.offsetX >= this.sidebarWidth - 3)
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
        item = null
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
    handlerBeginResize(event, bar) {
      if (bar === 'sidebar' && this.sidebarResizeable) {
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


<style lang="less">
@import url('../assets/define.less');

.dock {
  width: 100%;
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  .dock;

  .menubar {
    flex: 0 0 28px;
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    overflow: hidden;
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
      color: #666;
      .body {
        flex: 1 1 0px;
        .active {
          color: @active !important;
        }
      }

      .footer {
        flex: 0 0 48px;
      }
    }

    .sidebar {
      transform: display 1s;
      min-width: 180px;
      max-width: 80%;
      flex: 0 0 auto;
    }

    .content {
      flex: 1 1 0px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      overflow: hidden;
      .header {
        flex: 0 0 32px;
        background: #f8f8f8;
        display: flex;
        align-items: stretch;
        flex-wrap: nowrap;
        flex-direction: row;
        .tools {
          flex: 0 1 0px;
          padding-right: 5px;
          max-width: 180px;
          align-content: space-between;
          flex-direction: row;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .tab-sheets {
          flex: 1 1 0px;
          min-width: 0px;
          overflow: hidden;
          white-space:nowrap;
          &:hover {
            overflow-x: auto;
          }
          .tab-sheet {
            display: inline-block;
            // width: 150px;
            height: 32px;
            max-width: 150px;
            div.mu-flat-button-wrapper {
              justify-content: flex-start !important;
              padding-right: 20px;
            }
            .mu-flat-button-label {
              text-transform: none !important;
              white-space: nowrap; //强制文本在一行内输出
              overflow: hidden; //隐藏溢出部分
              text-overflow: ellipsis; //对溢出部分加上...
            }
            &.active {
              color: @active;
              background: @bg1;
              .close-btn {
                visibility: visible;
              }
            }
            &:hover {
              .close-btn {
                visibility: visible;
              }
            }
            .close-btn {
              visibility: hidden;
              position: absolute;
              right: 6%;
              color: #444;
              z-index: 200;
            }
          }
        }
      }
      .body {
        flex: 1 1 0px;
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

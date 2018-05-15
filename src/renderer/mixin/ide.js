import { mapState, mapGetters, mapActions } from 'vuex'

// 将常用api置于此处
export default {
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
    // 打开项进行操作
    safeClose(item) {
      if (item.changed) {
        // 询问是否保存
      }

      this.close(item)
    }
  }
}

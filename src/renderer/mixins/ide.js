import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

// 将常用api置于此处
export default {
  computed: {
    ...mapState(['activeTab', 'openedTabs', 'activeSidebar', 'activeBottombar', 'bottombarVisible', 'sidebarVisible']),
    ...mapGetters(['openedItems', 'activeItem'])
  },
  methods: {
    ...mapActions([
      'open',
      'openFromUri'
    ]),
    ...mapMutations([
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

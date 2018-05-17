// import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import helper from '../helper'
import store from '../store'
import service from '../service'

// // **************api只有store正确加载后方可生效*****************
// // 将常用api置于此处
// const api = {
//   $store: store(),
//   ...mapActions([
//     'open',
//     'openFromUri',
//     'activeDefaultBottombar',
//     'activeDefaultSidebar',

//   ]),
//   ...mapMutations([
//     // menus
//     'addMenu',
//     'removeMenu',

//     // toolbox
//     'showToolbox',
//     'hideToolbox',
//     'toggleToolbox',

//     // openeds
//     'setActiveTab',
//     'setActiveItem',
//     'closeActiveTab',
//     'openItem',
//     'openTab',
//     'closeTab',
//     'closeItem',
//     // sidebar
//     'setActiveSidebar',
//     'showSidebar',
//     'hideSidebar',
//     'toggleSidebar',

//     // bottombar
//     'setActiveBottombar',
//     'showBottombar',
//     'hideBottombar',
//     'toggleBottombar'
//   ])
// }

// // 可读写属性，从state中处获取
// helper.mapProperties(api, false, mapState, [
//   'activeTab',
//   'activeSidebar',
//   'activeBottombar',
//   'bottombarVisible',
//   'sidebarVisible'
// ])

// // 只读state属性
// helper.mapProperties(api, true, mapState, [
//   'openedTabs',
//   'sidebars',
//   'bottombars'
// ])

// // 只读属性，从getters获取
// helper.mapProperties(api, true, mapGetters, [
//   'activeItem',
//   'visibleBottombars',
//   'visibleSidebars',
//   'openedItems'
// ])

const api = helper.mapStore(store(), undefined, false, false)

// 注册服务
service('ide', api)

export default api

const state = {
  views: {
    tag: 'container',
    path: 'container',
    title: 'root',
    component: {
      icon: 'home',
      name: 'container',
      attributes: {
        title: {
          type: String,
          default: '默认值'
        },
        hidden: {
          type: Boolean,
          default: false
        },
        width: {
          type: Number,
          default: 200
        },
        height: {
          type: Number,
          default: 200
        }
      }
    },
    props: {
      width: 300
    },
    children: [
      {
        tag: 'dev',
        path: 'container/div',
        title: 'dev',
        icon: 'face',
        component: {
          icon: 'home',
          name: 'input',
          attributes: {
            title: {
              type: String,
              default: '默认值'
            },
            hidden: {
              type: Boolean,
              default: false
            },
            width: {
              type: Number,
              default: 200
            },
            height: {
              type: Number,
              default: 200
            }
          }
        },
        props: {
          width: 300
        }
      },
      {
        tag: 'textbox',
        path: 'container/textbox',
        title: 'textbox',
        icon: 'book',
        component: {
          icon: 'home',
          name: 'textbox',
          attributes: {
            title: {
              type: String,
              default: '默认值'
            },
            hidden: {
              type: Boolean,
              default: false
            },
            width: {
              type: Number,
              default: 200
            },
            height: {
              type: Number,
              default: 200
            }
          }
        },
        props: {
          width: 300
        }
      }
    ]
  },
  activeSidebar: 'outline',
  activeTab: 'designer',
  selectedNode: null
}

const mutations = {
  selectNode(state, node) {
    state.selectedNode = node
  },
  selectTab(state, tab) {
    state.activeTab = tab
  },
  selectSidebar(state, sidebar) {
    state.activeSidebar = sidebar
  }
}

const actions = {
  async selectNode({ commit }, node) {
    // do something async
    commit('selectNode', node)
  },
  selectSidebar({ commit }, sidebar) {
    commit('selectSidebar', sidebar)
  },
  selectTab({ commit }, tab) {
    commit('selectTab', tab)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

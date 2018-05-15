import uuid from 'uuid/v1'

const namespace = 'dynamic'

/**
 * 本模块用于api调用动态添加组件到App.vue实例中
 * 被添加的组件必须不影响整个界面布局，使用position: abslute布局
 * 被添加的组件必须事先注册到全局Vue中
 * 最适合用于对话框、隐藏组件的使用。
 */
export default {
  namespaced: true,
  state: {
    // 已打开的对话框
    components: {}
  },
  getters: {
    hasComponent(state) {
      return state.components.length > 0
    }
  },
  mutations: {
    _add(state, dialog) {
      state.components.push(dialog)
    },
    _pop(state) {
      state.components.pop()
      state.dialog = state.components[state.components.length - 1] || null
    }
  },
  actions: {
    /**
     * 返回添加后的组件ID
     * @param {*} state - fdsf
     */
    add({ state, commit }, options) {
      const id = uuid()
      commit(`${namespace}/_add`, options)
      return id
    },
    showDialog({ commit }, { title, component, tag }) {
      return new Promise((resolve) => {
        const on = component.on || (component.on = {})
        on.done = function(result) {
          resolve({
            ok: true,
            data: result
          })
          commit('pop')
        }
        commit('add', {
          title,
          component,
          tag,
          close() {
            resolve({
              cancel: true
            })
            commit('pop')
          }
        })
      })
    }
  }
}

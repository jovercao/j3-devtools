export default function({ resource }) {
  return {
    state: {
      openeds: {
        files: {
          type: 'files',
          path: '/',
          list: ['d:', 'c:']
        }
      }
    },
    getters: {

    },
    mutations: {
      open(state, opened) {
        state.openeds[opened.resourceType] = opened
      }
    },
    actions: {
      async openResource({ commit }, { type, path }) {
        const list = await resource(type).list(path)
        commit('open', {
          type,
          path,
          list
        })
      }
    }
  }
}


export default {
  props: {
    namespaced: {
      type: [ Boolean ],
      required: true,
      default: false
    },
    name: {
      type: [ String ],
      required: true
    },
    state: {
      type: [ Object ],
      required: true,
      default: {}
    },
    mutations: {
      type: [ Object ],
      required: true,
      default: {}
    },
    actions: {
      type: [ Object ],
      required: true,
      default: {}
    },
    getters: {
      type: [ Object ],
      required: true,
      default: {}
    },
    modules: {
      type: [ Object ],
      required: false,
      validator(value) {

      }
    }
  }
}

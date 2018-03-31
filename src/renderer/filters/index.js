import * as style from './style'

const filters = Object.assign({}, style)

export default {
  install(Vue) {
    for (const name in filters) {
      Vue.filter(name, filters[name])
    }
  },
  filters
}

export {
  filters
}

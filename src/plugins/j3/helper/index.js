import * as marked from './marked'
import * as dom from './dom'
import * as style from './style'

const helper = Object.assign({},
  marked,
  dom,
  style
)

export default {
  install(Vue, options) {
    Vue.prototype.$helper = helper
  },
  helper
}

export {
  helper
}

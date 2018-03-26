import _ from 'lodash'

const helper = {
  metric(value) {
    if (_.isNumber(value)) {
      return value + 'px'
    }

    if (_.isString) {
      return value
    }
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$helper = helper
  }
}

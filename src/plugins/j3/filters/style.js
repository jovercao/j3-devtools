import _ from 'lodash'

const style = {
  metric(value) {
    if (_.isNumber(value)) {
      return value + 'px'
    }

    if (_.isString) {
      return value
    }
  }
}

export default style

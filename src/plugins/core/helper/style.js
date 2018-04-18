import _ from 'lodash'

function metric(value) {
  if (_.isNumber(value)) {
    return value + 'px'
  }

  if (_.isString) {
    return value
  }
}

export {
  metric
}

export default {
  metric
}

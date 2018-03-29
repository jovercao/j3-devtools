import _ from 'lodash'

const def = Object.assign({
  shortString(str, len = 10, last = '…') {
    if (!_.isString(last)) {
      throw new Error('last必须为字符串')
    }
    if (_.isString(str) && str.length > len - last.length) {
      return str.substr(0, len - last.length) + last
    }

    return str
  }
}, _)

export default def

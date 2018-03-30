import _ from 'lodash'

const helper = {
  metric(value) {
    if (_.isNumber(value)) {
      return value + 'px'
    }

    if (_.isString) {
      return value
    }
  },
  // getClientMousePos(event) {
  //   const e = event || window.event
  //   const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
  //   const scrollY = document.documentElement.scrollTop || document.body.scrollTop
  //   const x = e.pageX || e.clientX + scrollX
  //   const y = e.pageY || e.clientY + scrollY

  //   return { x, y }
  // },
  getMousePos(event) {
    const e = event
    const x = e.pageX
    const y = e.pageY

    return { x, y }
  },
  getRect(cmpOrEl) {
    const el = cmpOrEl.$el || cmpOrEl
    function getTop(e) {
      var offset = e.offsetTop
      if (e.offsetParent != null) {
        offset += getTop(e.offsetParent)
      }
      return offset
    }

    function getLeft(e) {
      var offset = e.offsetLeft
      if (!e.offsetParent) {
        offset += getLeft(e.offsetParent)
      }
      return offset
    }

    // const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
    // const scrollY = document.documentElement.scrollTop || document.body.scrollTop

    return {
      x: getLeft(el),
      y: getTop(el),
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$helper = helper
  }
}

function getMousePos(event) {
  const e = event
  const x = e.pageX
  const y = e.pageY

  return { x, y }
}

function getOffsetTop(e) {
  var offset = e.offsetTop
  if (e.offsetParent != null) {
    offset += getOffsetTop(e.offsetParent)
  }
  return offset
}

function getOffsetLeft(e) {
  var offset = e.offsetLeft
  if (!e.offsetParent) {
    offset += getOffsetLeft(e.offsetParent)
  }
  return offset
}

function getOffsetRect(cmpOrEl) {
  const el = cmpOrEl.$el || cmpOrEl
  // const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
  // const scrollY = document.documentElement.scrollTop || document.body.scrollTop

  return {
    x: getOffsetLeft(el),
    y: getOffsetTop(el),
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

function getClientSize(el) {
  return {
    width: el.clientWidth,
    height: el.clientWHeight
  }
}

export {
  getMousePos,
  getOffsetLeft,
  getOffsetTop,
  getOffsetRect,
  getClientSize
}

export default {
  getMousePos,
  getOffsetLeft,
  getOffsetTop,
  getOffsetRect,
  getClientSize
}

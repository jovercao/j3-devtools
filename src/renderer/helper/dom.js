function getMousePos(event) {
  const e = event
  const x = e.pageX
  const y = e.pageY

  return { x, y }
}

const scrollContext = new Map()
// 每秒帖数
const pages = 60
// 0.3秒内必须滚动完毕
const time = 0.3 * 1000
// 动画时间间隔
const interval = 1000 / pages

// 平滑滚动
function scroll(el, offset, direction = 'horizontal' || 'vertical') {
  const isVertical = direction === 'vertical'
  const scrollPos = isVertical ? 'scrollTop' : 'scrollLeft'
  const scrollSize = isVertical ? 'scrollHeight' : 'scrollWidth'

  if (!scrollContext.has(el)) {
    scrollContext.set(el, {})
  }
  const ctx = scrollContext.get(el)
  let intervalId, scrollTo
  // 有上次滚动,尚在滚动期间
  if (ctx[direction]) {
    intervalId = ctx[direction].lastInterval
    scrollTo = ctx[direction].lastScrollTo
    clearInterval(intervalId)
  } else {
    scrollTo = el[scrollPos]
  }
  scrollTo += offset

  scrollTo = Math.min(el[scrollSize], Math.max(0, scrollTo))

  let distance = scrollTo - el[scrollPos]
  // 每次滚动距离
  const span = distance / (time / interval)

  intervalId = setInterval(() => {
    const lastScrollPos = el.scrollLeft
    el[scrollPos] += span
    distance -= span
    // 达到目标或者(允许误差范围5像素)，滚不动了，就停止
    if ((Math.abs(distance) <= 5) || el[scrollPos] === lastScrollPos) {
      clearInterval(intervalId)
      intervalId = null
      scrollTo = null
      delete ctx[direction]
      // 如果没了
      if (Object.keys(ctx) === 0) {
        // 删除context
        scrollContext.delete(el)
      }
    }
  }, interval)
  // 存入对象
  ctx[direction] = {
    lastInterval: intervalId,
    lastScrollTo: scrollTo
  }
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
  getClientSize,
  scroll
}

export default {
  getMousePos,
  getOffsetLeft,
  getOffsetTop,
  getOffsetRect,
  getClientSize,
  scroll
}

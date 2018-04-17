/**
 * 管理类api，用于各类资源管理。
 * TODO: 待完成
 */

/**
 * 创建一个管理对象
 */
function createManager({
  data = {},
  name,
  title,
  defaultOverride = false
}) {
  // 排序
  const sorts = []
  const mgr = function(name, item, override = defaultOverride) {
    if (item) {
      mgr.add(name, item, override)
    }
  }

  mgr.add = function(name, item) {

  }

  mgr.remove = function(name) {

  }

  mgr.list = function() {
    return sorts
  }

}

export default createManager

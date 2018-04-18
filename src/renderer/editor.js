import config from './config'
import _ from 'lodash'

const Editors = {}

const defaultEditors = config.get('content-editors')

/**
 * @param {string | object | array} name - 编辑器名称
 * @param {string[]} options.contentTypes - 支持的内容类型
 * @param {string} options.component - Vue组件名称
 */
function editor(name, options) {
  if (!options) {
    if (_.isString(name)) return Editors[name]
    if (_.isObject(name)) {
      const opts = name
      for (const key in opts) {
        editor(key, opts[key])
      }
      return
    }
    if (_.isArray(name)) {
      const items = name
      for (const item of items) {
        editor(item.name, item)
      }
      return
    }
  }
  if (Editors[name] && options !== Editors[name]) {
    throw new Error(`编辑器命名冲突！名称'${name}'已经存在!`)
  }
  options.name = name
  Editors[name] = options
}

editor.all = function() {
  const list = []
  for (const item of editor) {
    list.push(item)
  }
  return list
}

/**
 * 获取类型
 * @param {string} contentType - 内容类型，如 "vue"
 */
editor.getEditor = function(contentType) {
  const def = defaultEditors[contentType]
  if (def && Editors[def]) {
    return Editors[def]
  }
  for (const name in Editors) {
    const editor = Editors[name]
    if ((editor.contentTypes || []).includes(contentType)) {
      return editor
    }
  }
}

export default editor

import config from './config'

const Editors = {}

const defaultEditors = config.get('content-editors')

/**
 * @param {string} name - 编辑器名称
 * @param {string[]} options.contentTypes - 支持的内容类型
 * @param {string} options.component - Vue组件名称
 */
function editor(name, options) {
  if (!options) {
    return Editors[name]
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
  for (const editor of Editors) {
    if ((editor.contentTypes || []).includes(contentType)) {
      return editor
    }
  }
}

export default editor

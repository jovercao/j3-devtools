import url from 'url'
import { dirname } from 'path'

/*
  * content结构:
  * {
  *    id: String,
  *    data: Any,
  *    openTime: Date
  *    lastSaveTime: Date,
  * }
*/
function resource(name) {
  const mgr = contentTypes[name]
  if (!mgr) {
    throw new Error('资源类型不存在！')
  }
}

const contentTypes = {
  'j3-view': {
    // * 描述内容如何获取
    // * id 一般为完整路径
    get(id) {
      throw new Error('未实现！')
    },
    // * 描述内容如何保存
    set(content) {
      throw new Error('未实现！')
    },
    // * 创建资源
    create(id, data) {
      throw new Error('未实现！')
    },
    // * 描述内容列表查询
    // * 返回 [{ id, title, data?: Any }]
    list(path) {
      throw new Error('未实现！')
    }
  }
}

Object.assign(resource, {
  contentTypes,
  /**
   * 解释Uri
   */
  parseUri: url.parse,
  /**
  * 转换为获取Uri字符串
  */
  toUriString(contentType, id) {
    return `${contentType}:/${id}`
  },
  /**
   *  获取父级ID
   */
  parentId: dirname,
  async get(uri) {
    const info = url.parse(uri)
    const contentType = info.protocol
    const id = info.path
    const mgr = resource(contentType)
    const data = await mgr.get(id)
    return data
  },
  async set (uri, data) {
    const info = url.parse(uri)
    const contentType = info.protocol
    const id = info.path
    const mgr = resource(contentType)
    await mgr.set(id, data)
  },
  async list (uri) {
    const info = url.parse(uri)
    const contentType = info.protocol
    const id = info.path
    const mgr = resource(contentType)
    const res = await mgr.list(id)
    return res
  },
  async create(uri, data) {
    const info = url.parse(uri)
    const contentType = info.protocol
    const id = info.path
    const mgr = resource(contentType)
    await mgr.create(id, data)
  }
})

export default resource

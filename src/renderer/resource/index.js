import url from 'url'
import { dirname } from 'path'
import service from '../service'

const Resources = {}

/**
 * options:
 * {
 *   get(id): { id: String, contentType: String, data: Any },
 *   set(id, content: { contentType: String, data: Any }),
 *   list(path) : [{ id: String, contentType: String }]
 *   create(id, content: { contentType: String, data: Any })
 * }
 */
function resource(name, options) {
  if (!options) {
    const mgr = Resources[name]
    if (!mgr) {
      throw new Error('资源类型不存在！')
    }
    return mgr
  }

  Resources[name] = options
}

Object.assign(resource, {
  all() {
    const list = []
    for (const item in Resources) {
      list.push(item)
    }
    return list
  },
  /**
   * 解释Uri
   */
  parseUri: url.parse,
  /**
  * 转换为获取Uri字符串
  */
  toUriString(resourceType, id) {
    return `${resourceType}:/${id}`
  },
  /**
   *  获取父级ID
   */
  parentId: dirname,
  async get(uri) {
    const info = url.parse(uri)
    const resourceType = info.protocol
    const id = info.path
    const mgr = resource(resourceType)
    const data = await mgr.get(id)
    data.resourceType = resourceType
    return data
  },
  async set (uri, data) {
    const info = url.parse(uri)
    const resourceType = info.protocol
    const id = info.path
    const mgr = resource(resourceType)
    await mgr.set(id, data)
  },
  async list (uri) {
    const info = url.parse(uri)
    const resourceType = info.protocol
    const id = info.path
    const mgr = resource(resourceType)
    const res = await mgr.list(id)
    return res
  },
  async create(uri, data) {
    const info = url.parse(uri)
    const resourceType = info.protocol
    const id = info.path
    const mgr = resource(resourceType)
    await mgr.create(id, data)
  }
})

export default resource

service('resource', resource)

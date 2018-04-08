import url from 'url'
import { dirname } from 'path'

import file from './file'

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
  const mgr = resourceTypes[name]
  if (!mgr) {
    throw new Error('资源类型不存在！')
  }
  return mgr
}

const resourceTypes = {
  file
}

Object.assign(resource, {
  resourceTypes,
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

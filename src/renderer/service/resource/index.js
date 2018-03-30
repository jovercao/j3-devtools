import url from 'url'
import { dirname } from 'path'
import views from './views'
import reports from './reports'
import querys from './querys'
import packages from './packages'
import connections from './connections'

import demoView from './demo-view'

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
  return mgr
}

const contentTypes = {
  'demo-view': demoView,
  views,
  packages,
  querys,
  connections,
  reports
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

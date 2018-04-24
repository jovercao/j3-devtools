import url from 'url'
import { dirname } from 'path'
import service from '../service'
import commands from '../commands'
// import _ from 'lodash'
// import assert from 'assert'

const Resources = {}

/**
 * options:
 * {
 *   title: '显示名称',
 *   icon: '图标',
 *   get(path): { path: String, contentType: String, data: Any },
 *   set(path, content: { contentType: String, data: Any }),
 *   list(path) : [{ path: String, contentType: String }]
 *   create(path, content: { contentType: String, data: Any })
 * }
 */
function resource(name, options) {
  if (!options) {
    if (!name) {
      return Resources
    }
    const mgr = Resources[name]
    if (!mgr) {
      throw new Error('资源类型不存在！')
    }
    return mgr
  }
  Resources[name] = options
  options.name = name
}

Object.assign(resource, {
  all() {
    const list = []
    for (const name in Resources) {
      list.push(Resources[name])
    }
    return list
  },
  /**
   * 解释Uri
   */
  parseUri(uri) {
    const parsed = url.parse(uri)
    if (!parsed.protocol) {
      throw new Error('不合法的uri！')
    }
    parsed.resourceType = parsed.protocol.substr(0, parsed.protocol.length - 1)
    return parsed
  },
  /**
  * 转换为获取Uri字符串
  */
  toUriString({ resourceType, auth, path, host }) {
    // assert(!_.isString(path), 'path 必须为string类型')
    // assert(!_.isString(resourceType), 'resourceType 必须为string类型')
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    return `${resourceType}://${auth ? auth + '@' : ''}${host || ''}${path}`
  },
  /**
   *  获取父级path
   */
  parentPath: dirname,
  async get(uri) {
    const info = resource.parseUri(uri)
    const mgr = resource(info.resourceType)
    const content = await mgr.get(info.path)
    content.resourceType = info.resourceType
    content.uri = uri
    content.path = info.path
    return content
  },
  async set (content) {
    const { uri } = content
    const info = resource.parseUri(uri)
    const mgr = resource(info.resourceType)
    await mgr.set(content)
  },
  async list (uri) {
    const info = url.parse(uri)
    const resourceType = info.protocol
    const mgr = resource(resourceType)
    const res = await mgr.list(info.path)
    return res
  },
  async create(uri, data) {
    const info = url.parse(uri)
    const resourceType = info.protocol
    const mgr = resource(resourceType)
    await mgr.create(info.path, data)
  },
  contentType(type) {
    return ''
  }
})

export default resource

service('resource', resource)
commands('ide.open-resource', {
  handler(ctx) {
    alert(ctx)
  }
})

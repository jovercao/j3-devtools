import url from 'url'
import { dirname } from 'path'
import service from '../service'
// import _ from 'lodash'
// import assert from 'assert'

const Resources = {}

/**
 * options:
 * {
 *   title: '显示名称',
 *   icon: '图标',
 *   description: '说明',
 *   protocol: 'http'
 *   async get(path): { path: String, contentType: String, data: Any },
 *   async set(path, content: { contentType: String, data: Any }),
 *   async list(path) : [{ path: String, contentType: String }]
 *   async create(path, content: { contentType: String, data: Any })
 *   async exists(path)
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
  keys() {
    return Object.keys(Resources)
  },
  all() {
    return Object.values(Resources)
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
    if (parsed.auth) {
      const autheds = parsed.auth.split(':')
      parsed.username = autheds[0]
      parsed.password = autheds[1] || ''
    }
    return parsed
  },
  /**
  * 转换为获取Uri字符串
  */
  toUriString({ resourceType, username, password, path, host }) {
    // assert(!_.isString(path), 'path 必须为string类型')
    // assert(!_.isString(resourceType), 'resourceType 必须为string类型')
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    path = path.replace(/\\/g, '/')
    const uri = `${resourceType}://${(username && `${username}:${password}@`) || ''}${host || ''}${path}`
    return uri
  },
  /**
   *  获取父级path
   */
  parentPath: dirname,

  async connect(uri) {
    const info = resource.parseUri(uri)
    const conn = await resource(info.resourceType).connect(info)
    conn.options = info
    return conn
  },
  async exists(uri) {
    let conn = await resource.connect(uri)
    console.log(uri)
    console.log(conn)
    const result = await conn.exists(conn.options.path)
    return result
  },
  async get(uri) {
    const conn = await resource.connect(uri)
    const content = await conn.get(conn.options.path)
    content.resourceType = conn.options.resourceType
    content.uri = uri
    content.path = conn.options.path
    return content
  },
  async set (content) {
    const { uri } = content
    const conn = await resource.connect(uri)
    await conn.set(content)
  },
  async list (uri) {
    const conn = await resource.connect(uri)
    console.log(conn)
    const res = await conn.list(conn.options.path)
    return res
  },
  async create(uri, data) {
    const conn = await resource.connect(uri)
    await conn.create(conn.options.path, data)
  },
  contentType(type) {
    return ''
  }
})

export default resource

service('resource', resource)

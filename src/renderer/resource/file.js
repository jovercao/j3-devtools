// 本地文件

import fs from 'fs'
import { basename, join } from 'path'
import { promisify } from 'util'
import os from 'os'

const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)
const stat = promisify(fs.stat)

function idToPath(id) {
  if (id.startsWith('/') && os.platform() === 'win32') {
    return id.substr(1, id.length - 1)
  }
  return id
}

async function exists(path) {
  let exists = false
  try {
    await stat(path)
    exists = true
  } catch (error) {
  }
  return exists
}

const file = {
  // * 描述内容如何获取
  // * id 一般为完整路径
  async get(id) {
    const path = idToPath(id)
    const filename = basename(path)
    const fn = filename.split('.')
    const data = await readFile(path)
    return {
      id,
      title: filename,
      contentType: fn[fn.length - 1],
      data
    }
  },
  // * 内容保存
  async set(content) {
    const { id, data, encoding } = content
    const path = idToPath(id)
    const isExists = await exists(path)
    if (!isExists) {
      throw new Error('文件不存在！')
    }
    await writeFile(path, data, { encoding: encoding || 'utf-8' })
  },
  // * 创建内容
  async create(id, content) {
    const { data, encoding } = content
    const path = idToPath(id)
    const isExists = await exists(path)
    if (isExists) {
      throw new Error('文件已经存在！')
    }
    await writeFile(path, data, { encoding: encoding || 'utf-8' })
    content.id = id
  },
  // * 描述内容列表查询
  // * 返回 [{ id, title, data?: Any }]
  async list(path) {
    const files = await readdir(path)
    const result = []
    for (const filename of files) {
      const fn = filename.split('.')
      const filePath = join(path, filename)
      const st = await stat(filePath)
      const isFile = st.isFile()
      const isDir = st.isDirectory()
      if (isDir) {
        result.push({
          path: filePath,
          isPath: true
        })
      } else if (isFile) {
        result.push({
          path: filePath,
          name: filename,
          isPath: false,
          contentType: fn[fn.length - 1]
        })
      }
    }
    return result
  }
}

export default file

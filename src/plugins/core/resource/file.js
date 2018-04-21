// 本地文件

import fs from 'fs'
import { basename, join } from 'path'
import { promisify } from 'util'
import os from 'os'
import { readLogicalDisks } from './util'

export default function (ide, options) {

  const readFile = promisify(fs.readFile)
  const readdir = promisify(fs.readdir)
  const writeFile = promisify(fs.writeFile)
  const stat = promisify(fs.stat)
  const isWin32 = os.platform() === 'win32'

  function properPath(path) {
    if (path.startsWith('/') && isWin32) {
      return path.substr(1, path.length - 1)
    }
    return path
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
    title: '本地文件',
    icon: 'el-icon-document',
    description: '从本地文件打开',
    // // 工具栏按钮，只允许添加按钮
    // tools: [
    //   {
    //     icon: '',
    //     title: '',
    //     handler() {

    //     },
    //     command: '' // command 与 handler 二选一, 将优先执行command
    //   }
    // ],
    // // 右键弹出菜单
    // propMenus: [

    // ],
    // * 描述内容如何获取
    // * id 一般为完整路径
    async get(path) {
      path = properPath(path)
      const filename = basename(path)
      const fn = filename.split('.')
      try {
        const data = await readFile(path)
        return {
          path,
          name: filename,
          contentType: fn[fn.length - 1],
          data
        }
      } catch (err) {
        throw new Error(`读取文件${path}时发生异常：${err}`)
      }
    },
    // * 内容保存
    async set(content) {
      const { data, encoding } = content
      let { path } = content
      path = properPath(path)
      const isExists = await exists(path)
      if (!isExists) {
        throw new Error('文件不存在！')
      }
      await writeFile(path, data, { encoding: encoding || 'utf-8' })
    },
    // * 创建内容
    async create(path, content) {
      const { data, encoding } = content
      path = properPath(path)
      const isExists = await exists(path)
      if (isExists) {
        throw new Error('文件已经存在！')
      }
      await writeFile(path, data, { encoding: encoding || 'utf-8' })
      content.id = path
    },
    // * 描述内容列表查询
    // * 返回 [{ id, title, data?: Any }]
    async list(path) {
      if (isWin32 && path === '/') {
        const disks = await readLogicalDisks()
        return disks.map(disk => ({ path: disk + '/', name: disk + '/', isPath: true }))
      }
      const files = await readdir(path)
      const result = []
      for (const filename of files) {
        const fn = filename.split('.')
        const filePath = join(path, filename)
        let isFile = false
        let isDir = false
        try {
          const st = await stat(filePath)
          isFile = st.isFile()
          isDir = st.isDirectory()
        } catch (err) {}
        if (isDir) {
          result.push({
            path: filePath,
            name: filename,
            isPath: true
          })
        } else if (isFile) {
          result.push({
            path: filePath,
            name: filename,
            isPath: false,
            type: fn[fn.length - 1]
          })
        }
      }
      return result
    }
  }

  return file
}

import os from 'os'
import config from './config'
import fs from 'fs'
import { join } from 'path'
import axios from 'axios'
import service from './service'
// import unzip from 'unzip'

// 独立出来，不与vm.$http共享配置
const http = axios.create({})

let pathMattch
const urlMatch = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
const nameMatch = /[a-z][a-z0-9]*(-[a-z][a-z0-9]*)*/

if (os.platform() === 'win32') {
  pathMattch = /^[a-zA-Z]:[\\/]((?! )(?![^\\/]*\s+[\\/])[\w -]+[\\/])*(?! )(?![^.]+\s+\.)[\w -]+$/
} else {
  pathMattch = /^([\/][\w-]+)*$/
}

// dir path
// const pluginLocalpath = resolve(config.get('plugins-path'))

// url
const pluginRegistry = config.get('plugin-registry')
const tempPath = config.get('temp-path')

const installedPlugins = config.get('installed-plugins')

// ************************私有成员***************************

function nameToUrl(name) {
  return pluginRegistry + '/' + name
}

function getLocalPath(name) {
  return require.resolve('#', name)
}

// async function doInstall(path, name) {
//   const extractPath = join(pluginLocalpath, name)
//   // TODO：需要加入解压是否完成回调等验证
//   // unzip
//   fs.createReadStream(path).pipe(unzip.Extract({ path: extractPath }))

//   try {
//     const json = fs.readFileSync(join(extractPath, 'package.json'))
//     const p = JSON.parse(json)
//     if (p.dependents) {
//       // 先安装子插件
//       for (const depName in p.dependents) {
//         // 如果尚未安装子插件
//         if (!isInstaled(depName)) {
//           await install(depName)
//         }
//       }
//     }
//     installedPlugins.push(name)
//     // 默认配置
//     config.set('#' + name, p.defaultOptions)
//   } catch (err) {
//     console.error('不是合法的扩展包，错误信息：', err)
//   }
// }

// **************************公有成员****************************
async function download(url, name) {
  const response = await http.get(url)
  if (response.status === 200) {
    const filename = join(tempPath, name + '.zip')
    response.data.pipe(fs.createWriteStream(filename))
    return filename
  } else {
    throw new Error('错误！')
  }
}

async function install(plugin) {
  let path, url, name
  // 如果是文件路径
  if (pathMattch.test(plugin)) {
    path = plugin
    let pos = path.lastIndexOf('/')
    if (pos < 0) {
      pos = path.lastIndexOf('\\')
    }
    name = path.substring(pos + 1, url.length - 1)
  } else if (urlMatch.test(plugin)) {
    url = plugin
    const pos = url.lastIndexOf('/')
    const name = url.substring(pos + 1, url.length - 1)
    path = await download(url, name)
  } else if (nameMatch.test(plugin)) {
    name = plugin
    const url = nameToUrl(plugin)
    path = await download(url, name)
  } else {
    throw new Error('plugin 不符合匹配！')
  }

  // doInstall(path, name)
  // 执行安装
}

async function uninstall(plugin) {
  const path = require.resolve('#', plugin)
  if (!fs.existsSync(path)) {
    fs.rmdirSync(path)
  }
}

async function view(plugin) {
  if (!pluginRegistry) {
    throw new Error('插件仓库地址丢失。')
  }
  const response = await http.request({
    url: pluginRegistry + '/ + plugin',
    method: 'VIEW'
  })
  return response.data
}

async function isInstaled(plugin) {
  return installedPlugins.includes(plugin)
}

async function getInstalleds() {
  return installedPlugins

  // const installeds = {}
  // const files = fs.readdirSync(pluginLocalpath)
  // for (const file in files) {
  //   const stat = fs.statSync(file)
  //   // 一个插件一个目录
  //   if (stat.isDirectory()) {
  //     installeds[file] = require(join(pluginLocalpath, file, 'plugin.json'))
  //   }
  // }
  // return installeds
}

async function getList() {
  if (!pluginRegistry) {
    throw new Error('插件仓库地址丢失。')
  }
  const response = await http.get(pluginRegistry)
  return response.data
}

/**
 * 初始化已安装插件
 */
function initPlugins(ctx) {
  for (const pluginName of installedPlugins) {
    // const localPath = getLocalPath(pluginName)
    // const entryPath = join(localPath, 'plugin.js')
    // require.ensure([], function (require) {
    // console.log(entryPath)
    const plugin = require('#/' + pluginName + '/plugin.js')
    // 初始化默认参数
    const options = config.get('#' + pluginName)
    plugin.go(ctx, options)
    // })
  }
}

const plugin = {
  initPlugins,
  view,
  getInstalleds,
  install,
  uninstall,
  getList,
  isInstaled,
  download,
  nameToUrl,
  getLocalPath
}

service('plugin', plugin)

export default plugin

import _ from 'lodash'
import os from 'os'

let pathMattch

if (os.platform() === 'win32') {
  pathMattch = /^[a-zA-Z]:[\\/]((?! )(?![^\\/]*\s+[\\/])[\w -]+[\\/])*(?! )(?![^.]+\s+\.)[\w -]+$/
} else {
  pathMattch = /^([\/][\w-]+)*$/
}
const urlMatch = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/

const nameMatch = /[a-z][a-z0-9]*(-[a-z][a-z0-9]*)*/

async function download(url) {

}

function nameToUrl(name) {
  return name
}

function doInstall(path) {
  // unzip
}

export default {
  async install(plugin) {
    let path
    // 如果是文件路径
    if (pathMattch.test(plugin)) {
      path = plugin
    } else if (urlMatch.test(plugin)) {
      path = await download(plugin)
    } else if (nameMatch.test(plugin)) {
      const url = nameToUrl(plugin)
      path = await download(url)
    } else {
      throw new Error('plugin 不符合匹配！')
    }

    doInstall(path)
    // 执行安装
  },
  async uninstall(plugin) {

  },
  async getInstalleds() {
    
  },
  async getList() {

  }
}

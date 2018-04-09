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

export default {
  install(plugin) {
    // 如果是文件路径
    if (pathMattch.test(plugin)) {
      
    } else if (urlMatch.test(plugin)) {

    } else if (nameMatch.test(plugin)) {

    }

    throw new Error('plugin 不符合匹配！')
  },
  uninstall(plugin) {

  },
  getInstalleds() {

  },
  getList() {

  }
}

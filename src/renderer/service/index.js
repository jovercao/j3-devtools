import catalogs from '../catalogs'
import view from './view'
import generate from './generate'
import model from './model'
import resource from './resource'

const service = {
  // 资源管理
  resource,
  /**
   * 获取可用组件列表
   * @return {object[]} 返回所有已注册组件列表
   */
  async getComponents() {
    return catalogs.components
  },
  /**
   * 获取所有设计摘要列表
   */
  async getCatalogs() {
    return catalogs
  },
  /**
   * 获取数据库连接
   * @return {object[]} 返回数据连接列表
   */
  async getConnections() {

  },
  /**
   * 获取查询
   */
  async getQuerys() {

  },

  /**
   * 获取程序包列表
   */
  async getPackages() {

  },

  async readPackage() {

  },

  async savePackage() {

  },
  /**
   * 获取所有报表
   */
  async getReports() {

  }
}

Object.assign(service, view, model)

service.generate = generate

export default {
  install(Vue, options) {
    Vue.prototype.$service = service
  }
}

export {
  service
}

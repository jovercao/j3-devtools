const service = {

  /**
   * 获取可用组件列表
   * @return {object[]} 返回所有已注册组件列表
   */
  async getComponents() {

  },
  /**
   * 获取所有视图
   * @return {object[]} 返回组件列表
   */
  async getViews() {
  },
  /**
   * 获取数据模型列表
   * @return {object[]} 返回所有模型列表
   */
  async getModels() {

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

  async openPackage() {

  },

  async savePackage() {

  },
  /**
   * 打开数据模型
   * @return {object} - 返回模型对象
   */
  async openModel(path) {

  },
  /**
   * 保存数据模型
   * @param {string} path - 路径
   * @param {object} model - model对象
   */
  async saveModel(path, model) {

  },

  /**
   * 打开数据视图
   * @return {object} - 返回视图对象
   */
  async openView(path) {

  },

  /**
   * 保存视图
   * @param {string} path - 路径
   * @param {object} view - 视图对象
   * @return {void}
   */
  async saveView(path, view) {

  },

  /**
   * 获取所有报表
   */
  async getReports() {

  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$service = service
  }
}

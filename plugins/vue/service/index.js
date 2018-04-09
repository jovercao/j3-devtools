import catalogs from './catalogs'
import generate from './generate'
import resource from './resource'

const service = {
  // 资源管理
  resource,
  /**
   * 获取所有设计摘要列表
   */
  catalogs,
  // 代码生成器
  generate
}

export default {
  install(Vue, options) {
    Vue.prototype.$service = service
  }
}

export {
  service
}

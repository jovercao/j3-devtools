export default {
  // * 描述内容如何获取
  // * id 一般为完整路径
  get(id) {
    throw new Error('未实现！')
  },
  // * 描述内容如何保存
  set(content) {
    throw new Error('未实现！')
  },
  // * 创建资源
  create(id, data) {
    throw new Error('未实现！')
  },
  // * 描述内容列表查询
  // * 返回 [{ id, title, data?: Any }]
  list(path) {
    throw new Error('未实现！')
  }
}

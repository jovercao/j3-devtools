export default {
  'plugin-path': {
    type: String,
    title: '路径',
    required: false,
    default: './plugins'
  },
  'installed-plugins': {
    type: Array,
    title: '已安装插件',
    // 不允许在配置编辑器中编辑
    editable: false,
    default: [],
    validator(value, item) {

    }
  }
}

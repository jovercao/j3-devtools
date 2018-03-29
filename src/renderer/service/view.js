export default {

  /**
   * 打开数据视图
   * @return {object} - 返回视图对象
   */
  async readView(path) {
    return {
      title: '水平多栏自伸缩布局',
      icon: '',
      type: 'J3FlexPanel',
      props: {
        direction: 'horizontal',
        align: 'stretch'
      },
      slots: {
        default: [
          {
            type: 'J3FlexPanelItem',
            props: {
              grow: 0,
              thickness: 150
            },
            events: [],
            binds: []
          },
          {
            type: 'J3FlexPanelItem',
            props: {
              grow: 1,
              thickness: 150
            }
          }
        ]
      },
      event: {},
      binds: {}
    }
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
   * 获取所有视图
   * @return {object[]} 返回组件列表
   */
  async getViews() {
  }
}

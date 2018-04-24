export default {
  name: 'J3FlexPanelItem',
  tag: 'flex-panel-item',
  icon: 'list',
  title: 'Dock面板栏目',
  category: 'layout',
  description: 'Dock面板的栏',
  props: {
    thickness: {
      type: Number,
      default: 150,
      description: '宽度'
    },
    grow: {
      type: Number,
      default: 0,
      description: '比例'
    }
  },
  slots: {
    'default': {
      description: '',
      accepts: '*'
    }
  },
  acceptsParent: [
    'J3FlexPanel'
  ],
  events: [],
  // 示例
  default: [{
    title: '默认项',
    props: {
      grow: 0,
      thickness: 150
    }
  }],
  quickProps: [
    'thickness',
    'grow'
  ]
}

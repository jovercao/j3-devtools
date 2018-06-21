export default {
  name: 'J3FlexPanel',
  tag: 'flex-panel',
  icon: 'list',
  title: 'Dock面板栏目',
  category: 'layout',
  description: 'Dock面板的栏',
  props: {
    thickness: {
      title: '宽度',
      type: Number,
      default: 150,
      description: '宽度'
    },
    grow: {
      title: '比例',
      type: Number,
      default: 0,
      description: '比例'
    }
  },
  slots: {
    'default': {
      title: '默认插糟',
      description: '',
      accepts: '*'
    }
  },
  acceptsParent: [
    'J3FlexLayout'
  ],
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

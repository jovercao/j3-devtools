export default {
  name: 'J3Icon',
  tag: 'icon',
  icon: 'list',
  title: '图标',
  category: 'forms',
  description: '常规图标',
  props: {
    value: {
      type: String,
      default: 'block'
    },
    size: {
      type: Number,
      default: 12
    },
    type: {
      type: String,
      default: 'material',
      selections: [
        {
          value: 'material'
        },
        {
          value: 'other'
        }
      ]
    }
  }
}

import category from '../categroy'

export default {
  name: 'MuTextField',
  icon: 'home',
  title: '文本框',
  category: category.form,
  tag: 'mu-text-field',
  description: '',
  props: {
    value: {
      type: String,
      default: '文本框',
      description: '默认值'
    }
  },
  events: [
    {
      name: 'change',
      description: '当值发生变化时触发',
      args: [
        {
          name: 'value',
          description: '新的值'
        }
      ]
    }
  ],
  quickProps: [
    'value'
  ]
}

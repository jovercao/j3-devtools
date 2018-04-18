import category from '../categroy'
// import TextField from 'muse-ui/src/textField'
// import mapProps from '../map-props'

export default {
  name: 'MuTextField',
  icon: 'home',
  title: '文本框',
  category: category.form,
  tag: 'mu-text-field',
  description: '',
  // props: mapProps(TextField),
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

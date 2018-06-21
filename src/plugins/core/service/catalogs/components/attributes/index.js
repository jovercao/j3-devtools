import style from '../../../schemas/style'
import { validClass } from '../../utils'

export default {
  props: {
    class: {
      title: '类名',
      description: '组件样式名称',
      type: [ Array, Object, String ],
      validator: validClass
    },
    style
  },
  quickProps: [
    'style',
    'class'
  ]
}

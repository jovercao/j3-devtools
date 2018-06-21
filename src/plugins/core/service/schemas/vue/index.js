import { validate, invalid, isInvalid, valid } from '../../schemas/index'
import style from '../../schemas/style'
import { valid } from '../validate';

export default {
  props: {
    name: {
      type: [ String ],
      required: true
    },
    view: {
      type: [ Object ],
      required: true,
      validator(instance) {
        const component = instance.type
        // 检测实例对象是否符合组件要求
        return validate(instance, component)
      }
    },
    css: {
      type: [ Object ],
      required: true,
      default: {},
      validator(css) {
        for (const [name, value] of css.entries()) {
          if (!/[a-zA-Z\-][a-zA-Z0-9\-]*/.test(name)) {
            return invalid(`名称${name}不符合css规范！`)
          }
          const result = validate(value, style)
          if (isInvalid(result)) {
            return result
          }
        }
        return valid()
      }
    },
    data: {
      type: [ Object ],
      required: true,
      default: {}
    },
    methods: {
      type: [ Object ],
      required: true,
      default: {}
    },
    computed: {
      type: [ Object ],
      required: false
    }
  }
}

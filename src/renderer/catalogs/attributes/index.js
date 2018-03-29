import Style from './style'

export default {
  class: {
    type: [ Array, Object, String ],
    validate(value) {

    }
  },
  style: [ Style, String ]
}

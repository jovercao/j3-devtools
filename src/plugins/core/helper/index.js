import * as marked from './marked'
import * as style from './style'
import * as viewData from './viewData'

const helper = Object.assign({},
  marked,
  style,
  viewData
)

export default helper

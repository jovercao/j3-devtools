import * as marked from './marked'
import * as dom from './dom'
import * as style from './style'
import * as vuex from './vuex'

const helper = Object.assign({},
  marked,
  dom,
  style,
  vuex
)

export default helper

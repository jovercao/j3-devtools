import * as dom from './dom'
import * as vuex from './vuex'
import msgbox from './msgbox'
import * as vue from './vue'

const helper = Object.assign({},
  dom,
  vuex,
  vue,
  msgbox
)

export default helper

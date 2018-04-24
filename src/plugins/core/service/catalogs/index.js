import components, { categroy, checkAccepts, validate } from './components'
import attributes from './attributes'
import actions from './actions'
import bindings from './bindings'
import templates from './templates'
import icons from './icons'

const data = {
  components,
  categroy,
  attributes,
  actions,
  bindings,
  templates,
  icons
}

const load = () => {
  return data
}

export default {
  load,
  checkAccepts,
  validate
}

export {
  load,
  checkAccepts,
  validate
}

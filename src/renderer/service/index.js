import createRegistry from '../utils/create-registry'
import resource from '../resource'
import commands from '../commands'
import helper from '../helper'
import toolbox from '../toolbox'
import menus from '../menus'
import apis from '../apis'

const service = createRegistry()

service({
  resource,
  commands,
  helper,
  toolbox,
  menus,
  ide: apis
})

export default service

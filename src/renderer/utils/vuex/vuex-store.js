import Vuex from 'vuex'
import normalize from './vuex-normalize'

export class Store extends Vuex.Store {
  constructor(options) {
    const bind = normalize(options)
    super(options)
    bind(this)
  }

  registerModule(path, rawModule, options) {
    const bind = normalize(rawModule)
    super.registerModule(path, rawModule, options)
    bind(this)
  }
}

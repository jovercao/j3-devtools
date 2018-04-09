const Services = {}

function service(name, options) {
  if (!options) {
    return Services[name]
  }
  if (Services[name] && Services[name] !== options) {
    throw new Error(`service ${name} exists.`)
  }
  Services[name] = options
}

export default new Proxy(service, {
  get(target, key) {
    return Services[name]
  },
  ownKeys(target) {
    return Object.keys(Services)
  },
  has(target, key) {
    return Object.hasOwnProperty(Services, key)
  }
})

export const VuePlugin = {
  install(Vue, options) {
    Vue.prototype.$service = service
  }
}

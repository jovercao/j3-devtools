const Services = {}

export default function service(name, options) {
  if (!options) {
    return Services[name]
  }
  if (Services[name] && Services[name] !== options) {
    throw new Error(`service ${name} exists.`)
  }
  Services[name] = options
}

export const VueServicePlugin = {
  install(Vue, options) {
    Vue.prototype.$service = service
  }
}

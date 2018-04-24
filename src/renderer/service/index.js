import _ from 'lodash'

const Services = {}

function service(name, options) {
  if (!options) {
    if (_.isObject(name)) {
      const registes = name
      for (const key in registes) {
        const value = registes[key]
        service(key, value)
      }
    }
    return Services[name]
  }
  if (Services[name] && Services[name] !== options) {
    throw new Error(`service ${name} exists.`)
  }
  Services[name] = options
}

const proxy = new Proxy(service, {
  get(target, key) {
    return Services[key]
  },
  has(target, key) {
    return Services[key] !== undefined
  },
  ownKeys(target) {
    return Object.keys(Services)
  }
})

export default proxy

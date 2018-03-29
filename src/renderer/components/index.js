const components = {}
let files

function loadComponents(files) {
  files.keys().forEach(key => {
    components[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
  })
}

files = require.context('.', false, /\.vue$/)
loadComponents(files)

files = require.context('./j3', false, /\.vue$/)
loadComponents(files)

export default {
  install(Vue, options) {
    for (const key in components) {
      Vue.component(key, components[key])
    }
  }
}

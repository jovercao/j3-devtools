if (!localStorage.length) {
  init()
}

const defaultConfig = {
  'plugins-path': 'path'
}

let currentConfig

function init() {
  localStorage.setItem('ide', defaultConfig)
  currentConfig = defaultConfig
}

function get(name) {
  if (!currentConfig) read()
  return currentConfig.pligins[name]
}

function save() {
  if (!currentConfig) {
    return
  }
  localStorage.setItem('ide', currentConfig)
}

function read() {
  const json = localStorage.getItem('ide')
  currentConfig = JSON.parse(json)
  return currentConfig
}

export {
  save,
  read,
  get
}

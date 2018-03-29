import defaultTemplate from './default-template'

const components = {}

function loadFiles(files) {
  files.keys().forEach(filename => {
    // TODO: 此处需加入校验函
    if (filename === './index.js') return
    const comp = files(filename).default
    if (!comp.templates) {
      comp.templates = [
        defaultTemplate(comp)
      ]
    }
    components[comp.name] = comp
  })
}

const j3Files = require.context('./j3', false, /\.js$/)
loadFiles(j3Files)

const museFiles = require.context('./muse-ui', false, /\.js$/)
loadFiles(museFiles)

const domFiles = require.context('./dom', false, /\.js$/)
loadFiles(domFiles)

export default components

export { default as category } from './categroy'

export {
  components
}

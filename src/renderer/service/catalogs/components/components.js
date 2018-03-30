import { defaultTemplate } from './template'
import validate from './validate'

const components = {}

function loadFiles(files) {
  files.keys().forEach(filename => {
    if (filename === './index.js') return
    const comp = files(filename).default
    const validRes = validate(comp)
    if (!validRes.isValid) {
      throw new Error(validRes.message)
    }
    if (!comp.templates) {
      comp.templates = [
        defaultTemplate(comp)
      ]
    }
    components[comp.name] = comp
  })
}
console.log(components)
const j3Files = require.context('./j3', false, /\.js$/)
loadFiles(j3Files)

const museFiles = require.context('./muse-ui', false, /\.js$/)
loadFiles(museFiles)

const domFiles = require.context('./dom', false, /\.js$/)
loadFiles(domFiles)

export default components

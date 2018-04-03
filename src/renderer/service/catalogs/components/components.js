import { defaultTemplate } from './template'
import validate from '../schemas/validate'
import proper from './proper'
import MuseUI from 'muse-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Components from '@'
import Vue from 'vue'

Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.use(Components)

const components = {}

function loadFiles(files) {
  files.keys().forEach(filename => {
    if (filename === './index.js') return
    const comp = files(filename).default
    proper(comp)
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

const j3Files = require.context('./j3', false, /\.js$/)
loadFiles(j3Files)

const museFiles = require.context('./muse-ui', false, /\.js$/)
loadFiles(museFiles)

const domFiles = require.context('./dom', false, /\.js$/)
loadFiles(domFiles)

export default components

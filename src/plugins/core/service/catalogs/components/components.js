import { validate, checkResult, isInvalid } from '../../schemas/validate'
import proper from './proper'
import MuseUI from 'muse-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Components from '../../../components'
import Vue from 'vue'
import compScheam from '../../schemas/component'
import path from 'path'
import museComponents from './muse-ui'
import attributes from './attributes'

Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.use(Components)

const components = {}

function loadFiles(files) {
  files.keys().forEach(filename => {
    if (filename === './index.js') return
    const comp = files(filename).default

    proper(comp)
    const validRes = validate(comp, compScheam)
    if (isInvalid(validRes)) {
      throw new Error(`文件 ${path.join(__dirname, filename)} 组件定义不正确，错误信息： ${checkResult(validRes)}`)
    }

    components[comp.name] = comp
  })
}

const j3Files = require.context('./j3', false, /\.js$/)
loadFiles(j3Files)

Object.assign(components, museComponents)

// 为所有组件添加样式及类名属性
for (const comp of Object.values(components)) {
  Object.assign(comp.props, attributes.props)
  comp.quickProps = (comp.quickProps || [])
  comp.quickProps.push(...attributes.quickProps)
}

export default components

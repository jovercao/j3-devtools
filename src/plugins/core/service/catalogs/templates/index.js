import components from '../components'

let templates = []

for (const cmpName in components) {
  const cmp = components[cmpName]

  templates = templates.concat(cmp.templates)
}

export default templates

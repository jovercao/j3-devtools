import components from '../components'

let templates = []

console.log(components)
for (const cmpName in components) {
  const cmp = components[cmpName]
  console.log(templates)
  templates = templates.concat(cmp.templates)
}
console.log(templates)
export default templates

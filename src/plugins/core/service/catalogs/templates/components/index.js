import components from '../../components'
import defaultTemplates from './defaultTemplate'
import categories from './categories'

let templates = []

for (const cmpName in components) {
  const cmp = components[cmpName]
  templates.push(...defaultTemplates(cmp))
}

templates.categories = categories

export default templates

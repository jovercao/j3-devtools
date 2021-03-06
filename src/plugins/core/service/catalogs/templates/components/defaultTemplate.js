export default function(component) {
  const defTpl = defaultTemplate(component)
  const templates = component.templates || []
  templates.forEach(tpl => (tpl.category = component.category))
  return [ defTpl ].concat(templates)
}

export function defaultTemplate (component) {
  const { name, title, icon, category, description, props } = component
  const defTpl = {
    title,
    icon,
    category: category || 'others',
    type: name,
    description,
    props: {}
  }

  // 取出默认值
  for (const name in props) {
    const defaultValue = props[name].default
    if (defaultValue !== undefined) {
      defTpl.props[name] = defaultValue
    }
  }
  return defTpl
}

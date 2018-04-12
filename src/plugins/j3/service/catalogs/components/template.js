export default function(component) {
  const defTpl = defaultTemplate(component)
  let { templates } = component
  templates = templates || []
  return [ defTpl ].concat(templates)
}

export function defaultTemplate (component) {
  const { name, title, icon, category, description, props } = component
  const defTpl = {
    title,
    icon,
    category,
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

export default function({ name, title, icon, category, description, props }) {
  const tpl = {
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
      tpl.props[name] = defaultValue
    }
  }

  return tpl
}

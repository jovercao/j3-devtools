import css from './css.json'

const style = {
  name: 'style',
  title: '样式',
  type: [ Object ]
}

const props = style.props = {}

for (const [name, item] of Object.entries(css.items)) {
  props[name] = {
    title: item.title || item.name,
    type: [String],
    default: item.defaultValue,
    description: item.description,
    selections: (item.valueList || []).map((value, desc) => ({
      value,
      description: desc
    }))
  }
}

export default style

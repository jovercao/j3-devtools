import catalogs from '../catalogs'
const components = catalogs.components

export default function generate(viewData) {
  return helper.buildComponent(viewData)
}

const helper = {
  buildComponent(viewData) {
    const template = this.buildItem(viewData, 'default', '  ')
    return `<template>
${template}
</template>

<script>

export default {

}

</script>

<style>

</style>
`
  },
  buildItem(viewData, slotName = 'default', indent = '') {
    const tag = components[viewData.type].tag
    const slots = this.buildSlots(viewData.slots, indent + '  ')
    const props = this.buildProps(viewData.props)
    const cls = this.buildClass(viewData.class)
    const style = this.buildStyle(viewData.style)
    return `${indent}<${tag}${cls}${style} slot="${slotName}" ${props}>
${slots}${indent}</${tag}>`
  },
  buildClass(cls) {
    if (!cls) return ''
    return ` class="${this.buildValue(cls)}"`
  },
  buildStyle(style) {
    if (!style) return ''
    return ` style="${this.buildValue(style)}"`
  },
  buildProps(props) {
    let res = ''
    for (const key in props) {
      const value = props[key]
      if (value !== undefined) {
        res += ` :${key} = "${this.buildValue(value)}"`
      }
    }
    return res
  },
  buildValue(value) {
    if (typeof value === 'string') {
      return '\'' + value.replace(/'/g, '\\\'') + '\''
    }
    // 将双引号替换为单引号
    return JSON.stringify(value).replace(/(([^\\])("))/g, '$2\'')
  },
  buildSlots(slots, indent) {
    let res = ''
    for (const name in slots) {
      for (const item of slots[name]) {
        res += this.buildItem(item, name, indent) + '\n'
      }
    }
    return res
  }
}

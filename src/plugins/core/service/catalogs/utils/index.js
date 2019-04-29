import { isTypeOf, invalid, valid, isInvalid, checkResult } from '../../schemas/validate'

export function validExp(exp, vue) {
  return valid()
  // todo: 待实现表达式验证
}

// 验证类
export function validClass(value, vue) {
  if (!(parent && parent.classes)) {
    return
  }
  const classes = vue.classes.keys()
  if (isTypeOf(value, Object)) {
    for (const [name, exp] of value.enteries()) {
      if (!classes.includes(name)) {
        return invalid(`所引用的样式类名${name}不存在！`)
      }
      const result = validExp(exp, vue)
      if (isInvalid(result)) {
        return invalid(`类表名${name}表达式存在问题，${checkResult(result)}`)
      }
      parent.classes.hasOwnProperty()
    }
    return valid()
  }

  if (isTypeOf(value, String)) {
    const names = value.trim().split(/\s+/)
    return validClass(names, vue)
  }

  if (isTypeOf(value, Array)) {
    for (const item of value) {
      if (isTypeOf(item, Object)) {
        const result = validClass(item, vue)
        if (isInvalid(result)) {
          return result
        }
      } else if (isTypeOf(item, String)) {
        if (!classes.includes(item)) {
          return invalid(`所引用的样式类名${item}不存在！`)
        }
      }
      return valid()
    }
  }
}

const Commands = {}

/**
 * 获取或者注册命令
 * @param {string} name - 命名名称
 * @param {string} item.title - 命名显示名称
 * @param {string} item.description - 命令描述
 * @param {function} item.handler - 要执行的函数
 */
export default function commands(name, item) {
  if (!item) {
    const ret = Commands[name]
    if (!ret) {
      throw new Error(`命令'${name}'不存在！`)
    }
    return ret
  }

  Commands[name] = item
}

/**
 * 执行命令
 */
commands.exec = commands.execute = function(name, context) {
  const handler = commands(name).handler
  handler.call(context)
}

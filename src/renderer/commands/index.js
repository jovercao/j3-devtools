import service from '../service'
import _ from 'lodash'
import defaultCommands from './commands'

const Commands = {}

/**
 * 获取或者注册命令，
 * @param {string} name - 命名名称
 * @param {string} item.title - 命名显示名称
 * @param {string} item.description - 命令描述
 * @param {function} item.handler - 要执行的函数 function(ctx)，ctx为应用程序上下文
 */
export default function commands(name, item, override = false) {
  if (_.isObject(name)) {
    const items = name
    for (const key in items) {
      const val = items[key]
      commands(key, val)
    }
    return
  }
  if (_.isString(name) && !item) {
    const ret = Commands[name]
    if (!ret) {
      throw new Error(`命令'${name}'不存在！`)
    }
    return ret
  }
  if (Commands[name] && Commands[name] !== item) {
    if (!override) {
      throw new Error(`commands 名称冲突，命令${name}已经存在！`)
    }
  }
  item.name = name
  Commands[name] = item
  return commands
}

commands.override = function(name, item) {
  Commands[name] = item
  item.name = name
  return commands
}

commands.exists = function(name) {
  return !!Commands[name]
}

/**
 * 执行命令
 */
commands.exec = commands.execute = function(name, context) {
  context = context || commands.defaultContext
  const handler = commands(name).handler
  handler(context)
}

commands.defaultContext = {}

// 注册默认命令
commands(defaultCommands)

service('commands', commands)

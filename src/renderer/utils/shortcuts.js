import assert from 'assert'
import _ from 'lodash'
// import events from 'events'

const mappings = {}
const keycodes = {
  // 字母及数字
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'A': 65,
  'B': 66,
  'C': 67,
  'D': 68,
  'E': 69,
  'F': 70,
  'G': 71,
  'H': 72,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'M': 77,
  'N': 78,
  'O': 79,
  'P': 80,
  'Q': 81,
  'R': 82,
  'S': 83,
  'T': 84,
  'U': 85,
  'V': 86,
  'W': 87,
  'X': 88,
  'Y': 89,
  'Z': 90,
  // 小键盘区
  'NUM -': 109,
  'NUM .': 110,
  'NUM *': 106,
  'NUM /': 111,
  'NUM +': 107,
  'NUM 0': 96,
  'NUM 1': 97,
  'NUM 2': 98,
  'NUM 3': 99,
  'NUM 4': 100,
  'NUM 5': 101,
  'NUM 6': 102,
  'NUM 7': 103,
  'NUM 8': 104,
  'NUM 9': 105,
  'NUM ENTER': 108,
  // F功能区
  'F1': 112,
  'F2': 113,
  'F3': 114,
  'F4': 115,
  'F5': 116,
  'F6': 117,
  'F7': 118,
  'F8': 119,
  'F9': 120,
  'F10': 121,
  'F11': 122,
  'F12': 123,

  // meta 键
  'WINDOWS': 10,
  'WIN': 10,
  'COMMAND': 10,
  'CMD': 10,
  'META': 10,

  // 其他键
  '-_': 189,
  ',': 188,
  ',<': 188,
  ';:': 186,
  ';': 186,
  '.': 190,
  '.>': 190,
  '[': 219,
  '[{': 219,
  ']': 221,
  ']}': 221,
  '/?': 191,
  '/': 191,
  '\'': 222,
  '\'"': 222,
  '\\': 220,
  '\\|': 220,
  '`': 192,
  '`~': 192,
  '←': 37,
  '→': 39,
  '↑': 38,
  '↓': 40,
  '=': 187,
  '=+': 187,
  'ALT': 18,
  'ALTERNATE': 18,
  'BACKSPACE': 8,
  'CAPE LOCK': 20,
  'CLEAR': 12,
  'CONTROL': 17,
  'CTRL': 17,
  'DEL': 46,
  'DELETE': 46,
  'DOWN ARROW': 40,
  'END': 35,
  'ENTER': 13,
  'ESC': 27,
  'HELP': 47,
  'HOME': 36,
  'INSERT': 45,
  'LEFT ARROW': 37,
  'NUM LOCK': 144,
  'PAGE DOWN': 34,
  'PAGE UP': 33,
  'PRINT': 42,
  'RIGHT ARROW': 39,
  'SELECT': 41,
  'SHIFT': 16,
  'SPACE': 32,
  'SPACEBAR': 32,
  'TAB': 9,
  'UP ARROW': 38,

  '音量加': 175,
  'VOLUME +': 175,
  'VOL +': 175,
  'VOL UP': 175,
  'VOLUME UP': 175,
  '音量减': 174,
  'VOLUME -': 174,
  'VOLUME DOWN': 174,
  'VOL DOWN': 174,
  '停止': 179,
  'STOP': 179,
  '静音': 173,
  'MUTE': 173,
  '浏览器': 172,
  'BROWSER': 172,
  'OPEN BROWSER': 172,
  '邮件': 180,
  'MAIL': 180,
  'EMAIL': 180,
  'E-MAIL': 180,
  '搜索': 170,
  'SEARCH': 170,
  '收藏': 171,
  'FAVORITE': 171,
  'FAV': 171
}

let inited = false

function initEvents() {
  if (!inited) {
    document.addEventListener('keydown', function (event) {
      const hashedKey = hashEvent(event)
      const handlers = mappings[hashedKey]
      if (handlers) {
        // 如果返回false，则不向后执行，并阻止响应
        handlers.find(handler => handler(event) === false) && event.preventDefault()
      }
    })
    inited = true
  }
}

/**
 * 格式化 [ctrl] + [A]
 */
function hashKeys(keys) {
  const path = getKeysPath(keys)
  return hashPath(path)
}

function hashEvent(event) {
  const path = getEventPath(event)
  return hashPath(path)
}

function hashPath(path) {
  return path.reduce((total, keycode, index) => {
    return total + (Math.pow(10, index * 3) * keycode)
  }, 0)
}

function getKeysPath(keys) {
  const temp = keys.trim()
  return temp.substr(1, temp.length - 2).toUpperCase().split(/\]\s*\+\s*\[/g).map((key) => {
    key = key.trim().toUpperCase()
    if (!keycodes[key]) {
      throw new Error('快捷键的书写格式不正确或者不支持的键码！')
    }
    return keycodes[key]
  }).sort()
}

function getEventPath(event) {
  const path = []
  if (event.ctrlKey) {
    path.push(keycodes['CTRL'])
  }
  if (event.altKey) {
    path.push(keycodes['ALT'])
  }
  if (event.shiftKey) {
    path.push(keycodes['SHIFT'])
  }
  if (event.metaKey) {
    path.push(keycodes['META'])
  }
  if (event.keyCode) {
    path.push(event.keyCode)
  }
  return path.sort()
}

export function on(keys, handler) {
  assert(!handler || _.isFunction(handler), 'handler 必须为函数')
  initEvents()

  if (_.isObject(keys)) {
    for (const [key, value] of Object.entries(keys)) {
      on(key, value)
    }
    return
  }
  const hashedKeys = hashKeys(keys)
  const handlers = mappings[hashedKeys] || (mappings[hashedKeys] = [])
  if (handlers.includes(handler)) {
    console.warn('handler 已被绑定一次，请确定是否要再次绑定？')
  }
  handlers.push(handler)
}

export function un(keys, handler) {
  const hashedKeys = hashKeys(keys)
  const handlers = mappings[hashedKeys]
  if (handlers) {
    if (!handler) {
      delete mappings[hashedKeys]
    } else {
      const index = handlers.findIndex(h => h === handler)
      if (index >= 0) {
        handlers.splice(index, 1)
      }
    }
  }
}

export default {
  on,
  un
}

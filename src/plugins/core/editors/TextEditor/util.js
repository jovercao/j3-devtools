import iconv from 'iconv-lite'

export function getFormat(buffer) {
  const format = {
    format: '',
    encoding: ''
  }
  if (buffer[0] >= 0xEF) {
    format.format = 'windows'
    if (buffer[0] === 0xEF && buffer[1] === 0xBB) {
      format.encoding = 'utf8'
    } else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
      format.encoding = 'utf16'
    } else if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
      format.encoding = 'unicode'
    } else {
      format.encoding = 'gbK'
    }
  } else {
    format.format = 'unix'
    format.encoding = 'utf8'
  }
  return format
}

export function fromBuffer(buffer) {
  const format = getFormat(buffer)
  return {
    content: iconv.decode(buffer, format.encoding || 'utf8'),
    encoding: format.encoding,
    format: format.format
  }
}

export function toBuffer(value) {
  if (value.format === 'windows') {
    // TODO: 添加windows支持
    return iconv.encode(value.content, value.encoding || 'utf8') // .join('\n')
  } else {
    return iconv.encode(value.content, value.encoding || 'utf8') // .join('\n')
  }
}

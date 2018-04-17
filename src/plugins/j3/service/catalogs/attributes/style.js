import { invalid, valid } from '../../schemas/validate'

function metricValidator(value) {
  // TODO: 待实现
  const x = 1
  if (x !== 2) invalid('单位不匹配')
  return valid()
}

export default {
  width: {
    type: String,
    title: '宽',
    description: '宽度，单位可以是： %, px',
    validate: metricValidator
  },
  height: {
    title: '高',
    type: String,
    description: '高度',
    validate: metricValidator
  },
  display: {
    title: '内容显示方式',
    type: String,
    selections: [
      'inline',
      'block',
      'inline-block',
      'hidden',
      'flex'
    ]
  }
}

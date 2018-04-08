import validate from '../../src/renderer/service/schemas/validate'
import schema from '../../src/renderer/service/schemas'

describe('验证器', function() {
  it('validate 函数测试', function() {
    validate(schema, schema)
  })
})

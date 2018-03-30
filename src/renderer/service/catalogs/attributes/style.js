
export default {
  width: {
    type: String,
    title: '宽',
    description: '宽度，单价可以是： %, px',
    validate: function(value) {
      return {
        isValid: true,
        message: ''
      }
    }
  },
  height: {
    title: '高',
    type: String,
    description: '高度'
  }
}

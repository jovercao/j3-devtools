export default {
  'ide.cut': {
    handler() {
      document.execCommand('Cut')
    }
  },
  'ide.copy': {
    handler() {
      document.execCommand('Copy')
    }
  },
  'ide.parse': {
    handler() {
      document.execCommand('Parse')
    }
  },
  'ide.save': {
    title: '保存',
    async handler({ ide, helper }) {
      if (ide.activeTab) {
        try {
          await ide.save()
          helper.message({
            type: 'success',
            showClose: true,
            message: '保存成功!'
          })
        } catch (err) {
          helper.message({
            type: 'error',
            showClose: true,
            message: '保存失败!' + err
          })
        }
      }
    }
  },
  'ide.save-all': {
    title: '保存全部',
    handler({ ide, helper }) {
      try {
        ide.saveAll()
      } catch (err) {
        helper.message({
          type: 'error',
          showClose: true,
          message: '保存失败!' + err
        })
      }
    }
  },
  'ide.close': {
    title: '关闭当前',
    handler({ ide }) {
      if (ide.activeTab) {
        ide.close(ide.activeTab)
      }
    }
  },
  'ide.close-all': {
    handler({ ide }) {
      ide.closeAll()
    }
  }
}

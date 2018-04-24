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
    handler({ ide }) {
      if (ide.activeTab) {
        ide.save(ide.openeds, ide.activeContent)
      }
    }
  }
}

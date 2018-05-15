export default {
  'test': {
    handler({ ide }) {
      ide.doTest()
    }
  },
  'ide.open-project': {
    handler({ ide }) {
      ide.openProject()
    }
  },
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
      await ide.save()
    }
  },
  'ide.save-all': {
    title: '保存全部',
    async handler({ ide }) {
      await ide.saveAll()
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

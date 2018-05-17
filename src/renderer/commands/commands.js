import messages from '../messages'

export default {
  'ide.open-project': {
    handler({ ide }) {
      ide.openProject()
    }
  },
  'ide.cancel': {
    title: '取消',
    description: '取消执行/撤消，由当前进行响应',
    handler() {
      messages.dispatch('cancel')
    }
  },
  'ide.cut': {
    handler() {
      messages.dispatch('cut')
    }
  },
  'ide.copy': {
    handler() {
      messages.dispatch('copy')
    }
  },
  'ide.parse': {
    handler() {
      messages.dispatch('parse')
    }
  },
  'ide.delete': {
    handler() {
      messages.dispatch('delete')
    }
  },
  'ide.open': {
    title: '打开项',
    description: '打开单个项',
    handler({ ide }) {
      ide.open()
    }
  },
  'ide.save': {
    title: '保存',
    async handler({ ide }) {
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

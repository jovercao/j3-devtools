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
    handler(ctx, ...args) {
      messages.dispatch('cancel', ...args)
    }
  },
  'ide.cut': {
    handler(ctx, ...args) {
      messages.dispatch('cut', ...args)
    }
  },
  'ide.copy': {
    handler(ctx, ...args) {
      messages.dispatch('copy', ...args)
    }
  },
  'ide.parse': {
    handler(ctx, ...args) {
      messages.dispatch('parse', ...args)
    }
  },
  'ide.delete': {
    handler(ctx, ...args) {
      messages.dispatch('delete', ...args)
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

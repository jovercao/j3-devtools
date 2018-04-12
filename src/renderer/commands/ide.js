export default {
  'ide.cut': {
    handler() {
      document.exeCommand('Cut')
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
  }
}

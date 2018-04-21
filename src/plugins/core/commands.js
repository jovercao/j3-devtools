export default function(ctx, options) {
  return {
    'ide.open.floder': {
      handler(ctx) {
        ctx.ide.showList()
      }
    },
    // 切换到代码视图
    'vue-editor.code-view': {
      handler(ctx) {
        ctx.ide.vueEditor.switchToCodeView()
      }
    },
    // 切换到设计视图
    'vue-editor.design-view': {
      handler(ctx) {
        ctx.ide.vueEditor.switchToDesignView()
      }
    },
    // 切换到预览视图
    'vue-editor.design-preview': {
      handler(ctx) {
        ctx.ide.vueEditor.switchToPreview()
      }
    }
  }
}

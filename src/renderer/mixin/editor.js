import { mapActions } from 'vuex'

export default {
  // 必须实现changed事件
  props: {
    // data: {},
    // 打开的uri
    uri: String,
    context: Object,
    // 内容类型
    contentType: String,
    // 资源类型
    resourceType: String
  },
  data() {
    return {
      value: null
    }
  },
  // watch: {
  //   value: {
  //     handler(value) {
  //       console.log('值变化', value)
  //       this.editorChanged(this.context)
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    ...mapActions([ 'isOpened', 'editorCreated', 'editorChanged' ])
    // convertFrom(data) {
    //   throw new Error('未实现的方法 `convertFrom`！')
    // },
    // convertTo(value) {
    //   throw new Error('未实现的方法 `convertFrom`！')
    // },
    // safeClose() {

    // }

  },
  created() {
    this.value = this.context.getValue()
    this.editorCreated({
      context: this.context,
      getChangedValue: () => this.value
    })
    this.$watch('value', (value) => this.editorChanged(this.context), { deep: true })
  },
  // this.value = this.convertFrom(this.data)
  // this.changed = false
  // this.$updateHandler = (tab) => {
  //   this.updateEditorData({
  //     uri: this.uri,
  //     value: this.value
  //   })
  // }
  // this.$bus.on('beforesave', this.$updateHandler)
  // this.$emit('created', this)
  // },
  // destroyed() {
  //   // 解绑事件，避免内存泄漏，以及出错。
  //   // this.$bus.un('beforesave', this.$updateHandler)
  // },
  // watch: {
  //   // data() {
  //   //   this.value = this.convertFrom(this.data)
  //   //   this.changed = false
  //   // },
  //   // value() {
  //   //   this.$emit('changed')
  //   // }

  // },
  // 确保文件被正确关闭
  async deactivated() {
    const opened = await this.isOpened(this.uri)
    if (!opened) {
      this.$destroy()
    }
  }
}

import { mapActions } from 'vuex'

export default {
  props: {
    value: {},
    uri: String,
    contentType: String,
    resourceType: String
  },
  methods: {
    ...mapActions([ 'isOpened' ])
  },
  // 确保文件被正确关闭
  async deactivated() {
    const opened = await this.isOpened(this.uri)
    if (!opened) {
      this.$destroy()
    }
  }
}

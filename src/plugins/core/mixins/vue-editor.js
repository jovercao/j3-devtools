import { mapState, mapActions } from 'vuex'
const namespace = 'vue-editor'

export default {
  props: {
    value: String
  },
  created() {
    try {
      this.data = JSON.parse(this.value)
    } catch (err) {
      this.$msgbox({
        title: '错误',
        message: <p>错误信息：文件或数据格式不正确！</p>
      })
      this.data = {}
    }
  },
  activated() {
    this.beginEdit(this.data)
  },
  deactivated() {
    this.endEdit()
    // // 如果已经关闭，则销毁，避免占用内容
    // if (!this.isOpened(this.viewData)) {
    //   this.$destroy()
    // }
  },
  data() {
    return {
      // 视图数据
      currentView: 'design',
      // 编辑值
      data: null
    }
  },
  computed: {
    ...mapState(namespace, [ 'activeItem', 'viewData' ])
  },
  methods: {
    ...mapActions(namespace, [
      'beginEdit',
      'endEdit' // ,
      // 'isOpened'
    ])
  }
}

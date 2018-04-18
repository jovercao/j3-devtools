import { mapState, mapMutations, mapActions } from 'vuex'
const namespace = 'vue-editor'

export default {
  props: {
    viewData: Object
  },
  activated() {
    this.beginEdit(this.viewData)
  },
  deactivated() {
    this.endEdit()
    // 如果已经关闭，则销毁，避免占用内容
    if (!this.isOpened(this.viewData)) {
      this.$desgroy()
    }
  },
  data() {
    return {
      // 视图数据
      viewData: null,
      currentView: 'design',
      selected: null
      // TODO: 多选待实现
      // selecteds: []
    }
  },
  computed: {
    ...mapState(namespace, [ 'selected' ])
  },
  methods: {
    ...mapMutations(namespace, [ 'beginEdit', 'endEdit' ]),
    ...mapActions([ 'isOpened' ])
  }
}

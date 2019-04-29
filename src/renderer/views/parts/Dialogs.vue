<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([ 'openedDialogs' ])
  },
  methods: {
    ...mapActions([ '_closeDialog' ])
  },
  render(h) {
    let index = 0
    const create = () => {
      const dialog = this.openedDialogs[index]
      index++
      const data = Object.assign({}, dialog.component)
      const on = data.on || (data.on = {})
      on.close = dialog.close
      const children = [h(dialog.tag, data)]
      if (index < this.openedDialogs.length) {
        children.push(create())
      }
      return h('el-dialog', {
        props: {
          title: dialog.title,
          modal: true,
          // 添加到body元素中
          modalAppendToBody: true,
          appendToBody: true,
          visible: true
        },
        on: {
          close: dialog.close
        }
      }, children)
    }
    if (this.openedDialogs.length > 0) {
      return create()
    }
    return h('div')
  }
}
</script>

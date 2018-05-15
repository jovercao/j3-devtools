<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['openedTabs'])
  },
  render() {
    return (
      <div>
        this.openedTabs.map(tab => <tab.editor.component />)
      </div>
    )
  }
}
</script>

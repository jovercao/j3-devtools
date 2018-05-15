<template>
  <div class="outline-box" tabindex="0" @keydown="_handlerKeydown">
    <OutlineBoxItem :deeps="0" v-if="viewData" @select="select" :viewData="viewData"/>
  </div>
  <!-- <el-tree :data="[root]" :props="{ label: 'component.name', children: 'children' }" @current-change="select">
  </el-tree> -->
</template>

<script>
import { namespace } from '../../store/vue-editor'
import { mapState, mapActions, mapGetters } from 'vuex'
import OutlineBoxItem from './OutlineBoxItem'

export default {
  components: {
    OutlineBoxItem
  },
  computed: {
    ...mapState(namespace, [ 'viewData', 'activeItem' ]),
    ...mapGetters(namespace, [ 'components' ])
  },
  methods: {
    ...mapActions(namespace, [ 'select', 'remove', 'removeSelecteds', 'deselect', 'deselectAll' ]),
    _handlerKeydown(event) {
      switch (event.keyCode) {
        case 46:
          // 首次删除当前选定的，再次删除所有已选定的
          if (this.activeItem) {
            this.remove(this.activeItem)
          } else if (this.selecteds.length > 0) {
            this.removeSelecteds()
          }
          break
        case 27:
          if (this.activeItem) {
            this.deselect(this.activeItem)
          } else if (this.selecteds.length > 0) {
            this.deselectAll()
          }
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.outline-box {
  &:focus {
    outline: none;
    // background: #f8f8f8;
  }
}
</style>

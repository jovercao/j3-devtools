<template>
  <div class="outline-box">
    <OutlineBoxItem :deeps="0" v-if="viewData" @select="select" :viewData="viewData"/>
  </div>
  <!-- <el-tree :data="[root]" :props="{ label: 'component.name', children: 'children' }" @current-change="select">
  </el-tree> -->
</template>

<script>
import { namespace } from '../../store/vue-editor'
import { mapState, mapMutations, mapGetters } from 'vuex'
import OutlineBoxItem from './OutlineBoxItem'

export default {
  components: {
    OutlineBoxItem
  },
  computed: {
    ...mapState(namespace, ['viewData', 'selected']),
    ...mapGetters(namespace, ['components'])
  },
  methods: {
    ...mapMutations(namespace, ['select'])
  }
}
</script>

<style lang="less" scoped>
.outline-box {

}
</style>

<template>
  <div :value="selectedItem" class="outline-box">
    <OutlineBoxItem v-if="viewData" @select="selectItem" :viewData="viewData"/>
  </div>
  <!-- <el-tree :data="[root]" :props="{ label: 'component.name', children: 'children' }" @current-change="selectItem">
  </el-tree> -->
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import OutlineBoxItem from './OutlineBoxItem'

export default {
  props: ['value'],
  components: {
    OutlineBoxItem
  },
  computed: {
    ...mapState(modules.UiDesigner, ['viewData', 'selectedItem']),
    ...mapGetters(modules.UiDesigner, ['components'])
  },
  methods: {
    ...mapMutations(modules.UiDesigner, ['selectItem'])
  }
}
</script>

<style lang="less" scoped>
.outline-box {
  padding: 10px;
}
</style>

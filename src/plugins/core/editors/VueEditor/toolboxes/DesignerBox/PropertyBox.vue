<template>
  <property-grid class="property-box" @propchange="changeProp"
    :props="selectedComponent.props" :propsData="selectedProps"
    :showFooter="true">
  </property-grid>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      curProp: null
    }
  },
  computed: {
    ...mapState(modules.UiDesigner, {
      selectedProps: state =>
        state.selectedItem ? state.selectedItem.props : {},
      selectedItem: state => state.selectedItem
    }),
    ...mapGetters(modules.UiDesigner, ['selectedComponent'])
  },
  methods: {
    ...mapMutations(modules.UiDesigner, ['changeProp'])
  }
}
</script>

<style lang="less" scoped>
.property-box {
  height: 100%;
}
</style>

<template>
  <property-grid class="property-box" @propchange="changeProp" :propsDefine="selectedComponent.props" :props="selectedProps">
  </property-grid>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import modules from '../../../store/store-modules'
import PropertyGrid from './PropertyGrid'

export default {
  data() {
    return {
      curProp: null
    }
  },
  components: {
    PropertyGrid
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

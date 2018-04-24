<template>
  <property-grid class="property-box" @propchange="changeProp"
    :props="selectedComponent.props" :propsData="selectedProps"
    :showFooter="true">
  </property-grid>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { namespace } from '../../store/vue-editor'

export default {
  data() {
    return {
      curProp: null
    }
  },
  computed: {
    ...mapState(namespace, {
      selectedProps: state =>
        state.selected ? state.selected.props : {},
      selected: state => state.selected
    }),
    ...mapGetters(namespace, ['selectedComponent'])
  },
  methods: {
    ...mapMutations(namespace, ['changeProp'])
  }
}
</script>

<style lang="less" scoped>
.property-box {
  height: 100%;
}
</style>

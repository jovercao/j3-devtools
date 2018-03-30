<template>
<div class="component-sidebar">
  <div class="component-sidebar-header">
    组件库
  </div>
  <div v-if="templates">
    <div draggable="true"
      v-for="(item, index) in templates" :key="index"
      @dragstart.stop="beginDrag({ source: 'components-sidebar', type: 'view-data', data: item })"
      @dragend.stop="endDrag()"
      class="component-item">
      <mu-icon class="component-icon" v-if="item.icon" :value="item.icon" :size="24"></mu-icon>
      {{item.title}}
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import modules from '../../../store/store-modules'
export default {
  computed: {
    ...mapGetters(modules.UiDesigner, ['templates'])
  },
  methods: {
    ...mapMutations(modules.UiDesigner, ['beginDrag', 'endDrag'])
  }
}
</script>


<style lang="less" scoped>
  .component-sidebar {
    width: 100%;
    height: 100%;
    .component-sidebar-header {
      font-size: 13pt;
      color: #555;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-bottom: #DDD solid 1px;
    }
    .component-item {
      height: 42px;
      line-height: 42px;
      padding-left: 12px;
      padding-right: 12px;
    }
    .component-item:hover {
      background: #ccc;
    }
    .component-icon {
      vertical-align: middle;
    }
    .component-item-title {

    }
    .component-item-describe {

    }
  }
</style>

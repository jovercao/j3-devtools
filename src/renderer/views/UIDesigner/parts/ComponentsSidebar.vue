<template>
<div class="component-sidebar">
  <div class="component-sidebar-header">
    组件库
  </div>
  <mu-list v-if="components">
    <mu-list-item v-draggable:data="item.templates[0]" class="component-item" v-for="(item, index) in components" :key="index" title-class="component-item-title"
         :title="item.title" :describeText="item.description">
      <mu-icon :value="item.icon" slot="left" :size="32"></mu-icon>
    </mu-list-item>
  </mu-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import modules from '../../../store/store-modules'
export default {
  computed: {
    ...mapGetters(modules.UiDesigner, ['components'])
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

    }
    .component-item-title {

    }
    .component-item-describe {

    }
  }
</style>

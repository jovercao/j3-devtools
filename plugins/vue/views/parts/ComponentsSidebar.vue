<template>
  <div class="component-sidebar box">
    <div class="header">
      <div class="left">
        <i class="el-icon-menu"/>
      </div>
      <div class="center">
        组件库
      </div>
      <div class="right">
        
      </div>
    </div>
    <div class="body">
      <div v-if="templates">
        <div draggable="true"
          v-for="(item, index) in templates" :key="index"
          @dragstart.stop="beginDrag({ source: 'components-sidebar', type: 'view-data', data: item })"
          @dragend.stop="endDrag()"
          class="component-item">
          <mu-icon class="component-icon" v-if="item.icon" :value="item.icon" :size="18"></mu-icon>
          {{item.title}}
        </div>
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
  @import url('../../../assets/define.less');

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
      height: 38px;
      line-height: 42px;
      padding-left: 12px;
      padding-right: 12px;
      font-size: 10pt;
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
  
  .box {
    display: flex;
    flex-direction: column;
    .header {
      flex-basis: 36px;
      color: @font-light;
      cursor: pointer;
      display: flex;
      padding: 0px 12px 0px 12px;
      line-height: 36px;
      border-bottom: @bg3 solid 1px;
      border-top: @bg1 solid 1px;
      background: #e1e1e1;
      .left {
        font-size: 12px;
        flex-basis: 36px;
      }
      line-height: 36px;
      // 两端
      .right {
        flex-basis: 36px;
        line-height: 36px;
        text-align: right;
      }
      // 中间
      .center {
        flex-basis: 0px;
        text-align: center;
        flex-grow: 1;
      }
    }
    .body {
      flex-grow: 1;
      flex-basis: 0px;
      overflow: auto;
    }
  }

</style>

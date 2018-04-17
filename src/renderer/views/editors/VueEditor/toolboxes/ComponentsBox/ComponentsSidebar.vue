<template>
  <div class="component-box">
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
          class="item">
          <mu-icon class="icon" v-if="item.icon" :value="item.icon" :size="18"></mu-icon>
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

  .component-box {
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

      .left, .right {
        font-size: 12px;
        flex-basis: 36px;
      }

      // 两端
      .right {
        flex: 0 0 36px;
        text-align: right;
      }

      // 中间
      .center {
        flex:  1 1 0px;
        text-align: center;
      }
    }
    .body {
      flex-grow: 1;
      flex-basis: 0px;
      overflow: auto;
    }
  }
  

</style>

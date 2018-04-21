<template>
  <div class="vue-editor">
    <div class="sheet">
      <span><i class="el-icon-code"></i>设计视图</span>
      <span><i class="el-icon-code"></i>代码视图</span>
    </div>
    <designer-view v-show="currentView === 'design'"></designer-view>
    <code-view v-show="currentView === 'code'"></code-view>
  </div>
</template>

<script>
import DesignerView from './views/DesignerView'
import CodeView from './views/CodeView'
import VueEditor from '../../mixins/vue-editor'

export default {
  name: 'vue-editor',
  mixins: [
    VueEditor
  ],
  components: {
    DesignerView,
    CodeView
  }
}
</script>
<style lang="less" scoped>
  .vue-editor {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .sheet {
      flex: 0 0 21px;
      text-align: right;
    }

    .body {
      flex: 1 1 0px;
    }

    .footer {
      flex: 0 0 21px;
    }
  }
</style>

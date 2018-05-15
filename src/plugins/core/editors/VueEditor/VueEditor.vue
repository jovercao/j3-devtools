<template>
  <div class="vue-editor">
    <div class="sheet">
      <div class="body toolbar">
        <ide-icon-button :size="14" icon="color_lens"/>
        <ide-icon-button :size="14" icon="crop"/>
        <span class="spliter">|</span>
        <ide-icon-button :size="14" v-show="activeItem && activeItem.parent" tooltip="选择父级" icon="developer_board" @click="selectParent"/>
      </div>
      <div class="rigth">
        <mu-flat-button icon="edit" label="设计视图" @click="currentView = 'design'" :primary="currentView == 'design'"></mu-flat-button>
        <mu-flat-button icon="code" label="代码视图" @click="currentView = 'code'" :primary="currentView == 'code'"></mu-flat-button>
      </div>
    </div>
    <designer-view class="body" v-show="currentView === 'design'" :value="value"></designer-view>
    <code-view class="body" v-show="currentView === 'code'" :value="value"></code-view>
  </div>
</template>

<script>
import DesignerView from './views/DesignerView'
import CodeView from './views/CodeView'
import { namespace } from '../../store/vue-editor'
import { mapState, mapActions } from 'vuex'

export default {
  name: namespace,
  components: {
    DesignerView,
    CodeView
  },
  activated() {
    this.beginEdit(this.value)
  },
  deactivated() {
    this.endEdit()
  },
  data() {
    return {
      // 视图数据
      currentView: 'design'
    }
  },
  computed: {
    ...mapState(namespace, [ 'activeItem', 'viewData' ])
  },
  methods: {
    ...mapActions(namespace, [
      'beginEdit',
      'endEdit',
      'selectParent'
      // ''
    ])
  }
}
</script>
<style lang="less" scoped>
  .vue-editor {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
    .sheet {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: stretch;
      overflow: hidden;
      flex: 0 0 28px;
      background: #efefef;
      .body {
        flex: 1;
      }

      .right {
        flex: 0 0 200px;
        text-align: right;
      }
    }

    .body {
      flex: 1 1 0px;
    }
    .toolbar {
      .spliter {
        color: #ddd;
        cursor: default;
      }
    }

    .footer {
      flex: 0 0 21px;
    }
  }
</style>

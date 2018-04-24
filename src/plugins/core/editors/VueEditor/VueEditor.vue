<template>
  <div class="vue-editor">
    <div class="sheet">
      <mu-flat-button icon="edit" label="设计视图" @click="currentView = 'design'" :primary="currentView == 'design'"></mu-flat-button>
      <mu-flat-button icon="code" label="代码视图" @click="currentView = 'code'" :primary="currentView == 'code'"></mu-flat-button>
    </div>
    <designer-view class="body" v-show="currentView === 'design'" :value="value"></designer-view>
    <code-view class="body" v-show="currentView === 'code'" :value="value"></code-view>
  </div>
</template>

<script>
import DesignerView from './views/DesignerView'
import CodeView from './views/CodeView'
import { namespace } from '../../store/vue-editor'
import ide from '@'
import { mapState, mapMutations } from 'vuex'

export default {
  name: namespace,
  mixins: [
    ide.mixin('editor')
  ],
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
    ...mapState(namespace, [ 'selected', 'viewData' ])
  },
  methods: {
    ...mapMutations(namespace, [
      'beginEdit',
      'endEdit' // ,
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
      flex: 0 0 21px;
      text-align: right;
      background: #efefef;
    }

    .body {
      flex: 1 1 0px;
    }

    .footer {
      flex: 0 0 21px;
    }
  }
</style>

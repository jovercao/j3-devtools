<template>
  <div class="vue-editor">
    <div class="sheet">
      <div class="body toolbar">
        <ide-icon-button :size="14" icon="color_lens"/>
        <ide-icon-button :size="14" icon="crop"/>
        <span class="spliter">|</span>
        <ide-icon-button :size="14" @click="copy" :disabled="!activeItem" icon="content_copy"/>
        <ide-icon-button :size="14" @click="cut" :disabled="!activeItem"  icon="content_cut"/>
        <ide-icon-button :size="14" @click="parse" :disabled="!clipboard" icon="content_paste"/>
        <ide-icon-button :size="14" :disabled="!activeItem" @click="_delete()" icon="close"/>
        <span class="spliter">|</span>
        <ide-icon-button :size="14" :disabled="!activeItem || !activeItem.parent" tooltip="选择父级" icon="developer_board" @click="selectParent"/>
      </div>
      <div class="rigth">
        <mu-flat-button icon="edit" label="设计视图" @click="design" :primary="currentView == 'design'"></mu-flat-button>
        <mu-flat-button icon="code" label="代码视图" @click="code" :primary="currentView == 'code'"></mu-flat-button>
        <mu-flat-button icon="dvr" label="效果预览" @click="preview" :primary="currentView == 'preview'"></mu-flat-button>
      </div>
    </div>
    <designer-view :visible="currentView === 'design'" class="body" :mode="designMode" v-show="currentView === 'design' || currentView === 'preview'" :value="value"></designer-view>
    <code-view class="body" v-show="currentView === 'code'" :value="value"></code-view>
  </div>
</template>

<script>
import DesignerView from './views/DesignerView'
import CodeView from './views/CodeView'
import { namespace } from '../../store/vue-editor'
import { mapState, mapActions } from 'vuex'
import ctx from '@'

export default {
  name: namespace,
  components: {
    DesignerView,
    CodeView
  },
  mixins: [
    ctx.mixin('editor')
  ],
  created() {
    this.$subscribe({
      tabActived: (tab) => {
        if (tab.uri === this.uri) {
          this.beginEdit(this.value)
        }
      }
    })
    this.beginEdit(this.value)
  },
  // activated() {
  //   // 由于切换时 actived 要早于 deactivated 原因
  //   this.$nextTick(() => {
  //     this.beginEdit(this.value)
  //   })
  // },
  // deactivated() {
  //   // if (this.viewData === this.value) {
  //   this.endEdit()
  //   // }
  // },
  data() {
    return {
      // 视图数据
      currentView: 'design',
      // 预览模式
      designMode: 'design'
    }
  },
  computed: {
    ...mapState(namespace, [ 'activeItem', 'viewData' ]),
    ...mapState([ 'clipboard' ])
  },
  methods: {
    ...mapActions(namespace, [
      'beginEdit',
      'endEdit',
      'selectParent',
      'copy',
      'cut',
      'parse'
      // ''
    ]),
    ...mapActions(namespace, { '_delete': 'delete' }),
    preview() {
      this.currentView = 'preview'
      this.designMode = 'preview'
    },
    design() {
      this.currentView = 'design'
      this.designMode = 'design'
    },
    code() {
      this.currentView = 'code'
    }
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

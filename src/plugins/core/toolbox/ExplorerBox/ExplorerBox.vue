<template>
  <div class="explorer-box">
    <!-- <mu-popover :open="browsing" @close="browsing = false">
<browser-view>
</browser-view>
</mu-popover> -->
    <div v-if="opened" :class="['outline-box', { 'collapsed': !opened.expand }]">

      <div class="header" @click.stop="opened.expand = !opened.expand">
        <div class="left">
          <i :class="opened.icon" />
        </div>
        <div class="center">
          {{opened.title}} {{opened.path}}
        </div>
        <!-- <div class="tools">
          <ide-icon-button icon="el-icon-plus" :size="12" @click.stop="$exec('ide.open-resource')" />
        </div> -->
        <div class="right">
          <ide-icon-button :icon="opened.expand ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" />
        </div>
      </div>
      <expand-transition>
        <div class="body"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
          :style="{ 'overflow-y': (hover && scrollable) ? 'auto' : 'hidden'}">
          <content-tree :type="opened.name" :path="opened.path" />
        </div>
      </expand-transition>
    </div>
  </div>
</template>

<script>
// import BrowserView from './BrowserView'
import { mapState } from 'vuex'
import ContentTree from './ContentTree.vue'

export default {
  props: {
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  name: 'ExplorerBox',
  components: {
    // BrowserView,
    ContentTree
  },
  created() {
    // this.loadData()
  },
  data() {
    // const resource = this.$service('resource')
    // const outlineBoxes = resource.all().map(res => ({ title: res.title, icon: res.icon, name: res.name, expand: false, path: '/' }))
    return {
      outlineBoxes: [],
      hover: false,
      opened: null
    }
  },
  computed: {
    ...mapState([ 'project' ])
  },
  watch: {
    project: {
      deep: true,
      handler(curVal, oldVal) {
        if (!curVal) {
          this.opened = null
          return
        }
        const res = this.$service.resource(curVal.resourceType)
        if (!this.opened) {
          this.opened = {
            expand: true
          }
        }
        Object.assign(this.opened, {
          title: res.title,
          icon: res.icon,
          name: res.name,
          path: this.project.path
        })
      }
    }
  },
  methods: {
    // openResource(resourceType) {
    //   this.browsing = true
    // },
    // async loadData() {
    //   const resource = this.$service('resource')
    //   const items = resource.all().map(res => ({
    //     title: res.title,
    //     icon: res.icon,
    //     name: res.name,
    //     expand: true,
    //     path: '/'
    //   }))
    //   this.$nextTick(() => {
    //     this.outlineBoxes = items
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../../renderer/assets/define.less');

.explorer-box {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .icon-btn {
    transition: background-color 0.5s;
    cursor: pointer;
    border-radius: 11px;
    margin-top: -2px;
    font-size: 12px;
    border: 0px;
    background: transparent;
    color: #666;
    text-align: center;
    vertical-align: middle;
    padding: 1px;
    height: 23px;
    width: 23px;
    line-height: 23px;
    &:hover {
      background: #ccc;
      transition: background-color 0.5s;
    }
  }
  .outline-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    // 收起的的
    &.collapsed {
      flex: 0 0 36px;
      .body {
        display: none;
      }
    }
    .header {
      flex-basis: 36px;
      color: @font-light;
      cursor: pointer;
      display: flex;
      align-items: stretch;
      flex-direction: row;
      padding: 0px 12px 0px 12px;
      line-height: 36px;
      // border-bottom: @bg3 solid 1px;
      // border-top: @bg1 solid 1px;
      background: #e1e1e1;
      &:hover {
        color: #555;
        transition: background-color 0.5s;
        background: #ccc;
      }
      .left {
        font-size: 12px;
        flex: 0 0 20px;
      }
      // 两端
      .right {
        flex: 0 0 36px;
        line-height: 36px;
        text-align: right;
      }
      .tools {
        flex: 0 0 auto;
      }
      // 中间
      .center {
        flex: 1 1 0px;
        white-space: nowrap; //强制文本在一行内输出
        overflow: hidden; //隐藏溢出部分
        text-overflow: ellipsis; //对溢出部分加上...
      }
    }
    .body {
      flex: 1 1 0px;
      overflow: hidden;
      padding-top: 12px;
    }
  }
}
</style>

<template>
  <div class="explorer-box">
    <mu-popver :open="browsing" @close="browsing = false">
      <browser-view>
      </browser-view>
    </mu-popver>
    <div v-for="(box, index) in outlineBoxes" :key="index"
      :class="['outline-box', { 'collapsed': !box.expand }]">
      <div class="header">
        <div class="left">
          <i :class="box.icon"/> 
        </div>
        <div class="center">
          {{box.title}}
        </div>
        <div class="tools">
          <ide-icon-button icon="el-icon-plus" :size="12" @click.stop="$ide.executeCommand('ide.open-resource')"/>
          <!-- <button class="icon-btn" @click.stop="$ide.executeCommand('ide.open-resource')">
            <i class="el-icon-plus"/>
          </button> -->
        </div>
        <div class="right">
          <ide-icon-button :icon="box.expand ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" @click.stop="box.expand = !box.expand"/>
        </div>
      </div>
      <div class="body">
        <ul v-if="openeds[box.name]">
          <li v-for="(item, index) in openeds[box.name]" :key="index">
            {{item.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BrowserView from './BrowserView'
// import { mapState, mapAction } from 'vuex'
export default {
  name: 'ExplorerBox',
  compoments: {
    BrowserView
  },
  data() {
    const resource = this.$service('resource')
    const outlineBoxes = resource.all().map(res => ({ title: res.title, icon: res.icon, name: res.name, expand: false }))
    return {
      outlineBoxes,
      openeds: {},
      browsing: false
    }
  },
  methods: {
    openResource() {

    }
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
    transition: background-color .5s;
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
      transition: background-color .5s;
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
      cursor: default;
      display: flex;
      align-items: stretch;
      flex-direction: row;
      padding: 0px 12px 0px 12px;
      line-height: 36px;
      // border-bottom: @bg3 solid 1px;
      // border-top: @bg1 solid 1px;
      background: #e1e1e1;
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
      }
    }
    .body {
      flex: 1 1 0px;
      overflow: auto;
    }
  }
}

</style>

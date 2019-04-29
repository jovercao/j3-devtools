<template>
  <div class="sidebar">
    <!-- <div style="height:100%;width:3px;cursor:e-resize;position:abslute;left:90%;top: 0px;z-index:2000;background-color:red">
    </div> -->
    <div class="header">
      <span>{{ activeSidebar ? activeSidebar.title : '未打开' }}</span>
      <div class="right">
        <ide-icon-button icon="el-icon-d-arrow-left" :size="12" @click="hideSidebar"/>
        <!-- <mu-icon class="hide-btn"
          @click.native="hideSidebar"
          value="keyboard_arrow_left" :size="16" /> -->
      </div>
    </div>
    <keep-alive>  
      <component v-if="activeSidebar !== null" class="body" :is="activeSidebar.component" :scrollable="scrollable"/>
    </keep-alive>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(['activeSidebar'])
  },
  methods: {
    ...mapActions(['hideSidebar'])
  }
}
</script>


<style lang="less" scoped>
  @import url('../../assets/define.less');

  .sidebar {
    background: @bg1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow-y: hidden;
    .header {
      font-size: 9pt;
      color: #bbb;
      line-height: 26px;
      flex: 0 0 32px;
      padding: 3px 12px 3px 12px;
      background: @bg1;
      .right {
        float: right;
        .hide-btn {
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .body {
      flex: 1 1 0px;
      overflow-y: hidden;
      // &:hover {
      //   overflow-y: auto;
      // }
    }
  }
</style>
